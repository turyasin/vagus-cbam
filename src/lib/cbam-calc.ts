// ─── CBAM Emisyon Hesaplama Engine ────────────────────────────────────────────
// Kaynak: CBAM Annex IV + ISO 14067 + DEFRA 2024 + TEİAŞ 2023

// ─── Emisyon Faktörleri ────────────────────────────────────────────────────────

/** DEFRA 2024 — kgCO₂e/m³ */
export const EF_NATURAL_GAS = 2.04;

/** DEFRA 2024 — kgCO₂e/litre */
export const EF_DIESEL = 2.68;

/** TEİAŞ 2023 Türkiye grid — kgCO₂e/kWh */
export const EF_ELECTRICITY_TR = 0.457;

/** EU ETS sertifika fiyatı tahmini 2026 (€/tCO₂e) */
export const EU_ETS_PRICE_2026 = 68.25;

/** CBAM default değer markup'ları */
export const CBAM_DEFAULT_MARKUP = {
  2026: 1.10,
  2027: 1.20,
  2028: 1.30,
} as const;

// ─── Üretim Rotası Emisyon Yoğunlukları (tCO₂e/ton çelik) ───────────────────

export type ProductionRoute = "BF-BOF" | "DRI-EAF" | "Hurda-EAF";

export const ROUTE_LABELS: Record<ProductionRoute, string> = {
  "BF-BOF": "Yüksek Fırın — BOF (BF-BOF)",
  "DRI-EAF": "Doğrudan İndirgeme — EAF (DRI-EAF)",
  "Hurda-EAF": "Hurda Çeliği — EAF (Hurda-EAF)",
};

/**
 * JRC/CBAM ülke bazlı default değerler — Türkiye için orta nokta değerler.
 * Kullanıcı gerçek veri sağlarsa bu değerler karşılaştırma için kullanılır.
 */
export const ROUTE_DEFAULT_EMISSION: Record<ProductionRoute, number> = {
  "BF-BOF": 2.1,    // tCO₂e/ton — Türkiye BF-BOF ortalaması
  "DRI-EAF": 1.15,  // tCO₂e/ton — DRI-EAF
  "Hurda-EAF": 0.45, // tCO₂e/ton — hurda bazlı EAF
};

// ─── Girdi ve Çıktı Tipleri ───────────────────────────────────────────────────

export interface CalcInput {
  /** Ürün / CN kodu açıklaması */
  productName: string;
  /** Aylık üretim miktarı (ton/ay) */
  monthlyOutput: number;
  /** Üretim rotası */
  route: ProductionRoute;
  /** Aylık doğalgaz tüketimi (m³/ay) */
  naturalGasM3: number;
  /** Aylık elektrik tüketimi (kWh/ay) */
  electricityKwh: number;
  /** Aylık motorin tüketimi, opsiyonel (litre/ay) */
  dieselLitre?: number;
}

export interface CalcResult {
  // ─ Scope 1 (doğrudan, CBAM'a dahil)
  scope1Monthly: number;     // tCO₂e/ay — yakıt kaynaklı
  scope1PerTon: number;      // tCO₂e/ton ürün

  // ─ Scope 2 (elektrik, sadece raporlama)
  scope2Monthly: number;     // tCO₂e/ay
  scope2PerTon: number;      // tCO₂e/ton ürün

  // ─ Toplam gömülü emisyon (CBAM formülü = Scope 1 only)
  embeddedEmissionPerTon: number; // tCO₂e/ton — gerçek değer

  // ─ Default değer (CBAM baseline)
  defaultEmissionPerTon: number;  // tCO₂e/ton — Türkiye default

  // ─ CBAM Maliyetleri (yıllık)
  annualOutput: number;           // ton/yıl
  realCbamCostAnnual: number;     // € — gerçek değerle
  defaultCbamCostAnnual: number;  // € — default değerle (2026 markup dahil)
  annualSavings: number;          // € — tasarruf (default - gerçek)

  // ─ 2028 projeksiyonu (markup %30)
  defaultCbamCost2028: number;    // €
  realCbamCost2028: number;       // €
  savings2028: number;            // €

  // ─ Meta
  savingsPerTon: number;          // €/ton
  savingsPercent: number;         // % azalma
  etsPriceUsed: number;           // €/tCO₂e
}

// ─── Hesaplama Fonksiyonu ─────────────────────────────────────────────────────

export function calculateCbam(input: CalcInput): CalcResult {
  const {
    monthlyOutput,
    route,
    naturalGasM3,
    electricityKwh,
    dieselLitre = 0,
  } = input;

  // Scope 1 — aylık (tCO₂e)
  const gasEmission = (naturalGasM3 * EF_NATURAL_GAS) / 1000;
  const dieselEmission = (dieselLitre * EF_DIESEL) / 1000;
  const scope1Monthly = gasEmission + dieselEmission;

  // Scope 2 — aylık (tCO₂e)
  const scope2Monthly = (electricityKwh * EF_ELECTRICITY_TR) / 1000;

  // Ton başına değerler
  const scope1PerTon = monthlyOutput > 0 ? scope1Monthly / monthlyOutput : 0;
  const scope2PerTon = monthlyOutput > 0 ? scope2Monthly / monthlyOutput : 0;

  // CBAM gömülü emisyon = sadece Scope 1 (Annex IV)
  const embeddedEmissionPerTon = scope1PerTon;

  // Default değer (Türkiye ülke bazlı)
  const defaultEmissionPerTon = ROUTE_DEFAULT_EMISSION[route];

  // Yıllık üretim
  const annualOutput = monthlyOutput * 12;

  // CBAM Maliyetleri — 2026
  const realCbamCostAnnual =
    embeddedEmissionPerTon * annualOutput * EU_ETS_PRICE_2026;
  const defaultCbamCostAnnual =
    defaultEmissionPerTon *
    annualOutput *
    EU_ETS_PRICE_2026 *
    CBAM_DEFAULT_MARKUP[2026];

  const annualSavings = defaultCbamCostAnnual - realCbamCostAnnual;

  // 2028 projeksiyonu
  const defaultCbamCost2028 =
    defaultEmissionPerTon *
    annualOutput *
    EU_ETS_PRICE_2026 *
    CBAM_DEFAULT_MARKUP[2028];
  const realCbamCost2028 =
    embeddedEmissionPerTon * annualOutput * EU_ETS_PRICE_2026;
  const savings2028 = defaultCbamCost2028 - realCbamCost2028;

  // Yüzdelik azalma
  const savingsPerTon =
    (defaultEmissionPerTon * CBAM_DEFAULT_MARKUP[2026] -
      embeddedEmissionPerTon) *
    EU_ETS_PRICE_2026;
  const savingsPercent =
    defaultEmissionPerTon > 0
      ? ((defaultEmissionPerTon - embeddedEmissionPerTon) /
          defaultEmissionPerTon) *
        100
      : 0;

  return {
    scope1Monthly,
    scope1PerTon,
    scope2Monthly,
    scope2PerTon,
    embeddedEmissionPerTon,
    defaultEmissionPerTon,
    annualOutput,
    realCbamCostAnnual,
    defaultCbamCostAnnual,
    annualSavings,
    defaultCbamCost2028,
    realCbamCost2028,
    savings2028,
    savingsPerTon,
    savingsPercent,
    etsPriceUsed: EU_ETS_PRICE_2026,
  };
}

// ─── Format Yardımcıları ──────────────────────────────────────────────────────

export function fmt(n: number, decimals = 2): string {
  return n.toLocaleString("tr-TR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function fmtEur(n: number): string {
  return `€${n.toLocaleString("tr-TR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}
