import { db } from "@/app/_utils/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import * as bcrypt from "bcrypt";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/login", // To provide a custom route path
	},
	adapter: PrismaAdapter(db),
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				// Handle the case when credentials are undefined
				if (!credentials) {
					throw new Error("No credentials provided");
				}

				const { email, password } = credentials;

				// check to see if email and password is there
				if (!email || !password) {
					throw new Error("Please enter an email and password");
				}

				// check to see if user exists
				const user = await db.user.findUnique({
					where: {
						email: email,
					},
				});

				// if no user was found
				if (!user) {
					throw new Error("No user found");
				}

				// check to see if password matches
				const passwordMatch = await bcrypt.compare(password, user.password);

				// if password does not match
				if (!passwordMatch) {
					throw new Error("Incorrect password");
				}

				return user;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id;
			}
			return session;
		},
	},
	secret: process.env.NEXT_AUTH_SECRET,
	debug: process.env.NODE_ENV === "development",
};

export default authOptions;
