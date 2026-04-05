"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#0F4C75] tracking-tight">
              VAGUS
            </span>
            <span className="hidden sm:inline text-xs text-[#64748B] font-medium border border-[#E2E8F0] rounded px-2 py-0.5">
              AB Uyumluluk
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/cbam-kontrol"
              className="text-sm font-medium text-[#1E293B] hover:text-[#0F4C75] transition-colors"
            >
              CBAM Kapsam Kontrol
            </Link>
            <Link
              href="/#fiyatlandirma"
              className="text-sm font-medium text-[#1E293B] hover:text-[#0F4C75] transition-colors"
            >
              Fiyatlandırma
            </Link>
            <Link
              href="/#iletisim"
              className="text-sm font-medium text-[#1E293B] hover:text-[#0F4C75] transition-colors"
            >
              İletişim
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/cbam-kontrol"
              className="bg-[#0F4C75] hover:bg-[#0a3555] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Ücretsiz Kontrol Et
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-[#64748B] hover:bg-[#F8FAFC]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menüyü aç/kapat"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#E2E8F0] py-4 space-y-3">
            <Link
              href="/cbam-kontrol"
              className="block text-sm font-medium text-[#1E293B] hover:text-[#0F4C75] py-2"
              onClick={() => setMenuOpen(false)}
            >
              CBAM Kapsam Kontrol
            </Link>
            <Link
              href="/#fiyatlandirma"
              className="block text-sm font-medium text-[#1E293B] hover:text-[#0F4C75] py-2"
              onClick={() => setMenuOpen(false)}
            >
              Fiyatlandırma
            </Link>
            <Link
              href="/#iletisim"
              className="block text-sm font-medium text-[#1E293B] hover:text-[#0F4C75] py-2"
              onClick={() => setMenuOpen(false)}
            >
              İletişim
            </Link>
            <Link
              href="/cbam-kontrol"
              className="block bg-[#0F4C75] text-white text-sm font-semibold px-4 py-2 rounded-lg text-center"
              onClick={() => setMenuOpen(false)}
            >
              Ücretsiz Kontrol Et
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
