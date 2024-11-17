import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import SessionCheckHelper from "./_components/auth/SessionChcekHelper";
import Navigation from "./_components/shared/Navigation";
import ScrollToTop from "./_components/shared/ScrollToTop";
import QueryProvider from "./_components/shared/providers/QueryProvider";
import SessionAppProvider from "./_components/shared/providers/SessionProvider";
import ThemeProvider from "./_components/shared/providers/ThemeProvider";

export const metadata: Metadata = {
	title: "DocuNest",
	description: "Application for taking notes with AI power",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased`}>
				<ThemeProvider>
					<QueryProvider>
						<SessionAppProvider>
							<SessionCheckHelper>
								<Navigation />
								{children}
								<ScrollToTop />
								<Toaster />
							</SessionCheckHelper>
						</SessionAppProvider>
					</QueryProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
