# umut-aslan.dev

Hauptseite des Portfolios: Profil, Lebenslauf und Einstieg in alle Demo-Subdomains.

| | |
|---|---|
| Framework | Astro 7 (statisch), TypeScript strict |
| Sprachen | Deutsch (`/`), Englisch (`/en/`) |
| Tests | Playwright – Desktop + Mobile, gegen das **Produktions-Image** |
| Auslieferung | Docker multi-stage → nginx (read-only) → Traefik + Let's Encrypt |
| Datenschutz | keine Cookies, kein Tracking, Schriften selbst gehostet (per Test abgesichert) |

## Lebenszyklus

```bash
./ops.sh build     # astro check + astro build → nginx-Image
./ops.sh test      # 10 Szenarien × 2 Viewports gegen den laufenden Container
./ops.sh preview   # privat auf http://127.0.0.1:8088
./ops.sh deploy    # erst Tests, dann `docker compose up -d` hinter Traefik
```

Die GitHub-Action (`.github/workflows/ci.yml`) führt dieselben Befehle aus und deployt `main` per SSH.
Ein wöchentlicher Build aktualisiert die Live-Zahlen (z. B. Thunderstore-Downloads).

## Inhalte pflegen

Alle Inhalte stehen in **einer** Datei: `site/src/data/content.ts`.

- Neues Demo-Projekt live? → `status: 'live'` setzen. Karten, Status-Punkte, Routing-Baum und Links passen sich an.
- Foto: `site/src/assets/me.jpg` ablegen – ersetzt das Monogramm automatisch (optimiert beim Build).

## Go-live

```bash
# .env: PORTFOLIO_RULE=Host(`umut-aslan.dev`) || Host(`www.umut-aslan.dev`)
docker compose -f ~/coming-soon/docker-compose.yml down
./ops.sh deploy
```

Siehe [docs/ROADMAP.md](docs/ROADMAP.md) für die geplanten Subdomains.
