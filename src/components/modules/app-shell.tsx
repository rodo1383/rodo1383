"use client";

import { useMemo, useState } from "react";
import { AlertCircle, CalendarClock, FileText, FolderKanban, LayoutDashboard, ScanLine, Users2, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { clients, documents, invoices, legalCases, stats } from "@/lib/mock-data";

const modules = [
  { key: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { key: "clients", label: "Clients", icon: Users2 },
  { key: "cases", label: "Dossiers", icon: FolderKanban },
  { key: "documents", label: "Documents", icon: FileText },
  { key: "calendar", label: "Calendrier", icon: CalendarClock },
  { key: "billing", label: "Facturation", icon: Wallet },
  { key: "scan", label: "Scan intelligent", icon: ScanLine }
] as const;

export function AppShell() {
  const [activeModule, setActiveModule] = useState<(typeof modules)[number]["key"]>("dashboard");
  const [search, setSearch] = useState("");

  const filteredClients = useMemo(() => clients.filter((c) => c.nom.toLowerCase().includes(search.toLowerCase())), [search]);

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold">JuriSN Pro</h1>
            <p className="text-sm text-primary-foreground/80">Gestion de cabinet d&apos;avocats - Sénégal</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary">Rôle: Administrateur</Badge>
            <Button variant="secondary">Se déconnecter</Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-4 p-4 md:grid-cols-[260px_1fr]">
        <aside className="rounded-lg border bg-white p-2">
          <nav className="space-y-1">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <button
                  key={module.key}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition ${
                    activeModule === module.key ? "bg-primary text-white" : "hover:bg-slate-100"
                  }`}
                  onClick={() => setActiveModule(module.key)}
                >
                  <Icon className="h-4 w-4" />
                  {module.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="space-y-4">
          {activeModule === "dashboard" && (
            <>
              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <KpiCard label="Dossiers actifs" value={stats.activeCases.toString()} />
                <KpiCard label="Clients" value={stats.clients.toString()} />
                <KpiCard label="Audiences à venir" value={stats.upcomingHearings.toString()} />
                <KpiCard label="Revenus mensuels" value={`${stats.monthlyRevenue.toLocaleString("fr-FR")} FCFA`} />
              </section>
              <Card>
                <CardHeader>
                  <CardTitle>Alertes juridiques et échéances</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="flex items-center gap-2"><AlertCircle className="h-4 w-4 text-amber-600" /> Dossier SN-FAM-2026-0088 : audience dans 48h.</p>
                  <p className="flex items-center gap-2"><AlertCircle className="h-4 w-4 text-rose-600" /> Facture FAC-2026-0012 en retard de 5 jours.</p>
                </CardContent>
              </Card>
            </>
          )}

          {activeModule === "clients" && (
            <Card>
              <CardHeader>
                <CardTitle>Gestion des clients (module cœur)</CardTitle>
                <Input placeholder="Rechercher un client..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredClients.map((client) => (
                  <div key={client.id} className="rounded-md border p-3">
                    <div className="mb-1 flex items-center justify-between">
                      <h3 className="font-semibold">{client.nom}</h3>
                      <Badge variant="outline">{client.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{client.email} · {client.telephone}</p>
                    <p className="text-sm">{client.adresse}</p>
                  </div>
                ))}
                <Button>Ajouter un client</Button>
              </CardContent>
            </Card>
          )}

          {activeModule === "cases" && (
            <Card>
              <CardHeader>
                <CardTitle>Dossiers juridiques et timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {legalCases.map((item) => (
                  <div key={item.id} className="rounded-md border p-3">
                    <p className="font-semibold">{item.reference} - {item.titre}</p>
                    <p className="text-sm text-muted-foreground">{item.juridiction} · Prochaine audience: {item.prochaineAudience}</p>
                    <Badge>{item.statut}</Badge>
                  </div>
                ))}
                <Button>Créer un dossier</Button>
              </CardContent>
            </Card>
          )}

          {activeModule === "documents" && (
            <Card>
              <CardHeader>
                <CardTitle>Archivage documentaire sécurisé</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="rounded-md border p-3 text-sm">
                    <p className="font-medium">{doc.nom}</p>
                    <p className="text-muted-foreground">Type: {doc.type} · Date: {doc.uploadedAt}</p>
                    <Badge variant="secondary">{doc.confidentialite}</Badge>
                  </div>
                ))}
                <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
                  Upload drag-and-drop, OCR automatique, conversion PDF, versioning et watermarking prêts pour intégration.
                </div>
              </CardContent>
            </Card>
          )}

          {activeModule === "calendar" && (
            <Card>
              <CardHeader>
                <CardTitle>Calendrier audiences et événements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>Vue mensuelle / hebdomadaire interactive (prototype) avec alertes automatiques.</p>
                <div className="rounded-md border p-3">
                  28/02/2026 - Audience dossier SN-FAM-2026-0088 (TGI Dakar) - Alerte 60 min.
                </div>
                <div className="rounded-md border p-3">
                  15/03/2026 - Médiation commerciale SN-CIV-2026-0142 - Alerte 24h.
                </div>
                <Button>Créer un événement</Button>
              </CardContent>
            </Card>
          )}

          {activeModule === "billing" && (
            <Card>
              <CardHeader>
                <CardTitle>Facturation & Honoraires</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {invoices.map((inv) => (
                  <div key={inv.id} className="rounded-md border p-3 text-sm">
                    <p className="font-semibold">{inv.numero}</p>
                    <p>{inv.montant.toLocaleString("fr-FR")} FCFA · {inv.dateEmission}</p>
                    <Badge>{inv.statut}</Badge>
                  </div>
                ))}
                <div className="flex flex-wrap gap-2">
                  <Button>Générer facture PDF</Button>
                  <Button variant="outline">Enregistrer paiement</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeModule === "scan" && (
            <Card>
              <CardHeader>
                <CardTitle>Scan intelligent de documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <ul className="list-disc space-y-1 pl-4">
                  <li>Capture directe webcam/caméra et upload mobile avec compression automatique.</li>
                  <li>Connexion scanners réseau (drivers/API), OCR et détection automatique du type.</li>
                  <li>Conversion PDF, métadonnées auto-remplies, indexation full-text.</li>
                  <li>Prévisualisation instantanée, signature électronique et audit trail.</li>
                </ul>
                <Button>Lancer un scan</Button>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}

function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-primary">{value}</p>
      </CardContent>
    </Card>
  );
}
