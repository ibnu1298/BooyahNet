import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CridetialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: "ibnuaqil1298",
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
          placeholder: "contoh@mail.com",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials) {
        const url = "https://booyahnetapi.azurewebsites.net/api/User/Login";
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        async function LoginAuth(user: string, pass: string) {
          const res = await fetch(url, {
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

        const response = await LoginAuth(email, password);

        // const data = {
        //   userId: response.userId,
        //   firstname: response.firstname,
        //   lastname: response.lastname,
        //   address: response.address,
        //   email: response.email,
        //   gender: response.gender,
        //   phoneNumber: response.phoneNumber,
        //   username: response.username,
        //   token: response.token,
        //   message: response.message,
        //   isSucceeded: response.isSucceeded,
        // };

        if (response.isSucceeded) {
          return response;
        } else {
          return null;
        }
      },
    }),
  ],
  jwt: {
    secret: "secretCode",
  },
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      console.log(user);
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.name = `${user.firstname} ${user.lastname}`;
        token.token = user.token;
        token.picture = null;
      }

      console.log(token);
      return token;
    },
    async session({ session, token }: any) {
      console.log(token);
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("token" in token) {
        session.user.token = token.token;
      }
      console.log(session);
      return session;
    },
  },
};
