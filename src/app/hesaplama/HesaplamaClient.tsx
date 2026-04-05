"use client";

import { useState } from "react";
import WizardSteps from "@/components/calculator/WizardSteps";
import CalcResultView from "@/components/calculator/CalcResult";
import { calculateCbam } from "@/lib/cbam-calc";
import type { CalcInput, CalcResult } from "@/lib/cbam-calc";

export default function HesaplamaClient() {
  const [result, setResult] = useState<CalcResult | null>(null);
  const [input, setInput] = useState<CalcInput | null>(null);

  const handleComplete = (calcInput: CalcInput) => {
    setInput(calcInput);
    setResult(calculateCbam(calcInput));
  };

  const handleReset = () => {
    setResult(null);
    setInput(null);
  };

  if (result && input) {
    return <CalcResultView input={input} result={result} onReset={handleReset} />;
  }

  return <WizardSteps onComplete={handleComplete} />;
}
