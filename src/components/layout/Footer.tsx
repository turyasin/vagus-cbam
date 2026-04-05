import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0F4C75] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <span className="text-xl font-bold tracking-tight">VAGUS</span>
            <p className="text-sm text-blue-200 leading-relaxed">
              Türk KOBİ imalatçıları için AB ihracat uyumluluk çözümleri. CBAM
              hesaplama, QR Dijital İkiz ve DPP hazırlığı.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-blue-100 uppercase tracking-wider">
              Araçlar
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/cbam-kontrol"
                  className="text-sm text-blue-200 hover:text-white transition-colors"
                >
                  CBAM Kapsam Kontrol (Ücretsiz)
                </Link>
              </li>
              <li>
                <span className="text-sm text-blue-300">
                  Emisyon Hesaplama (Çok Yakında)
                </span>
              </li>
              <li>
                <span className="text-sm text-blue-300">
                  QR Dijital İkiz (Çok Yakında)
                </span>
              </li>
            </ul>
          </div>

          {/* Regulatory */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-blue-100 uppercase tracking-wider">
              Regülasyonlar
            </h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>CBAM — EU 2023/956</li>
              <li>ESPR / Dijital Ürün Pasaportu</li>
              <li>ISO 14067 — Ürün Karbon Ayak İzi</li>
              <li>Makine Emniyeti Yönetmeliği 2026/32</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-blue-300">
            © 2026 VAGUS AI Business Automation. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-blue-300">
            CBAM hesaplamaları referans amaçlıdır. Resmi beyan sorumluluğu
            ithalatçıya aittir.
          </p>
        </div>
      </div>
    </footer>
  );
}
