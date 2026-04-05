import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VAGUS — AB İhracat Uyumluluk Platformu",
  description:
    "Türk KOBİ imalatçılar için CBAM karbon hesaplama, kapsam kontrolü ve QR Dijital Ürün Pasaportu çözümleri.",
  keywords: [
    "CBAM",
    "karbon hesaplama",
    "AB ihracat",
    "CBAM kapsam kontrolü",
    "dijital ürün pasaportu",
    "DPP",
    "GTİP CBAM",
  ],
  openGraph: {
    title: "VAGUS — AB İhracat Uyumluluk Platformu",
    description:
      "CBAM kapsamında mısınız? Ücretsiz kontrol edin. Karbon maliyetinizi hesaplayın.",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-[#1E293B]">
        {children}
      </body>
    </html>
  );
}
