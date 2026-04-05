const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "CBAM Kapsam Kontrolü",
    badge: "Ücretsiz",
    badgeColor: "bg-[#1B8A5A] text-white",
    description:
      "CN kodunuzu veya ürün adınızı girin — anında CBAM kapsamında olup olmadığınızı öğrenin. 65+ kod, Türkçe açıklamalar.",
    href: "/cbam-kontrol",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Karbon Emisyon Hesaplama",
    badge: "Çok Yakında",
    badgeColor: "bg-[#64748B] text-white",
    description:
      "CBAM Annex IV + ISO 14067 uyumlu hesaplama. Yakıt, hammadde, üretim verilerinizi girin — gerçek emisyon değerinizi öğrenin.",
    href: "/#iletisim",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "QR Dijital İkiz (DPP)",
    badge: "Çok Yakında",
    badgeColor: "bg-[#64748B] text-white",
    description:
      "Her ürün için QR kod ile erişilebilen dijital kimlik paketi. CBAM raporu, CE belgesi, teknik çizimler — tek noktada.",
    href: "/#iletisim",
  },
];

export default function Features() {
  return (
    <section id="nasil-calisir" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-4">
            AB uyumluluğu için tek platform
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            CBAM kapsam kontrolünden emisyon hesaplamaya, Dijital Ürün
            Pasaportu hazırlığına — Türk KOBİ imalatçıları için tasarlandı.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6 md:p-8 flex flex-col gap-4 hover:border-[#0F4C75]/30 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-[#0F4C75]/10 rounded-lg flex items-center justify-center text-[#0F4C75]">
                  {feature.icon}
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${feature.badgeColor}`}>
                  {feature.badge}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1E293B] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mt-16 bg-[#0F4C75]/5 border border-[#0F4C75]/20 rounded-xl p-6 md:p-8">
          <h3 className="text-lg font-bold text-[#0F4C75] mb-6 text-center">
            CBAM Zaman Çizelgesi — Harekete geçin
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { date: "Ocak 2026", event: "Kesin dönem başladı", active: true },
              { date: "2026", event: "Default markup: %10", active: true },
              { date: "2027", event: "Default markup: %20", active: false },
              { date: "Eylül 2027", event: "İlk sertifika teslimi", active: false },
            ].map((item) => (
              <div key={item.date} className="text-center">
                <div
                  className={`text-sm font-bold mb-1 ${
                    item.active ? "text-[#0F4C75]" : "text-[#64748B]"
                  }`}
                >
                  {item.date}
                </div>
                <div
                  className={`text-xs ${
                    item.active ? "text-[#1E293B] font-medium" : "text-[#64748B]"
                  }`}
                >
                  {item.event}
                </div>
                {item.active && (
                  <div className="mt-2 w-2 h-2 rounded-full bg-[#F59E0B] mx-auto animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
