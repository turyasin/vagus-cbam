"use client";

import { useState } from "react";
import type { CalcInput, ProductionRoute } from "@/lib/cbam-calc";
import { ROUTE_LABELS } from "@/lib/cbam-calc";

// ─── Adım göstergesi ──────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  const steps = ["Ürün", "Enerji", "Sonuç"];
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((label, i) => {
        const idx = i + 1;
        const done = idx < current;
        const active = idx === current;
        return (
          <div key={label} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  done
                    ? "bg-[#1B8A5A] text-white"
                    : active
                    ? "bg-[#0F4C75] text-white"
                    : "bg-[#E2E8F0] text-[#94A3B8]"
                }`}
              >
                {done ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  idx
                )}
              </div>
              <span
                className={`text-xs font-medium ${
                  active ? "text-[#0F4C75]" : done ? "text-[#1B8A5A]" : "text-[#94A3B8]"
                }`}
              >
                {label}
              </span>
            </div>
            {i < total - 1 && (
              <div
                className={`w-12 h-0.5 mb-4 rounded ${
                  done ? "bg-[#1B8A5A]" : "bg-[#E2E8F0]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Input bileşeni ───────────────────────────────────────────────────────────

function Field({
  label,
  hint,
  unit,
  children,
}: {
  label: string;
  hint?: string;
  unit?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-[#1E293B]">
        {label}
        {hint && <span className="text-xs font-normal text-[#64748B] ml-2">{hint}</span>}
      </label>
      <div className="relative flex items-center">
        {children}
        {unit && (
          <span className="absolute right-3 text-xs font-medium text-[#94A3B8] pointer-events-none">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

function NumberInput({
  value,
  onChange,
  placeholder,
  min = 0,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  min?: number;
}) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      min={min}
      className="w-full pr-16 pl-4 py-3 text-sm border-2 border-[#E2E8F0] rounded-xl bg-white text-[#1E293B] focus:outline-none focus:border-[#0F4C75] transition-colors placeholder-[#CBD5E1]"
    />
  );
}

// ─── Adım 1: Ürün ─────────────────────────────────────────────────────────────

function Step1({
  data,
  onChange,
  onNext,
}: {
  data: Partial<CalcInput>;
  onChange: (d: Partial<CalcInput>) => void;
  onNext: () => void;
}) {
  const valid = data.productName && data.monthlyOutput && data.monthlyOutput > 0 && data.route;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-[#1E293B]">Ürün bilgileri</h2>
        <p className="text-sm text-[#64748B] mt-1">Hangi ürünü, ne kadar üretiyorsunuz?</p>
      </div>

      <Field label="Ürün adı" hint="veya CN/GTİP kodu">
        <input
          type="text"
          value={data.productName ?? ""}
          onChange={(e) => onChange({ ...data, productName: e.target.value })}
          placeholder="örn: İnşaat çeliği, galvanizli sac, boru…"
          className="w-full px-4 py-3 text-sm border-2 border-[#E2E8F0] rounded-xl bg-white text-[#1E293B] focus:outline-none focus:border-[#0F4C75] transition-colors placeholder-[#CBD5E1]"
        />
      </Field>

      <Field label="Üretim rotası" hint="hammadde ve eritme teknolojisi">
        <select
          value={data.route ?? ""}
          onChange={(e) => onChange({ ...data, route: e.target.value as ProductionRoute })}
          className="w-full px-4 py-3 text-sm border-2 border-[#E2E8F0] rounded-xl bg-white text-[#1E293B] focus:outline-none focus:border-[#0F4C75] transition-colors appearance-none cursor-pointer"
        >
          <option value="">Seçin…</option>
          {(Object.keys(ROUTE_LABELS) as ProductionRoute[]).map((k) => (
            <option key={k} value={k}>
              {ROUTE_LABELS[k]}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Aylık üretim" unit="ton/ay">
        <NumberInput
          value={data.monthlyOutput?.toString() ?? ""}
          onChange={(v) => onChange({ ...data, monthlyOutput: parseFloat(v) || 0 })}
          placeholder="örn: 150"
        />
      </Field>

      {/* Rota açıklamaları */}
      {data.route && (
        <div className="bg-[#0F4C75]/5 border border-[#0F4C75]/15 rounded-xl px-4 py-3 text-xs text-[#0F4C75]">
          {data.route === "BF-BOF" && "Yüksek fırın + BOF: Türkiye'de en yaygın büyük çelik tesisleri (Erdemir, İsdemir). Emisyon yoğunluğu yüksektir — gerçek veri kullanmak en çok burada fark yaratır."}
          {data.route === "DRI-EAF" && "Doğrudan indirgeme + EAF: Doğalgaz ile pellet/sünger demir üretimi. Orta düzey emisyon, doğalgaz tüketimine bağlı."}
          {data.route === "Hurda-EAF" && "Hurda çeliği + EAF: En düşük emisyon yoğunluğu. Türkiye'de küçük-orta ölçekli çelik tesislerinin çoğu bu rotayı kullanır."}
        </div>
      )}

      <button
        onClick={onNext}
        disabled={!valid}
        className="w-full py-3.5 bg-[#0F4C75] hover:bg-[#0a3555] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors"
      >
        Devam — Enerji tüketimi
      </button>
    </div>
  );
}

// ─── Adım 2: Enerji ───────────────────────────────────────────────────────────

function Step2({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: Partial<CalcInput>;
  onChange: (d: Partial<CalcInput>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const valid =
    data.naturalGasM3 !== undefined &&
    data.naturalGasM3 > 0 &&
    data.electricityKwh !== undefined &&
    data.electricityKwh > 0;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-[#1E293B]">Enerji tüketimi</h2>
        <p className="text-sm text-[#64748B] mt-1">
          Aylık enerji faturanızdan alabilirsiniz
        </p>
      </div>

      <Field
        label="Doğalgaz tüketimi"
        hint="fatura veya sayaç"
        unit="m³/ay"
      >
        <NumberInput
          value={data.naturalGasM3?.toString() ?? ""}
          onChange={(v) => onChange({ ...data, naturalGasM3: parseFloat(v) || 0 })}
          placeholder="örn: 25000"
        />
      </Field>

      <Field
        label="Elektrik tüketimi"
        hint="fatura veya sayaç"
        unit="kWh/ay"
      >
        <NumberInput
          value={data.electricityKwh?.toString() ?? ""}
          onChange={(v) => onChange({ ...data, electricityKwh: parseFloat(v) || 0 })}
          placeholder="örn: 120000"
        />
      </Field>

      <Field
        label="Motorin tüketimi"
        hint="opsiyonel — forklift, jeneratör"
        unit="litre/ay"
      >
        <NumberInput
          value={data.dieselLitre?.toString() ?? ""}
          onChange={(v) => onChange({ ...data, dieselLitre: parseFloat(v) || 0 })}
          placeholder="örn: 500"
        />
      </Field>

      <div className="bg-[#F0FDF4] border border-[#1B8A5A]/20 rounded-xl px-4 py-3 text-xs text-[#166534]">
        <strong>CBAM formülü:</strong> Sadece Scope 1 (yakıt kaynaklı doğrudan) emisyonlar fiyatlandırılır.
        Elektrik (Scope 2) CBAM hesabına dahil edilmez ama raporda gösterilir.
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3.5 border-2 border-[#E2E8F0] hover:border-[#0F4C75]/40 text-[#64748B] hover:text-[#0F4C75] font-semibold rounded-xl transition-colors"
        >
          ← Geri
        </button>
        <button
          onClick={onNext}
          disabled={!valid}
          className="flex-[2] py-3.5 bg-[#0F4C75] hover:bg-[#0a3555] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors"
        >
          Hesapla →
        </button>
      </div>
    </div>
  );
}

// ─── Ana Wizard ───────────────────────────────────────────────────────────────

interface WizardStepsProps {
  onComplete: (input: CalcInput) => void;
  initialProduct?: string;
}

export default function WizardSteps({ onComplete, initialProduct }: WizardStepsProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<CalcInput>>({
    productName: initialProduct ?? "",
  });

  const handleComplete = () => {
    if (
      data.productName &&
      data.monthlyOutput &&
      data.route &&
      data.naturalGasM3 !== undefined &&
      data.electricityKwh !== undefined
    ) {
      onComplete(data as CalcInput);
    }
  };

  return (
    <div>
      <StepIndicator current={step} total={3} />

      {step === 1 && (
        <Step1
          data={data}
          onChange={setData}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <Step2
          data={data}
          onChange={setData}
          onNext={() => { handleComplete(); setStep(3); }}
          onBack={() => setStep(1)}
        />
      )}
    </div>
  );
}
