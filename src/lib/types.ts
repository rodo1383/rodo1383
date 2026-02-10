export type UserRole = "avocat" | "collaborateur" | "administrateur";

export interface DashboardStats {
  activeCases: number;
  clients: number;
  upcomingHearings: number;
  monthlyRevenue: number;
}

export interface Client {
  id: string;
  type: "particulier" | "entreprise";
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  nif?: string;
}

export interface LegalCase {
  id: string;
  reference: string;
  titre: string;
  statut: "ouvert" | "en_audience" | "en_negociation" | "clos";
  clientId: string;
  juridiction: string;
  prochaineAudience?: string;
}

export interface DocumentItem {
  id: string;
  caseId: string;
  nom: string;
  type: string;
  confidentialite: "public" | "interne" | "strictement_confidentiel";
  uploadedAt: string;
}

export interface Invoice {
  id: string;
  caseId: string;
  numero: string;
  montant: number;
  statut: "en_attente" | "partiellement_payee" | "payee";
  dateEmission: string;
}
