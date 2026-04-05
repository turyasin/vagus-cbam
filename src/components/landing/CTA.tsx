import Link from "next/link";

export default function CTA() {
  return (
    <section id="iletisim" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0F4C75] to-[#1565a0] rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Ürününüzün CBAM kapsamında olup olmadığını hemen öğrenin
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Ücretsiz kapsam kontrolü aracımızla CN kodunuzu veya ürün adınızı
            aratın. Kayıt gerekmez.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cbam-kontrol"
              className="inline-flex items-center justify-center gap-2 bg-[#F59E0B] hover:bg-amber-500 text-[#1E293B] font-bold px-8 py-3.5 rounded-xl transition-colors"
            >
              Ücretsiz Kapsam Kontrolü
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="mailto:info@vagus.io"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
            >
              Ücretsiz danışmanlık talep et
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
