# JuriSN Pro — Prototype de gestion de cabinet d'avocats (Sénégal)

Prototype web complet en **TypeScript + Tailwind + style Shadcn-ui** avec backend **Supabase**.

## Modules inclus

- 📊 Tableau de bord KPI (dossiers actifs, clients, audiences, revenus)
- 👥 Gestion des clients (particuliers + entreprises) — module central
- 📁 Gestion des dossiers juridiques (timeline, statut, juridiction, parties)
- 📄 Gestion documentaire (upload, confidentialité, OCR, versioning)
- 📅 Calendrier audiences/événements avec alertes
- 💰 Facturation (factures, paiements, génération PDF)
- 📷 Scan intelligent (webcam/mobile/scanner réseau + OCR + auto PDF)

## Démarrage

1. Copier les variables :

```bash
cp .env.example .env.local
```

2. Renseigner les clés Supabase dans `.env.local`.
3. Exécuter le schéma SQL dans Supabase : `supabase/schema.sql`.
4. Installer et lancer :

```bash
npm install
npm run dev
```

## Backend Supabase activé

Le fichier `supabase/schema.sql` crée :
- `users`, `clients`, `cases`, `documents`, `invoices`, `payments`, `calendar_events`, `tasks`
- contraintes de rôle (`avocat`, `collaborateur`, `administrateur`)
- politiques RLS de base pour utilisateurs authentifiés

## Palette de couleurs

- Bleu marine (profession juridique)
- Gris neutres
- Blanc

## Évolutions recommandées (déjà prévues dans le prototype)

- Notifications temps réel
- Signature électronique
- Portail client sécurisé
- 2FA + audit trail
- Exports CSV/Excel
- Intégrations Stripe/PayPal/Google Calendar

