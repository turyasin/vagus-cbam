import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CbamSearch from "@/components/cbam/CbamSearch";

export const metadata: Metadata = {
  title: "CBAM Kapsam Kontrolü — Ürününüz AB Karbon Sınır Vergisi Kapsamında mı? | VAGUS",
  description:
    "Ücretsiz CBAM kapsam kontrolü. CN kodunuzu veya ürün adınızı girin — ürününüzün AB Sınırda Karbon Düzenleme Mekanizması (CBAM) kapsamında olup olmadığını anında öğrenin.",
  keywords: [
    "CBAM kapsam kontrolü",
    "GTİP CBAM",
    "ürünüm CBAM kapsamında mı",
    "CBAM CN kodu",
    "AB karbon vergisi",
    "sınırda karbon düzenleme",
  ],
};

export default function CbamKontrolPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        {/* Minimal header band */}
        <div className="bg-[#0F4C75] px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-base sm:text-lg leading-tight">
              CBAM Kapsam Kontrolü
            </h1>
            <p className="text-blue-200 text-xs mt-0.5 hidden sm:block">
              Ürününüzün AB karbon düzenlemesi kapsamında olup olmadığını öğrenin
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold bg-[#1B8A5A] text-white px-3 py-1 rounded-full">
              Ücretsiz
            </span>
            <span className="text-xs text-blue-300 hidden sm:inline">Kayıt gerekmez</span>
          </div>
        </div>

        {/* Chat area — grows to fill screen */}
        <div className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col">
          <div className="flex-1 bg-white border border-[#E2E8F0] rounded-2xl shadow-sm p-5 flex flex-col">
            <CbamSearch />
          </div>

          <p className="text-xs text-center text-[#CBD5E1] mt-4">
            Bu araç bilgilendirme amaçlıdır — kesin sınıflandırma için gümrük müşavirinize danışın.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
