"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { searchCbamCodes, sectors } from "@/data/cbam-codes";
import type { CbamCode } from "@/types";

// ─── Tip tanımları ───────────────────────────────────────────────────────────

type Message =
  | { type: "user"; text: string }
  | { type: "result"; query: string; results: CbamCode[]; inScope: boolean };

// ─── Yardımcı bileşenler ─────────────────────────────────────────────────────

function SectorPill({ label }: { label: string }) {
  return (
    <span className="inline-flex text-xs font-medium px-2 py-0.5 rounded-full bg-[#0F4C75]/8 text-[#0F4C75] border border-[#0F4C75]/15">
      {label}
    </span>
  );
}

function InScopeVerdict({ query, results }: { query: string; results: CbamCode[] }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? results : results.slice(0, 2);

  return (
    <div className="rounded-2xl overflow-hidden border-2 border-[#1B8A5A] shadow-sm">
      {/* Verdict header */}
      <div className="bg-[#1B8A5A] px-5 py-4 flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <div>
          <p className="text-white font-bold text-base leading-tight">CBAM Kapsamında</p>
          <p className="text-green-100 text-xs mt-0.5">
            &quot;{query}&quot; — {results.length} eşleşen ürün kodu bulundu
          </p>
        </div>
      </div>

      {/* Eşleşen kodlar */}
      <div className="bg-white divide-y divide-[#E2E8F0]">
        {shown.map((code) => (
          <div key={code.cn} className="px-5 py-3.5 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1E293B] leading-snug">
                {code.turkishDescription}
              </p>
              {code.notes && (
                <p className="text-xs text-[#64748B] mt-0.5">{code.notes}</p>
              )}
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                <SectorPill label={sectors[code.sector] ?? code.sector} />
                <SectorPill label={`Annex ${code.annex}`} />
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-[#0F4C75] bg-[#0F4C75]/6 border border-[#0F4C75]/15 px-2.5 py-1 rounded-lg flex-shrink-0">
              {code.cn}
            </span>
          </div>
        ))}
      </div>

      {/* Genişlet / Daralt */}
      {results.length > 2 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-5 py-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0] text-xs font-medium text-[#64748B] hover:text-[#0F4C75] transition-colors text-center"
        >
          {expanded
            ? "Daha az göster ▲"
            : `${results.length - 2} kodu daha göster ▼`}
        </button>
      )}

      {/* Sonraki adım */}
      <div className="bg-[#F0FDF4] border-t border-[#1B8A5A]/20 px-5 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-xs text-[#166534]">
          <span className="font-semibold">Sıradaki adım:</span> Gerçek emisyon değerinizi hesaplayın, default ceza markup&apos;ından kaçının.
        </p>
        <a
          href="mailto:info@vagus.io"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1B8A5A] hover:bg-[#146b45] px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap"
        >
          Ücretsiz hesaplama talep et
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function OutOfScopeVerdict({ query }: { query: string }) {
  return (
    <div className="rounded-2xl overflow-hidden border-2 border-[#94A3B8] shadow-sm">
      {/* Verdict header */}
      <div className="bg-[#64748B] px-5 py-4 flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
        <div>
          <p className="text-white font-bold text-base leading-tight">Kapsam Dışı</p>
          <p className="text-slate-200 text-xs mt-0.5">
            &quot;{query}&quot; için CBAM kapsamında bir ürün bulunamadı
          </p>
        </div>
      </div>

      {/* Açıklama */}
      <div className="bg-white px-5 py-4 space-y-3">
        <p className="text-sm text-[#1E293B]">
          Aradığınız ürün CBAM kapsamında görünmüyor. Bu birkaç nedenden kaynaklanabilir:
        </p>
        <ul className="space-y-1.5 text-sm text-[#64748B]">
          <li className="flex items-start gap-2">
            <span className="text-[#94A3B8] mt-0.5">•</span>
            Ürün gerçekten kapsam dışı olabilir (tamamlanmış ürünler, makine parçaları vb.)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#94A3B8] mt-0.5">•</span>
            Farklı bir arama terimi deneyebilirsiniz (örn: hammadde adı, CN kodu)
          </li>
        </ul>

        <div className="bg-[#FEF3C7] border border-[#F59E0B]/30 rounded-xl px-4 py-3 flex items-start gap-2">
          <svg className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-xs text-[#92400E]">
            <span className="font-semibold">2028 uyarısı:</span> Aşağı akış (downstream) ürünler de kapsama girebilir. Emin olmak için uzmanımızla konuşun.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#F8FAFC] border-t border-[#E2E8F0] px-5 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-xs text-[#64748B]">Emin değilseniz bir uzmanla doğrulayın.</p>
        <a
          href="mailto:info@vagus.io"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F4C75] bg-[#0F4C75]/8 hover:bg-[#0F4C75]/15 px-3.5 py-2 rounded-lg transition-colors border border-[#0F4C75]/20 whitespace-nowrap"
        >
          Uzmanla doğrula
        </a>
      </div>
    </div>
  );
}

// ─── Öneri chip'leri ──────────────────────────────────────────────────────────

const SUGGESTIONS = [
  "inşaat demiri",
  "galvanizli sac",
  "boru",
  "aluminyum profil",
  "7213",
  "çimento",
];

// ─── Ana bileşen ──────────────────────────────────────────────────────────────

export default function CbamSearch() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasMessages = messages.length > 0;

  useEffect(() => {
    if (hasMessages) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, hasMessages]);

  const submit = useCallback(
    (query: string) => {
      const q = query.trim();
      if (!q || q.length < 2 || isThinking) return;

      setInput("");
      setIsThinking(true);

      setMessages((prev) => [...prev, { type: "user", text: q }]);

      // Kısa gecikme — "düşünüyor" efekti
      setTimeout(() => {
        const results = searchCbamCodes(q);
        setMessages((prev) => [
          ...prev,
          {
            type: "result",
            query: q,
            results,
            inScope: results.length > 0,
          },
        ]);
        setIsThinking(false);
      }, 400);
    },
    [isThinking]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit(input);
  };

  const reset = () => {
    setMessages([]);
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div className="flex flex-col min-h-[520px]">
      {/* ── Başlık (sadece ilk durumda) ── */}
      {!hasMessages && (
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-10 text-center">
          <div className="w-14 h-14 bg-[#0F4C75]/8 rounded-2xl flex items-center justify-center mb-5">
            <svg className="w-7 h-7 text-[#0F4C75]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#1E293B] mb-2">
            Ürününüz CBAM kapsamında mı?
          </h2>
          <p className="text-sm text-[#64748B] max-w-sm mb-8">
            Ürün adını veya CN/GTİP kodunu yazın — anında öğrenin. Kayıt gerekmez.
          </p>

          {/* Öneri chip'leri */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => submit(s)}
                className="text-sm px-3.5 py-1.5 rounded-full border border-[#E2E8F0] bg-white text-[#1E293B] hover:border-[#0F4C75]/40 hover:bg-[#0F4C75]/4 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Mesaj geçmişi ── */}
      {hasMessages && (
        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-4">
          {messages.map((msg, i) => {
            if (msg.type === "user") {
              return (
                <div key={i} className="flex justify-end">
                  <div className="bg-[#0F4C75] text-white text-sm font-medium px-4 py-2.5 rounded-2xl rounded-br-sm max-w-xs shadow-sm">
                    {msg.text}
                  </div>
                </div>
              );
            }

            return (
              <div key={i} className="flex justify-start">
                <div className="w-full max-w-2xl">
                  {msg.inScope ? (
                    <InScopeVerdict query={msg.query} results={msg.results} />
                  ) : (
                    <OutOfScopeVerdict query={msg.query} />
                  )}
                </div>
              </div>
            );
          })}

          {/* Düşünüyor animasyonu */}
          {isThinking && (
            <div className="flex justify-start">
              <div className="bg-white border border-[#E2E8F0] rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5 shadow-sm">
                {[0, 0.15, 0.3].map((delay) => (
                  <span
                    key={delay}
                    className="w-2 h-2 rounded-full bg-[#94A3B8] animate-bounce"
                    style={{ animationDelay: `${delay}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      )}

      {/* ── Input alanı ── */}
      <div className={`${hasMessages ? "border-t border-[#E2E8F0] pt-3 mt-2" : ""} px-0`}>
        {hasMessages && (
          <div className="flex items-center justify-between mb-2 px-1">
            <p className="text-xs text-[#94A3B8]">Başka ürün sorabilirsiniz</p>
            <button
              onClick={reset}
              className="text-xs text-[#64748B] hover:text-[#1E293B] transition-colors"
            >
              Yeni sorgulama ↺
            </button>
          </div>
        )}

        <div className="relative flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              hasMessages
                ? "Başka bir ürün yazın..."
                : "Ürün adı veya CN kodu yazın... (örn: inşaat demiri)"
            }
            className="flex-1 pl-4 pr-4 py-3.5 text-sm border-2 border-[#E2E8F0] rounded-xl bg-white text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#0F4C75] transition-colors"
            autoFocus={!hasMessages}
          />
          <button
            onClick={() => submit(input)}
            disabled={input.trim().length < 2 || isThinking}
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#0F4C75] text-white hover:bg-[#0a3555] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            aria-label="Sorgula"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <p className="text-xs text-center text-[#CBD5E1] mt-2">
          Enter ile gönderin · 65+ CN kodu veri tabanı
        </p>
      </div>
    </div>
  );
}
