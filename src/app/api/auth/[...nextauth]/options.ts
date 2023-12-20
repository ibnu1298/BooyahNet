import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CridetialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      name: "githubLogin",
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
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
    async jwt({ token, account, profile, user }: any) {
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
      interface JwtDecodeCustom {
        exp?: number;
        username?: string;
        email?: string;
        role?: string;
      }
      if (account?.provider === "credentials") {
        const decoded = jwtDecode<JwtDecodeCustom>(user.token);

        const getUser = await GetUser(decoded?.username, user.token);
        console.log(getUser);

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
        token.token = user.token;
      }

      return token;
    },
    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      session.user.id = token.id;
      session.user.token = token.token;
      session.user.role = token.role;
      session.user.name = token.name;
      session.user.firstName = token.lastName;
      session.user.address = token.address;
      session.user.gender = token.gender;
      session.user.userName = token.userName;
      session.user.phoneNumber = token.phoneNumber;

      return session;
    },
  },
};
