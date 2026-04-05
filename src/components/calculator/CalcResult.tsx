"use client";

import { useState } from "react";
import type { CalcInput, CalcResult } from "@/lib/cbam-calc";
import { fmt, fmtEur, ROUTE_LABELS } from "@/lib/cbam-calc";

// ─── Metrik kart ──────────────────────────────────────────────────────────────

function MetricCard({
  label,
  value,
  sub,
  highlight,
  color,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  color?: "green" | "red" | "blue" | "amber";
}) {
  const colors = {
    green: "border-[#1B8A5A]/30 bg-[#F0FDF4]",
    red: "border-red-200 bg-red-50",
    blue: "border-[#0F4C75]/20 bg-[#EFF6FF]",
    amber: "border-[#F59E0B]/30 bg-[#FFFBEB]",
  };
  const valueColors = {
    green: "text-[#1B8A5A]",
    red: "text-red-600",
    blue: "text-[#0F4C75]",
    amber: "text-[#D97706]",
  };

  return (
    <div
      className={`rounded-xl border-2 p-4 md:p-5 ${
        color ? colors[color] : highlight ? "border-[#0F4C75]/20 bg-[#EFF6FF]" : "border-[#E2E8F0] bg-white"
      }`}
    >
      <p className="text-xs font-medium text-[#64748B] mb-1">{label}</p>
      <p
        className={`text-2xl font-bold ${
          color ? valueColors[color] : highlight ? "text-[#0F4C75]" : "text-[#1E293B]"
        }`}
      >
        {value}
      </p>
      {sub && <p className="text-xs text-[#94A3B8] mt-1">{sub}</p>}
    </div>
  );
}

// ─── Karşılaştırma çubuğu ──────────────────────────────────────────────────────

function ComparisonBar({
  realValue,
  defaultValue,
}: {
  realValue: number;
  defaultValue: number;
}) {
  const max = Math.max(realValue, defaultValue) * 1.1;
  const realPct = (realValue / max) * 100;
  const defaultPct = (defaultValue / max) * 100;

  return (
    <div className="space-y-3">
      <div>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="font-semibold text-[#1B8A5A]">Gerçek değeriniz</span>
          <span className="font-bold text-[#1B8A5A]">{fmt(realValue, 3)} tCO₂e/ton</span>
        </div>
        <div className="h-5 bg-[#E2E8F0] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1B8A5A] rounded-full transition-all duration-700"
            style={{ width: `${realPct}%` }}
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="font-semibold text-[#64748B]">CBAM default (Türkiye)</span>
          <span className="font-bold text-[#64748B]">{fmt(defaultValue, 3)} tCO₂e/ton</span>
        </div>
        <div className="h-5 bg-[#E2E8F0] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#94A3B8] rounded-full transition-all duration-700"
            style={{ width: `${defaultPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Maliyet Tablosu ──────────────────────────────────────────────────────────

function CostTable({ result }: { result: CalcResult }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E2E8F0]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
            <th className="text-left px-4 py-3 font-semibold text-[#64748B] text-xs uppercase tracking-wider">Senaryo</th>
            <th className="text-right px-4 py-3 font-semibold text-[#64748B] text-xs uppercase tracking-wider">2026 (yıllık)</th>
            <th className="text-right px-4 py-3 font-semibold text-[#64748B] text-xs uppercase tracking-wider">2028 (yıllık)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E2E8F0]">
          <tr className="bg-red-50/50">
            <td className="px-4 py-3 text-[#1E293B]">
              <span className="font-semibold">Default değer</span>
              <span className="block text-xs text-[#64748B]">Gerçek veri sağlanmazsa</span>
            </td>
            <td className="px-4 py-3 text-right font-bold text-red-600">{fmtEur(result.defaultCbamCostAnnual)}</td>
            <td className="px-4 py-3 text-right font-bold text-red-700">{fmtEur(result.defaultCbamCost2028)}</td>
          </tr>
          <tr className="bg-[#F0FDF4]/50">
            <td className="px-4 py-3 text-[#1E293B]">
              <span className="font-semibold text-[#1B8A5A]">Gerçek değer (sizin)</span>
              <span className="block text-xs text-[#64748B]">Bu hesaplama sonucu</span>
            </td>
            <td className="px-4 py-3 text-right font-bold text-[#1B8A5A]">{fmtEur(result.realCbamCostAnnual)}</td>
            <td className="px-4 py-3 text-right font-bold text-[#1B8A5A]">{fmtEur(result.realCbamCost2028)}</td>
          </tr>
          <tr className="bg-[#FFFBEB]/70 border-t-2 border-[#F59E0B]/30">
            <td className="px-4 py-3 text-[#1E293B]">
              <span className="font-bold text-[#D97706]">Tasarruf</span>
              <span className="block text-xs text-[#64748B]">Gerçek veri kullanarak</span>
            </td>
            <td className="px-4 py-3 text-right font-bold text-[#D97706]">{fmtEur(result.annualSavings)}</td>
            <td className="px-4 py-3 text-right font-bold text-[#D97706]">{fmtEur(result.savings2028)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ─── Lead Capture ──────────────────────────────────────────────────────────────

function LeadCapture({ productName, savings }: { productName: string; savings: number }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Faz 3'te Supabase'e kaydedilecek — şimdilik mailto
    const subject = encodeURIComponent(`VAGUS CBAM Rapor Talebi — ${productName}`);
    const body = encodeURIComponent(
      `Merhaba,\n\n${productName} ürünüm için CBAM hesaplama yaptım.\nYıllık tasarruf potansiyelim: ${fmtEur(savings)}\n\nDetaylı raporu e-posta adresime gönderin: ${email}\n\nTeşekkürler.`
    );
    window.location.href = `mailto:info@vagus.io?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-[#F0FDF4] border border-[#1B8A5A]/30 rounded-xl p-5 text-center">
        <p className="text-[#1B8A5A] font-semibold">Talebiniz alındı!</p>
        <p className="text-sm text-[#64748B] mt-1">
          En kısa sürede CBAM uyumluluk raporunuzu hazırlayıp göndereceğiz.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#0F4C75] to-[#1565a0] rounded-xl p-5 md:p-6 text-white">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <p className="font-bold">PDF Rapor — Ücretsiz</p>
          <p className="text-xs text-blue-200 mt-0.5">
            CBAM uyumlu emisyon raporu, AB ithalatçınıza gönderilebilir format
          </p>
        </div>
      </div>

      <div className="bg-white/10 rounded-lg px-4 py-2.5 mb-4 text-sm">
        <span className="text-blue-200">Yıllık tasarruf potansiyeliniz:</span>{" "}
        <span className="font-bold text-[#F59E0B] text-base">{fmtEur(savings)}</span>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posta adresiniz"
          required
          className="flex-1 px-3.5 py-2.5 text-sm rounded-lg bg-white/15 border border-white/25 placeholder-blue-300 text-white focus:outline-none focus:border-white/60 transition-colors"
        />
        <button
          type="submit"
          className="px-4 py-2.5 bg-[#F59E0B] hover:bg-amber-500 text-[#1E293B] font-bold text-sm rounded-lg transition-colors whitespace-nowrap flex-shrink-0"
        >
          Rapor iste
        </button>
      </form>
      <p className="text-xs text-blue-300 mt-2">Spam yok. İstediğiniz zaman çıkabilirsiniz.</p>
    </div>
  );
}

// ─── Ana Sonuç Bileşeni ───────────────────────────────────────────────────────

interface CalcResultProps {
  input: CalcInput;
  result: CalcResult;
  onReset: () => void;
}

export default function CalcResultView({ input, result, onReset }: CalcResultProps) {
  const isGoodResult = result.savingsPercent > 10;

  return (
    <div className="space-y-6">
      {/* Başlık + özet */}
      <div className="text-center">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-3 ${
            isGoodResult
              ? "bg-[#1B8A5A] text-white"
              : "bg-[#64748B] text-white"
          }`}
        >
          {isGoodResult ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Gerçek verilerle tasarruf edebilirsiniz
            </>
          ) : (
            <>Emisyon değeriniz hesaplandı</>
          )}
        </div>
        <p className="text-sm text-[#64748B]">
          <span className="font-semibold text-[#1E293B]">{input.productName}</span>
          {" · "}{ROUTE_LABELS[input.route]}
          {" · "}{fmt(input.monthlyOutput, 0)} ton/ay
        </p>
      </div>

      {/* Ana metrikler */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          label="Gerçek emisyonunuz"
          value={`${fmt(result.embeddedEmissionPerTon, 3)} tCO₂e/ton`}
          sub="Scope 1 — CBAM'a dahil"
          color="green"
        />
        <MetricCard
          label="CBAM default değeri"
          value={`${fmt(result.defaultEmissionPerTon, 3)} tCO₂e/ton`}
          sub="Türkiye bazlı karşılaştırma"
          color="red"
        />
        <MetricCard
          label="Yıllık tasarruf (2026)"
          value={fmtEur(result.annualSavings)}
          sub={`${fmt(result.savingsPercent, 0)}% daha düşük emisyon`}
          color="amber"
        />
        <MetricCard
          label="Scope 2 (raporlama)"
          value={`${fmt(result.scope2PerTon, 3)} tCO₂e/ton`}
          sub="Elektrik — fiyatlandırılmaz"
          color="blue"
        />
      </div>

      {/* Karşılaştırma çubuğu */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
        <h3 className="text-sm font-bold text-[#1E293B] mb-4">Emisyon karşılaştırması</h3>
        <ComparisonBar
          realValue={result.embeddedEmissionPerTon}
          defaultValue={result.defaultEmissionPerTon}
        />
      </div>

      {/* Maliyet tablosu */}
      <div>
        <h3 className="text-sm font-bold text-[#1E293B] mb-3">CBAM Maliyet Simülatörü</h3>
        <CostTable result={result} />
        <p className="text-xs text-[#94A3B8] mt-2 text-right">
          EU ETS: €{result.etsPriceUsed}/tCO₂e · Yıllık çıktı: {fmt(result.annualOutput, 0)} ton
        </p>
      </div>

      {/* PDF lead capture */}
      <LeadCapture productName={input.productName} savings={result.annualSavings} />

      {/* Yeni hesaplama */}
      <button
        onClick={onReset}
        className="w-full py-3 border-2 border-[#E2E8F0] hover:border-[#0F4C75]/40 text-[#64748B] hover:text-[#0F4C75] text-sm font-semibold rounded-xl transition-colors"
      >
        ↺ Yeni hesaplama yap
      </button>

      <p className="text-xs text-center text-[#CBD5E1]">
        Hesaplamalar CBAM Annex IV + DEFRA 2024 emisyon faktörleri kullanılarak yapılmıştır.
        Resmi CBAM beyanı için akredite doğrulayıcı onayı gereklidir.
      </p>
    </div>
  );
}
