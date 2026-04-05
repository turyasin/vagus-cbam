"use client";

import { useState, useCallback } from "react";
import { cbamCodes, searchCbamCodes, filterBySector, sectors } from "@/data/cbam-codes";
import type { CbamCode } from "@/types";

const SECTOR_KEYS = Object.keys(sectors) as Array<keyof typeof sectors>;

function Badge({ label, color }: { label: string; color: "green" | "gray" | "amber" }) {
  const colors = {
    green: "bg-[#1B8A5A]/10 text-[#1B8A5A] border border-[#1B8A5A]/20",
    gray: "bg-[#64748B]/10 text-[#64748B] border border-[#64748B]/20",
    amber: "bg-[#F59E0B]/10 text-[#b45309] border border-[#F59E0B]/30",
  };
  return (
    <span className={`inline-flex text-xs font-semibold px-2 py-0.5 rounded-full ${colors[color]}`}>
      {label}
    </span>
  );
}

function ResultCard({ code }: { code: CbamCode }) {
  const sectorLabel = sectors[code.sector] ?? code.sector;

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 md:p-5 flex flex-col gap-3 hover:border-[#0F4C75]/30 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[#1E293B] leading-tight">
            {code.turkishDescription}
          </p>
          <p className="text-xs text-[#64748B] mt-0.5 truncate">{code.description}</p>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className="font-mono text-xs font-bold text-[#0F4C75] bg-[#0F4C75]/5 border border-[#0F4C75]/15 px-2 py-0.5 rounded">
            {code.cn}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge label="CBAM Kapsamında" color="green" />
        <Badge label={sectorLabel} color="gray" />
        <Badge label={`Annex ${code.annex}`} color="amber" />
      </div>

      {code.notes && (
        <p className="text-xs text-[#64748B] border-t border-[#E2E8F0] pt-2">
          {code.notes}
        </p>
      )}
    </div>
  );
}

function OutOfScopeCard({ query }: { query: string }) {
  return (
    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6 text-center">
      <div className="w-12 h-12 bg-[#64748B]/10 rounded-full flex items-center justify-center mx-auto mb-3">
        <svg className="w-6 h-6 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p className="font-semibold text-[#1E293B] mb-1">
        &quot;{query}&quot; için sonuç bulunamadı
      </p>
      <p className="text-sm text-[#64748B]">
        Ürününüz CBAM kapsamında olmayabilir veya farklı bir CN kodu ile aratmayı deneyin.
        Emin olmak için{" "}
        <a href="mailto:info@vagus.io" className="text-[#0F4C75] underline font-medium">
          bizimle iletişime geçin
        </a>
        .
      </p>
      <p className="text-xs text-[#64748B] mt-3 p-3 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-lg">
        Not: 2028&apos;den itibaren downstream ürünler de CBAM kapsamına girebilir.
      </p>
    </div>
  );
}

export default function CbamSearch() {
  const [query, setQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<CbamCode[]>([]);

  const handleSearch = useCallback((q: string, sector: string) => {
    setSearched(true);

    if (q.trim().length < 2 && !sector) {
      setResults([]);
      setSearched(false);
      return;
    }

    let found: CbamCode[];
    if (q.trim().length >= 2) {
      found = searchCbamCodes(q);
      if (sector) found = found.filter((c) => c.sector === sector);
    } else {
      found = filterBySector(sector);
    }
    setResults(found);
  }, []);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length >= 2 || selectedSector) {
      handleSearch(val, selectedSector);
    } else {
      setSearched(false);
      setResults([]);
    }
  };

  const handleSectorChange = (sector: string) => {
    const newSector = sector === selectedSector ? "" : sector;
    setSelectedSector(newSector);
    handleSearch(query, newSector);
  };

  const showResults = searched || selectedSector;
  const hasResults = results.length > 0;

  return (
    <div className="space-y-6">
      {/* Search box */}
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="search"
          value={query}
          onChange={handleQueryChange}
          placeholder='Ürün adı veya CN kodu aratın... (örn: "inşaat demiri", "7213", "boru", "profil")'
          className="w-full pl-12 pr-4 py-4 text-base border-2 border-[#E2E8F0] rounded-xl bg-white text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#0F4C75] transition-colors"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setSearched(false); setResults([]); }}
            className="absolute inset-y-0 right-4 flex items-center text-[#64748B] hover:text-[#1E293B]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Sector filters */}
      <div>
        <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
          Sektör filtresi
        </p>
        <div className="flex flex-wrap gap-2">
          {SECTOR_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => handleSectorChange(key)}
              className={`text-sm px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                selectedSector === key
                  ? "bg-[#0F4C75] text-white border-[#0F4C75]"
                  : "bg-white text-[#1E293B] border-[#E2E8F0] hover:border-[#0F4C75]/50"
              }`}
            >
              {sectors[key]}
            </button>
          ))}
          {selectedSector && (
            <button
              onClick={() => { setSelectedSector(""); handleSearch(query, ""); }}
              className="text-sm px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:border-red-200 hover:text-red-500 transition-colors"
            >
              Filtreyi temizle
            </button>
          )}
        </div>
      </div>

      {/* Stats bar */}
      {showResults && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#64748B]">
            {hasResults ? (
              <>
                <span className="font-bold text-[#1B8A5A]">{results.length}</span> sonuç bulundu
                {selectedSector && ` — ${sectors[selectedSector]}`}
              </>
            ) : null}
          </span>
          <span className="text-xs text-[#64748B]">
            Toplam {cbamCodes.length} CN kodu
          </span>
        </div>
      )}

      {/* Results */}
      {showResults && !hasResults && query.trim().length >= 2 && (
        <OutOfScopeCard query={query} />
      )}

      {showResults && hasResults && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {results.map((code) => (
            <ResultCard key={code.cn} code={code} />
          ))}
        </div>
      )}

      {/* Initial state — sector grid hint */}
      {!showResults && (
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6">
          <p className="text-sm text-[#64748B] text-center">
            Ürün adı, CN/GTİP kodu veya sektör filtresi ile arama yapın.
            <br />
            <span className="text-xs">
              Örnek aramalar:{" "}
              <button onClick={() => { setQuery("inşaat demiri"); handleSearch("inşaat demiri", ""); }} className="text-[#0F4C75] underline">&quot;inşaat demiri&quot;</button>
              ,{" "}
              <button onClick={() => { setQuery("galvaniz"); handleSearch("galvaniz", ""); }} className="text-[#0F4C75] underline">&quot;galvaniz&quot;</button>
              ,{" "}
              <button onClick={() => { setQuery("boru"); handleSearch("boru", ""); }} className="text-[#0F4C75] underline">&quot;boru&quot;</button>
              ,{" "}
              <button onClick={() => { setQuery("profil"); handleSearch("profil", ""); }} className="text-[#0F4C75] underline">&quot;profil&quot;</button>
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
