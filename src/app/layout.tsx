import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono-geist",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://kajoldavda.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Kajol Davda · Product Designer",
  description:
    "Product designer working on consumer brands and e-commerce. Case studies, craft and contact.",
  openGraph: {
    title: "Kajol Davda · Product Designer",
    description:
      "Product designer working on consumer brands and e-commerce. Case studies, craft and contact.",
    url: siteUrl,
    siteName: "Kajol Davda",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kajol Davda · Product Designer",
    description:
      "Product designer working on consumer brands and e-commerce. Case studies, craft and contact.",
  },
};

// Applies the stored theme before paint so there is no flash of the wrong palette.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
