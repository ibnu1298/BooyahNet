import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CridetialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    FacebookProvider({
      name: "facebookLogin",
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      name: "githubLogin",
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      name: "googleLogin",
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
    }),
    CridetialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email atau Username",
          type: "text",
        },
        password: {
          label: "Password:",
          type: "password",
        },
      },
      async authorize(credentials) {
        const urlLogin =
          "https://booyahnetapi.azurewebsites.net/api/User/Login";
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        async function LoginAuth(user: string, pass: string) {
          const res = await fetch(urlLogin, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              UsernameOrEmail: user,
              password: pass,
            }),
          });
          return res.json();
        }

        const getToken = await LoginAuth(email, password);
        console.log(getToken);

        if (getToken.isSucceeded) {
          return getToken;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, trigger, session, user }: any) {
      const urlGetUser =
        "https://booyahnetapi.azurewebsites.net/api/User/GetByEmailOrUsername";
      async function GetUser(email: any, token: string) {
        const res = await fetch(urlGetUser, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            UsernameOrEmail: email,
          }),
        });
        console.log(res);

        return res.json();
      }
      async function CekImage(url: string) {
        let urlImage = "";
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        urlImage = res.status === 200 ? res.url : "/images/people/default.jpg";

        return urlImage;
      }
      const urlLogin = "https://booyahnetapi.azurewebsites.net/api/User/Login";
      async function LoginAuth(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        userName: string,
        picture: string,
        type: string
      ) {
        console.log(id, firstName, lastName, email, userName, picture, type);

        const res = await fetch(urlLogin, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usernameOrEmail: email,
            firstName,
            lastName,
            userName,
            urlImage: picture,
            providerId: id,
            type,
          }),
        });
        console.log(res);
        const response = await res.json();
        console.log(response);

        return response;
      }
      interface JwtDecodeCustom {
        id?: string;
        exp?: number;
        username?: string;
        email?: string;
        role?: string;
      }
      if (account?.provider === "credentials") {
        const decoded = jwtDecode<JwtDecodeCustom>(user.token);

        const getUser = await GetUser(decoded?.username, user.token);
        console.log(getUser);

        const image =
          getUser.urlImage != ""
            ? await CekImage(getUser.urlImage)
            : "/images/people/default.jpg";

        console.log(image);

        token.id = getUser.id;
        token.email = getUser.email;
        token.role = decoded?.role;
        token.name = `${getUser.firstName} ${getUser.lastName}`;
        token.firstName = getUser.firstName;
        token.lastName = getUser.lastName;
        token.address = getUser.address;
        token.gender = getUser.gender;
        token.userName = getUser.userName;
        token.phoneNumber = getUser.phoneNumber;
        token.picture = image;
        token.asName = getUser.asName;
        token.emailConfirmed = getUser.emailConfirmed;
        token.passwordExist = getUser.passwordExist;
        token.token = user.token;
      }
      if (account?.provider === "google" || account?.provider == "facebook") {
        token.type = account?.provider;

        const name = user.name.split(" ");
        const username = user.email.split("@");
        const image = await CekImage(user.image);

        const getToken = await LoginAuth(
          user.id,
          name[0],
          name[1],
          user.email,
          username[0],
          image,
          token.type
        );

        const decoded = jwtDecode<JwtDecodeCustom>(getToken.token);
        const getUser = await GetUser(decoded?.email, getToken.token);

        token.id = getUser.id;
        token.email = getUser.email;
        token.role = decoded?.role;
        token.name = `${getUser.firstName} ${getUser.lastName}`;
        token.firstName = getUser.firstName;
        token.lastName = getUser.lastName;
        token.address = getUser.address;
        token.gender = getUser.gender;
        token.userName = getUser.userName;
        token.phoneNumber = getUser.phoneNumber;
        token.picture = getUser.urlImage;
        token.asName = getUser.asName;
        token.emailConfirmed = getUser.emailConfirmed;
        token.passwordExist = getUser.passwordExist;
        token.token = getToken.token;
      }
      if (trigger === "update" && session?.image) {
        const sessionImage = session.image;
        token.picture = sessionImage;
      }
      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      console.log(token);

      return token;
    },
    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      if ("id" in token) {
        session.user.id = token.id;
        session.user.token = token.token;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.address = token.address;
        session.user.gender = token.gender;
        session.user.userName = token.userName;
        session.user.phoneNumber = token.phoneNumber;
        session.user.asName = token.asName;
        session.user.urlImage = token.picture;
        session.user.emailConfirmed = token.emailConfirmed;
        session.user.passwordExist = token.passwordExist;
      }
      console.log(session);

      return session;
    },
  },
};
