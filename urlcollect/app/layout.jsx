import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import NavBar from "./navbar";
import { shadcn } from "@clerk/themes";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "URL Store",
	description: "Store and manage your URLs efficiently",
};

export default function RootLayout({ children }) {
	return (
		<ClerkProvider appearance={{ baseTheme: shadcn }}>
			<html lang="en" suppressHydrationWarning>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<ThemeProvider storageKey="theme" defaultTheme="system" enableSystem={true} attribute={"class"}>
						<NavBar />
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
