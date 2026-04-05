import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HesaplamaClient from "./HesaplamaClient";

export const metadata: Metadata = {
  title: "CBAM Emisyon Hesaplama — Gerçek Karbon Değerinizi Öğrenin | VAGUS",
  description:
    "CBAM Annex IV uyumlu ücretsiz emisyon hesaplama. Doğalgaz ve elektrik tüketiminizi girin, gerçek tCO₂e değerinizi ve default değere göre yıllık tasarrufu anında görün.",
  keywords: ["CBAM hesaplama", "karbon emisyon hesaplama", "tCO2e hesaplama", "CBAM maliyet"],
};

export default function HesaplamaPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Minimal header */}
        <div className="bg-[#0F4C75] px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-base sm:text-lg leading-tight">
              CBAM Emisyon Hesaplama
            </h1>
            <p className="text-blue-200 text-xs mt-0.5 hidden sm:block">
              Gerçek değerinizle CBAM maliyetinizi hesaplayın, default ceza markup&apos;ından kaçının
            </p>
          </div>
          <span className="text-xs font-bold bg-[#1B8A5A] text-white px-3 py-1 rounded-full flex-shrink-0">
            Ücretsiz
          </span>
        </div>

        {/* Wizard */}
        <div className="max-w-xl w-full mx-auto px-4 sm:px-6 py-8">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm p-6 md:p-8">
            <HesaplamaClient />
          </div>

          <p className="text-xs text-center text-[#CBD5E1] mt-4">
            DEFRA 2024 · TEİAŞ 2023 · CBAM Annex IV metodolojisi
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
