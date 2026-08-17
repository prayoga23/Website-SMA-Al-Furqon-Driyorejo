import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/context/data-context";
import DisableInspect from "@/components/disable-inspect";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SMA AL-FURQON DRIYOREJO | Official School Website 2026",
  description:
    "Official Website SMA Al-Furqon Driyorejo Gresik - Membentuk Generasi Beriman, Berprestasi, dan Peduli Lingkungan. Akreditasi A, Kurikulum Merdeka & Metode UMMI.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  keywords: [
    "SMA Al-Furqon Driyorejo",
    "SMA Gresik",
    "Pondok Pesantren Al-Furqon",
    "Sekolah Islam Gresik",
    "PPDB SMA Al-Furqon 2026",
    "SMA Akreditasi A Driyorejo",
    "Tahfidz Al-Qur'an Gresik",
  ],
  authors: [{ name: "SMA Al-Furqon Driyorejo" }],
  openGraph: {
    title: "SMA AL-FURQON DRIYOREJO | Official School Website",
    description:
      "Membentuk Generasi Beriman, Berprestasi, dan Peduli Lingkungan dengan Akreditasi A, Kurikulum Merdeka, dan Metode UMMI.",
    url: "https://smaalfurqondriyorejo.sch.id",
    siteName: "SMA AL-FURQON DRIYOREJO",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100 transition-colors duration-300">
        <DisableInspect />
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
