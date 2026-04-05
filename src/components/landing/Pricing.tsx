const plans = [
  {
    name: "CBAM Başlangıç",
    price: "€500",
    period: "tek seferlik",
    description: "İlk ürün hesaplaması + CBAM raporu",
    features: [
      "CBAM Annex IV emisyon hesaplama",
      "Default vs. gerçek değer karşılaştırma",
      "PDF rapor (AB ithalatçısına gönderilebilir)",
      "ISO 14067 PCF özeti",
      "Yıllık güncelleme: €250",
    ],
    cta: "İletişime Geç",
    highlighted: false,
  },
  {
    name: "AB Uyumluluk Paketi",
    price: "€500",
    period: "/ ay",
    description: "CBAM hesaplama + QR Dijital İkiz",
    features: [
      "CBAM hesaplama (1–3 ürün)",
      "QR Dijital İkiz kurulumu",
      "CE belgesi + teknik doküman paketi",
      "Aylık maliyet izleme",
      "AB ithalatçı portalı erişimi",
    ],
    cta: "İletişime Geç",
    highlighted: true,
  },
  {
    name: "Full DPP Hazırlık",
    price: "€900",
    period: "/ ay",
    description: "CBAM + DPP + ISO 14067 + çoklu ürün",
    features: [
      "Tüm Paket B özellikleri",
      "Çoklu ürün (4–10 ürün)",
      "ISO 14067 tam PCF hesaplama",
      "İthalatçı portalı",
      "Kurulum: €1,500 (tek seferlik)",
    ],
    cta: "İletişime Geç",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="fiyatlandirma" className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-4">
            Şeffaf fiyatlandırma
          </h2>
          <p className="text-lg text-[#64748B]">
            CBAM tasarrufu yıllık retainer maliyetinin üzerinde.
          </p>
        </div>

        {/* Value example */}
        <div className="bg-[#1B8A5A] text-white rounded-xl p-6 md:p-8 mb-10 max-w-2xl mx-auto">
          <h3 className="font-bold text-lg mb-3">Örnek hesaplama — Giresun, CNC Talaş Arabası</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#F59E0B]">€63,81</div>
              <div className="text-xs text-green-100 mt-1">Default / ton</div>
            </div>
            <div>
              <div className="text-2xl font-bold">€17,96</div>
              <div className="text-xs text-green-100 mt-1">Gerçek değer / ton</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#F59E0B]">€6,993</div>
              <div className="text-xs text-green-100 mt-1">Yıllık tasarruf</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-6 md:p-8 flex flex-col gap-6 ${
                plan.highlighted
                  ? "bg-[#0F4C75] text-white border-[#0F4C75] shadow-xl"
                  : "bg-white border-[#E2E8F0]"
              }`}
            >
              {plan.highlighted && (
                <span className="self-start text-xs font-bold bg-[#F59E0B] text-[#1E293B] px-3 py-1 rounded-full">
                  En Popüler
                </span>
              )}
              <div>
                <h3 className={`font-bold text-lg ${plan.highlighted ? "text-white" : "text-[#1E293B]"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mt-1 ${plan.highlighted ? "text-blue-200" : "text-[#64748B]"}`}>
                  {plan.description}
                </p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className={`text-sm ${plan.highlighted ? "text-blue-200" : "text-[#64748B]"}`}>
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlighted ? "text-[#F59E0B]" : "text-[#1B8A5A]"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={plan.highlighted ? "text-blue-100" : "text-[#1E293B]"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="mailto:info@vagus.io"
                className={`block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-colors ${
                  plan.highlighted
                    ? "bg-[#F59E0B] hover:bg-amber-500 text-[#1E293B]"
                    : "bg-[#0F4C75] hover:bg-[#0a3555] text-white"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
