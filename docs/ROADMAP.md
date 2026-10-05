# Roadmap: Demo-Subdomains

Jede Demo beantwortet ein konkretes Problem aus dem Maschinenbau-Mittelstand
und zeigt einen **anderen** Stack. Gemeinsame Regeln für alle:

- eigener Ordner unter `~/projects/<name>`, eigenes `docker-compose.yml` am Netz `proxy`
- Multi-stage-Dockerfiles, keine Toolchains auf dem Host
- Tests im CI (Unit + mindestens ein E2E-Durchlauf), README mit Architekturskizze
- nur fiktive Daten, Seed-Skript zum Zurücksetzen (nächtlicher Reset)
- Server hat 2 Kerne / 4 GB RAM → schlanke Runtimes, eine gemeinsame PostgreSQL-Instanz

| # | Subdomain | Problem | Frontend | Backend | Daten | Aufwand |
|---|---|---|---|---|---|---|
| 1 | react.umut-aslan.dev | ERP-Daten auswerten | React + TS, TanStack Query/Table, ECharts | C# ASP.NET Core Minimal API | PostgreSQL, EF Core | M |
| 2 | angular.umut-aslan.dev | „Der rollende PC“ – Lagerscan | Angular PWA, Kamera + BarcodeDetector/ZXing, IndexedDB | Java 21 Spring Boot | PostgreSQL, Bild-Storage | M–L |
| 3 | svelte.umut-aslan.dev | Maschinen ohne Stimme | SvelteKit, WebSockets | Python FastAPI + MQTT-Simulator | TimescaleDB | M |
| 4 | vue.umut-aslan.dev | Excel/VBA ablösen | Vue 3 | Go | PostgreSQL, Excel-Import | M |

**Reihenfolge-Empfehlung:** 1 → 2 → 3 → 4. Nummer 1 nutzt den Stack aus dem Job
(C#/.NET/PostgreSQL) und wird am schnellsten vorzeigbar; Nummer 2 ist das stärkste
Verkaufsargument im Gespräch mit Lager- und Produktionsleitern.

## 1 · ERP-Cockpit (react)
- CSV/Excel/SQL-Dump hochladen → Spalten-Mapping → Validierung mit Fehlerbericht
- Kennzahlen: Lagerumschlag, Ladenhüter, Auftragsrückstand, Liefertreue je Lieferant
- Drill-down vom Diagramm in die Tabelle, Export als Excel/PDF
- Zeigt: Datenmodellierung, ETL, OpenAPI-generierter TS-Client, Charting

## 2 · Lager-Scan (angular)
- Login per Rolle, Barcode/QR per Handykamera, Foto anhängen, Lagerplatz buchen
- Offline-Warteschlange (IndexedDB) + Hintergrund-Sync, Konfliktauflösung
- Admin-Ansicht: Bestandshistorie, Fotos, Audit-Log
- Zeigt: PWA, Offline-first, Java/Spring, Datei-Uploads

## 3 · Maschinen-Monitor (svelte)
- Simulator erzeugt Zustände (läuft / Rüsten / Störung) für ~10 Maschinen
- Live-Hallenplan, OEE je Schicht, Stillstandsgründe erfassen, Alarm-Regeln
- Zeigt: Echtzeit, Zeitreihen, Event-getriebene Architektur, Python

## 4 · Excel/VBA → Web (vue)
- Original-Excel mit Makro zum Download als „Vorher“
- Gleiche Kalkulation als Webanwendung mit Rollen, Versionierung, Audit-Log
- Vergleichstests: Excel-Ergebnis == Web-Ergebnis für dieselben Eingaben
- Zeigt: Legacy-Migration, Fachlogik testgetrieben übernehmen, Go
