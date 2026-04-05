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
      <main className="flex-1">
        {/* Page hero */}
        <section className="bg-gradient-to-r from-[#0F4C75] to-[#1565a0] text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold bg-[#1B8A5A] text-white px-3 py-1 rounded-full">
                Ücretsiz
              </span>
              <span className="text-xs text-blue-200">Kayıt gerekmez</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-balance">
              CBAM Kapsam Kontrol Aracı
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl">
              AB&apos;ye ihraç ettiğiniz ürün CBAM kapsamında mı? CN/GTİP kodunuzu
              veya ürün adınızı aratın — anında öğrenin.
            </p>
          </div>
        </section>

        {/* Main content */}
        <section className="py-10 md:py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-[#0F4C75] mb-1">Ocak 2026</div>
                <div className="text-xs text-[#64748B]">CBAM kesin dönem başladı</div>
              </div>
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-[#0F4C75] mb-1">%10</div>
                <div className="text-xs text-[#64748B]">2026 default değer ceza markup&apos;ı</div>
              </div>
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-[#0F4C75] mb-1">65+</div>
                <div className="text-xs text-[#64748B]">Kapsam içi CN kodu</div>
              </div>
            </div>

            {/* Search component */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 md:p-8 shadow-sm">
              <CbamSearch />
            </div>

            {/* Next steps */}
            <div className="mt-8 bg-[#0F4C75]/5 border border-[#0F4C75]/20 rounded-xl p-6">
              <h2 className="font-bold text-[#0F4C75] mb-4">
                Ürününüz CBAM kapsamındaysa — sırada ne var?
              </h2>
              <ol className="space-y-3">
                {[
                  {
                    step: "1",
                    text: "AB ithalatçınız 2027'den itibaren sizden gerçek emisyon verisi talep edecek.",
                  },
                  {
                    step: "2",
                    text: "Gerçek veri sağlamazsanız default değer + %10–30 ceza markup'ı uygulanır.",
                  },
                  {
                    step: "3",
                    text: "VAGUS ile emisyon hesaplama yapın — tasarruf potansiyelinizi görün.",
                  },
                ].map((item) => (
                  <li key={item.step} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#0F4C75] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {item.step}
                    </span>
                    <span className="text-sm text-[#1E293B]">{item.text}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-5">
                <a
                  href="mailto:info@vagus.io"
                  className="inline-flex items-center gap-2 bg-[#0F4C75] hover:bg-[#0a3555] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
                >
                  Ücretsiz ön hesaplama talep et
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="mt-6 text-xs text-[#64748B] text-center">
              Bu araç bilgilendirme amaçlıdır. CBAM kapsamı ve kod sınıflandırması
              konusunda kesin karar için AB CBAM Tüzüğü Annex I&apos;i inceleyin veya
              gümrük müşavirinize danışın.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
