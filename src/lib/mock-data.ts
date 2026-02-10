import { Client, DashboardStats, DocumentItem, Invoice, LegalCase } from "./types";

export const stats: DashboardStats = {
  activeCases: 34,
  clients: 128,
  upcomingHearings: 11,
  monthlyRevenue: 18750000
};

export const clients: Client[] = [
  { id: "c1", type: "particulier", nom: "Aïssatou Ndiaye", email: "a.ndiaye@email.sn", telephone: "+221 77 100 22 33", adresse: "Dakar Plateau" },
  { id: "c2", type: "entreprise", nom: "Sénégal Transit SA", email: "contact@stsa.sn", telephone: "+221 33 899 45 00", adresse: "Dakar - Zone industrielle", nif: "SN-7782991" }
];

export const legalCases: LegalCase[] = [
  { id: "d1", reference: "SN-CIV-2026-0142", titre: "Litige commercial import-export", statut: "en_negociation", clientId: "c2", juridiction: "Tribunal de Commerce Dakar", prochaineAudience: "2026-03-15" },
  { id: "d2", reference: "SN-FAM-2026-0088", titre: "Contentieux successoral", statut: "en_audience", clientId: "c1", juridiction: "Tribunal de Grande Instance", prochaineAudience: "2026-02-28" }
];

export const documents: DocumentItem[] = [
  { id: "doc1", caseId: "d1", nom: "Contrat de partenariat.pdf", type: "Contrat", confidentialite: "strictement_confidentiel", uploadedAt: "2026-01-20" },
  { id: "doc2", caseId: "d2", nom: "PV d'audience.pdf", type: "Procédure", confidentialite: "interne", uploadedAt: "2026-02-01" }
];

export const invoices: Invoice[] = [
  { id: "inv1", caseId: "d1", numero: "FAC-2026-0012", montant: 2500000, statut: "en_attente", dateEmission: "2026-02-01" },
  { id: "inv2", caseId: "d2", numero: "FAC-2026-0013", montant: 850000, statut: "partiellement_payee", dateEmission: "2026-02-03" }
];
