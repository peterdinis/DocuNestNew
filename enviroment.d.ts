declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_URL: string;
			NODE_ENV: "development" | "production";
			SOCKET_SERVER_URL: string;
			SOCKET_SERVER_PORT: number;
			FRONTEND_URL: string;
		}
	}
}

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
		} & DefaultSession["user"];
	}
}

export {};
