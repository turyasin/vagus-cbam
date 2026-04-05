export type CbamSector =
  | "celik"
  | "demir"
  | "aluminyum"
  | "cimento"
  | "gubre"
  | "hidrojen"
  | "elektrik";

export interface CbamCode {
  cn: string;
  description: string;
  turkishDescription: string;
  sector: CbamSector;
  annex: string;
  notes?: string;
}
