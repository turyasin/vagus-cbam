import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-[#0F4C75] to-[#1565a0] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
            CBAM Kesin Dönem — Ocak 2026 itibarıyla aktif
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance">
            AB&apos;ye ihracat yapıyor musunuz?{" "}
            <span className="text-[#F59E0B]">CBAM maliyetinizi</span> hesaplayın.
          </h1>

          <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
            Türk demir-çelik üreticileri için CBAM kapsam kontrolü, karbon
            emisyon hesaplama ve QR Dijital Ürün Pasaportu. Default değer
            cezasından kaçının — gerçek veriyle tasarruf edin.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/hesaplama"
              className="inline-flex items-center justify-center gap-2 bg-[#F59E0B] hover:bg-amber-500 text-[#1E293B] font-bold px-6 py-3 rounded-xl transition-colors text-base"
            >
              Emisyonumu Hesapla
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/cbam-kontrol"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-base"
            >
              Kapsam Kontrolü (Ücretsiz)
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-white/20">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[#F59E0B]">€45,86</div>
              <div className="text-sm text-blue-200 mt-1">
                ton başına ortalama tasarruf
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[#F59E0B]">%30</div>
              <div className="text-sm text-blue-200 mt-1">
                2028 default ceza markup&apos;ı
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[#F59E0B]">65+</div>
              <div className="text-sm text-blue-200 mt-1">
                CN kodu CBAM kapsamında
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
