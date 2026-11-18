import {
  Sofia_Sans,
  Sofia_Sans_Condensed,
  Source_Serif_4,
} from "next/font/google";
import "./globals.css";

const cond = Sofia_Sans_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-cond",
  display: "swap",
});
const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif4",
  display: "swap",
});
const ui = Sofia_Sans({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://aaklegacy.org"),
  title: "Akarachi Amadi | A man of the people",
  description:
    "Hon. Engr. Akarachi Etinosa Amadi, Member of the House of Representatives for Mbaitoli/Ikeduru, Imo State. The man, the record and the work at home.",
  robots: { index: false, follow: false },
  openGraph: { type: "website", siteName: "AAK Legacy Foundation", url: "/" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cond.variable} ${serif.variable} ${ui.variable} antialiased`}
    >
      <body className="min-h-screen">
        <a
          href="#main"
          className="ui sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
