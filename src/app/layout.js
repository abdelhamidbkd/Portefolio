import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LangProvider } from "../context/langContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Portfolio Abdelhamid Benkada",
  description: "Développeur Full Stack passionné par la sécurité web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="...">
        <LangProvider>{children}</LangProvider> 
      </body>
    </html>
  );
}
