/**
 * Single source of truth for all site content.
 * Facts live once (profile, projects); copy lives per locale.
 * To launch a demo: flip its `status` to 'live' — cards, badges and links update everywhere.
 */

export type Lang = 'de' | 'en';
export type Status = 'live' | 'building' | 'planned';
type L10n = Record<Lang, string>;

export const profile = {
  name: 'Umut Aslan',
  email: 'umut.aslan99@outlook.de',
  github: 'https://github.com/Umut-Aslan99',
  domain: 'umut-aslan.dev',
};

export interface Project {
  id: string;
  title: string;
  /** Subdomain or external URL. */
  url: string;
  host: string;
  status: Status;
  frontend: string;
  backend: string;
  /** Plain strings are tech names (same in every language); objects get translated. */
  extras: (string | L10n)[];
  /** Which industry problem (see `problems`) this demo answers. */
  solves?: string;
  repo?: string;
  summary: L10n;
}

export const projects: Project[] = [
  {
    id: 'field',
    title: 'Einsatz – Serviceberichte',
    url: 'https://svelte.umut-aslan.dev',
    host: 'svelte.umut-aslan.dev',
    status: 'live',
    frontend: 'SvelteKit · BFF',
    backend: 'C# · ASP.NET Core',
    extras: ['GraphQL', 'EF Core', 'PostgreSQL', 'Offline-PWA', 'Playwright'],
    solves: 'paper',
    summary: {
      de: 'Techniker erfassen Zeit, Material, Fotos und Unterschrift auf dem Tablet – auch ohne Netz. Der Innendienst gibt frei, der Beleg geht ins ERP, das PDF ins DMS. Architektur: Frontend · Backend-for-Frontend · Backend.',
      en: 'Technicians record time, material, photos and the customer signature on a tablet – even offline. The office approves, the voucher goes to the ERP, the PDF to the DMS. Architecture: frontend · backend-for-frontend · backend.',
    },
  },
  {
    id: 'erp',
    title: 'ERP-Cockpit',
    url: 'https://react.umut-aslan.dev',
    host: 'react.umut-aslan.dev',
    status: 'live',
    frontend: 'React · TypeScript',
    backend: 'C# · ASP.NET Core',
    extras: ['PostgreSQL', 'EF Core', 'Excel-Import', 'TanStack', 'Recharts'],
    solves: 'erp',
    summary: {
      de: 'Kundendaten aus ERP-Exporten (CSV, Excel, SQL-Dumps) importieren, bereinigen und als Dashboards für Lagerumschlag, Auftragsrückstand und Liefertreue aufbereiten.',
      en: 'Import customer data from ERP exports (CSV, Excel, SQL dumps), clean it, and turn it into dashboards for stock turnover, order backlog and delivery reliability.',
    },
  },
  {
    id: 'scan',
    title: 'Lager-Scan',
    url: 'https://angular.umut-aslan.dev',
    host: 'angular.umut-aslan.dev',
    status: 'live',
    frontend: 'Angular · PWA',
    backend: 'Java · Spring Boot',
    extras: ['Barcode', { de: 'Kamera', en: 'Camera' }, 'Offline-Sync', 'PostgreSQL', { de: 'Live-Feed (SSE)', en: 'Live feed (SSE)' }],
    solves: 'cart',
    summary: {
      de: 'Maschinenteile per Smartphone scannen, fotografieren und buchen – auch ohne WLAN in der Halle. Synchronisiert automatisch, sobald wieder Netz da ist.',
      en: 'Scan, photograph and book machine parts from a phone – even without Wi-Fi in the hall. Syncs automatically once the connection is back.',
    },
  },
  {
    id: 'legacy',
    title: 'Excel/VBA → Web',
    url: 'https://blazor.umut-aslan.dev',
    host: 'blazor.umut-aslan.dev',
    status: 'planned',
    frontend: 'Blazor',
    backend: 'C# · .NET',
    extras: ['Excel-Import', { de: 'Rollen & Rechte', en: 'Roles & permissions' }, 'Audit-Log'],
    solves: 'legacy',
    summary: {
      de: 'Ein typisches Makro-Werkzeug (Kalkulation mit VBA) Schritt für Schritt in eine Mehrbenutzer-Webanwendung überführt – mit Vorher/Nachher-Vergleich.',
      en: 'A typical macro tool (VBA-based costing sheet) migrated step by step into a multi-user web app – with a before/after comparison.',
    },
  },
  {
    id: 'machines',
    title: 'Maschinen-Monitor',
    url: 'https://vue.umut-aslan.dev',
    host: 'vue.umut-aslan.dev',
    status: 'planned',
    frontend: 'Vue 3',
    backend: 'Python · FastAPI',
    extras: ['MQTT', 'WebSockets', 'TimescaleDB'],
    solves: 'machines',
    summary: {
      de: 'Simulierte Maschinen senden Telemetrie per MQTT. Live-Dashboard mit OEE, Stillstandsgründen und Alarmen in Echtzeit.',
      en: 'Simulated machines stream telemetry over MQTT. Live dashboard with OEE, downtime reasons and real-time alerts.',
    },
  },
  {
    id: 'maui',
    title: 'GlobalPenfriends',
    url: 'https://maui.umut-aslan.dev',
    host: 'maui.umut-aslan.dev',
    status: 'live',
    frontend: '.NET MAUI',
    backend: 'C#',
    extras: ['Android', 'iOS', { de: 'Monetarisierung', en: 'Monetization' }],
    repo: 'https://github.com/Umut-Aslan99/GlobalPenfriends/tree/develop',
    summary: {
      de: 'Plattformübergreifende Brieffreundschafts-App mit Registrierung, Profilen, Suche, Direktnachrichten und Monetarisierung. Demo-Video und APK online.',
      en: 'Cross-platform pen-pal app with sign-up, profiles, search, direct messages and monetization. Demo video and APK available.',
    },
  },
  {
    id: 'status',
    title: 'Status-Dashboard',
    url: 'https://status.umut-aslan.dev',
    host: 'status.umut-aslan.dev',
    status: 'live',
    frontend: 'Web-Dashboard',
    backend: 'Docker API',
    extras: ['Traefik', { de: 'Live-Daten', en: 'Live data' }],
    summary: {
      de: 'Zeigt live, welche Dienste dieser Infrastruktur laufen – die Betriebsseite hinter allen Subdomains.',
      en: 'Shows live which services of this infrastructure are running – the operations view behind every subdomain.',
    },
  },
];

export interface Problem {
  id: string;
  icon: 'cart' | 'chart' | 'legacy' | 'pulse' | 'tablet';
  title: L10n;
  pain: L10n;
  fix: L10n;
}

export const problems: Problem[] = [
  {
    id: 'paper',
    icon: 'tablet',
    title: { de: 'Berichte auf Papier', en: 'Reports on paper' },
    pain: {
      de: 'Techniker schreiben Stundenzettel, das Büro tippt ab – Tage später, mit Lesefehlern. In der Halle gibt es oft kein Netz.',
      en: 'Technicians fill in paper time sheets, the office types them up – days later, with errors. There is often no signal in the hall.',
    },
    fix: {
      de: 'Bericht auf dem Tablet, offline-fähig, Unterschrift digital. Nach der Freigabe landet der Beleg automatisch im ERP.',
      en: 'Report on the tablet, works offline, digital signature. Once approved, the voucher lands in the ERP automatically.',
    },
  },
  {
    id: 'cart',
    icon: 'cart',
    title: { de: 'Der rollende PC', en: 'The PC on wheels' },
    pain: {
      de: 'Ein Desktop-PC auf einem Rollwagen, ein Generator für Strom – so wird im Lager gescannt und fotografiert.',
      en: 'A desktop PC on a trolley, a generator for power – that is how parts get scanned and photographed in the warehouse.',
    },
    fix: {
      de: 'Eine eigene App auf dem Smartphone oder Handscanner: scannen, fotografieren, fertig. Offline-fähig.',
      en: 'A private app on a phone or handheld scanner: scan, snap, done. Works offline.',
    },
  },
  {
    id: 'erp',
    icon: 'chart',
    title: { de: 'Daten im ERP, Erkenntnis nirgends', en: 'Data in the ERP, insight nowhere' },
    pain: {
      de: 'Kunden liefern Datenbanken und Exporte – ausgewertet wird per Hand in Excel, jede Woche neu.',
      en: 'Customers hand over databases and exports – analysed by hand in Excel, every single week.',
    },
    fix: {
      de: 'Automatischer Import, saubere Datenmodelle und Dashboards, die sich selbst aktualisieren.',
      en: 'Automated import, clean data models and dashboards that refresh themselves.',
    },
  },
  {
    id: 'legacy',
    icon: 'legacy',
    title: { de: 'Frankenstein-Architektur', en: 'Frankenstein architecture' },
    pain: {
      de: 'VBA-Makros, Access-Datenbanken und Skripte, die nur noch eine Person versteht – und die bald in Rente geht.',
      en: 'VBA macros, Access databases and scripts only one person still understands – who retires soon.',
    },
    fix: {
      de: 'Schrittweise Ablösung durch wartbare, getestete Software – ohne Big-Bang und ohne Stillstand.',
      en: 'Step-by-step replacement with maintainable, tested software – no big bang, no downtime.',
    },
  },
  {
    id: 'machines',
    icon: 'pulse',
    title: { de: 'Maschinen ohne Stimme', en: 'Machines without a voice' },
    pain: {
      de: 'Stillstände fallen erst auf, wenn jemand vorbeiläuft. Kennzahlen gibt es erst am Monatsende.',
      en: 'Downtime is noticed when someone walks by. Metrics arrive at the end of the month.',
    },
    fix: {
      de: 'Maschinendaten live erfassen, Alarme aufs Handy, OEE auf einen Blick.',
      en: 'Capture machine data live, alerts on your phone, OEE at a glance.',
    },
  },
];

export interface Job {
  period: string;
  role: L10n;
  org: string;
  place: string;
  points: Record<Lang, string[]>;
  stack?: string[];
}

export const jobs: Job[] = [
  {
    period: '10/2024 –',
    role: { de: 'Full-Stack-Entwickler', en: 'Full-Stack Developer' },
    org: 'Leue & Nill GmbH',
    place: 'Dortmund',
    stack: ['Angular', 'TypeScript', 'Transloco', 'C#', '.NET', 'EF Core', 'PostgreSQL', 'Azure DevOps'],
    points: {
      de: [
        'Entwicklung eines Maklerverwaltungsportals: Seiten nach UI/UX-Vorgaben mit Formularen, Validierung und REST-Anbindung.',
        'Backend-Endpunkte und Services für CRUD-Operationen, inklusive Entitäten, Migrationen und Tabellen.',
        'Mitarbeit am grundlegenden Refactoring der Backend-Architektur – von Event Sourcing zu einer schlanken CRUD-Architektur.',
        'Tests mit xUnit und Playwright, Code Reviews, Scrum.',
      ],
      en: [
        'Built an insurance broker management portal: pages from UI/UX specs with forms, validation and REST integration.',
        'Backend endpoints and services for CRUD operations, including entities, migrations and tables.',
        'Contributed to a major refactoring of the backend architecture – from event sourcing to a lean CRUD architecture.',
        'Testing with xUnit and Playwright, code reviews, Scrum.',
      ],
    },
  },
  {
    period: '04/2022 – 08/2022',
    role: { de: 'Werkstudent App-Entwicklung', en: 'Working student, app development' },
    org: 'Kaasa Solution GmbH',
    place: '',
    stack: ['Android', 'iOS', 'Wear OS'],
    points: {
      de: ['Apps für Wear OS, Android und iOS.'],
      en: ['Apps for Wear OS, Android and iOS.'],
    },
  },
  {
    period: '2020 – 2022',
    role: { de: 'Tutor, 3 Semester', en: 'Teaching assistant, 3 semesters' },
    org: 'Lehrstuhl 1 Informatik, TU Dortmund',
    place: 'Dortmund',
    points: {
      de: [
        'Zwei wöchentliche Übungsgruppen in „Grundlagen der theoretischen Informatik“ (Prof. Dr. Thomas Schwentick, apl. Prof. Dr. Beate Bollig).',
        'Korrektur von Übungsaufgaben und wöchentliche Help Desks.',
      ],
      en: [
        'Ran two weekly exercise groups in “Foundations of Theoretical Computer Science” (Prof. Dr. Thomas Schwentick, apl. Prof. Dr. Beate Bollig).',
        'Graded assignments and held weekly help desks.',
      ],
    },
  },
];

export const education = [
  { period: { de: 'ab WS 2017/18', en: 'from 2017' }, title: { de: 'Studium Informatik – abgeschlossen', en: 'Computer Science – completed' }, org: 'TU Dortmund' },
  { period: { de: '', en: '' }, title: { de: 'Abitur', en: 'Abitur (A-levels)' }, org: 'Euregio Gymnasium Bocholt' },
];

export const skills: { group: L10n; items: string[] }[] = [
  { group: { de: 'Backend', en: 'Backend' }, items: ['C#', '.NET', 'ASP.NET Core', 'EF Core', 'REST', 'GraphQL', 'Swagger / OpenAPI', 'Java', 'Python'] },
  { group: { de: 'Frontend', en: 'Frontend' }, items: ['Angular', 'SvelteKit', 'TypeScript', 'Tailwind', 'HTML', 'CSS', 'Transloco', 'Astro'] },
  { group: { de: 'Mobile', en: 'Mobile' }, items: ['.NET MAUI', 'Android', 'iOS', 'Wear OS'] },
  { group: { de: 'Daten & Betrieb', en: 'Data & Ops' }, items: ['PostgreSQL', 'Docker', 'Traefik', 'Linux', 'Azure DevOps', 'GitHub Actions', 'Git'] },
  { group: { de: 'Qualität', en: 'Quality' }, items: ['xUnit', 'Playwright', 'Vitest', 'Code Reviews', 'Clean Code', 'Domain-Driven Design', 'ADRs'] },
  { group: { de: 'Arbeitsweise', en: 'Workflow' }, items: ['Scrum', 'Agentic Development', 'Claude Code', 'GitHub Copilot'] },
];

export const languages: { name: L10n; level: L10n; pct: number }[] = [
  { name: { de: 'Deutsch', en: 'German' }, level: { de: 'Muttersprache', en: 'Native' }, pct: 100 },
  { name: { de: 'Englisch', en: 'English' }, level: { de: 'Sehr gut, Wort & Schrift', en: 'Fluent, spoken & written' }, pct: 85 },
  { name: { de: 'Türkisch', en: 'Turkish' }, level: { de: 'Grundkenntnisse', en: 'Basic' }, pct: 35 },
];

/** UI copy. Keys are grouped by section. */
export const t = {
  de: {
    meta: {
      title: 'Umut Aslan – Full-Stack-Entwicklung für den Mittelstand',
      description: 'Software, Apps und Dashboards für Industrie und Mittelstand. Full-Stack-Entwickler aus Bocholt & Dortmund – C#, .NET, Angular, React, Docker. Mit Live-Demos.',
    },
    nav: { problems: 'Lösungen', projects: 'Projekte', method: 'Arbeitsweise', cv: 'Werdegang', contact: 'Kontakt' },
    hero: {
      kicker: 'Full-Stack-Entwicklung · Bocholt & Dortmund',
      lead: 'Ich baue Software, die alte Insellösungen ablöst: mobile Apps fürs Lager, Dashboards für ERP-Daten und Webanwendungen statt Excel-Makros.',
      lead2: 'Jedes Projekt auf dieser Seite läuft live auf eigener Infrastruktur.',
      ctaPrimary: 'Live-Projekte ansehen',
      ctaSecondary: 'Projekt besprechen',
      stats: ['Jahre Praxis bei Leue & Nill', 'Subdomains, eine Infrastruktur', 'Sprachen & Frameworks'],
    },
    problems: {
      title: 'Probleme, die ich löse',
      intro: 'Diese Szenarien kommen direkt aus Gesprächen mit Maschinenbau-Unternehmen. Zu jedem gibt es eine Demo.',
      pain: 'Heute',
      fix: 'Morgen',
      demo: 'Zur Demo',
    },
    projects: {
      title: 'Ein Netz aus Live-Demos',
      intro: 'Jede Subdomain ist ein eigenständiges Projekt mit eigenem Stack – vom Frontend bis zur Datenbank, containerisiert und automatisch ausgeliefert.',
      status: { live: 'Live', building: 'In Arbeit', planned: 'Geplant' },
      open: 'Öffnen',
      code: 'Code',
      solves: 'Löst',
    },
    method: {
      title: 'KI-gestützt. Von mir verantwortet.',
      intro: 'KI-Agenten schreiben heute viel Code. Den Unterschied machen Spezifikation, Architektur, Tests und Review – und genau das ist meine Arbeit.',
      steps: [
        ['Verstehen', 'Vor Ort zuhören, Prozesse aufnehmen, Anforderungen als testbare Spezifikation festhalten.'],
        ['Entwerfen', 'Architektur, Datenmodell und Schnittstellen festlegen, bevor die erste Zeile entsteht.'],
        ['Bauen', 'Implementierung mit KI-Agenten in kleinen, überprüfbaren Schritten. Jede Änderung wird gelesen.'],
        ['Absichern', 'Automatisierte Tests, Selbstprüfungen und Code Reviews als Pflicht, nicht als Kür.'],
        ['Ausliefern', 'Container, automatisches HTTPS, reproduzierbare Builds, Monitoring.'],
      ],
      caseKicker: 'Fallstudie',
      caseTitle: 'SkulInsight QoL',
      caseLead: 'Eine Mod für das Spiel „Skul: The Hero Slayer“, komplett agentisch entwickelt. Sie greift per Harmony-Patches in ein fremdes, nicht dokumentiertes Unity-Spiel ein, macht versteckte Spielmechanik sichtbar und übersteht Spiel-Updates.',
      casePoints: [
        ['Selbsttest beim Start', 'Nach einem Spiel-Update prüft die Mod alle ihre Hooks und schaltet nur ab, was kaputt ist. Der Rest läuft weiter.'],
        ['Eigenes Testprojekt', 'Schadensberechnung und Logik sind getrennt vom Spiel testbar.'],
        ['Echte Nutzer', 'Veröffentlicht auf Thunderstore, der offiziellen Mod-Plattform, mit regelmäßigen Releases.'],
        ['Produktreif', '40+ Einstellungen im Spielmenü, alle 11 Sprachen des Spiels, Kampf-Log mit JSON-Export.'],
      ],
      caseStats: ['Releases', 'Tage bis v{v}', 'Downloads', 'Sprachen'],
      caseLinks: ['Auf Thunderstore', 'Quellcode auf GitHub'],
    },
    pipeline: {
      title: 'Auch diese Seite ist ein Beweis',
      intro: 'Diese Seite durchläuft denselben Lebenszyklus wie jedes Kundenprojekt. Die Werte unten stammen aus dem aktuellen Build.',
      stages: [
        ['Plan', 'Inhalte typisiert in einer Datei, zweisprachig'],
        ['Build', 'Astro, statisch, kaum JavaScript'],
        ['Test', 'Playwright-Tests in Chromium'],
        ['Ship', 'Docker multi-stage, nginx'],
        ['Run', 'Traefik, Let’s Encrypt, HSTS'],
      ],
      built: 'Build',
      commit: 'Commit',
      privacy: 'Keine Cookies, kein Tracking, keine externen Schriftarten.',
    },
    cv: {
      title: 'Werdegang',
      work: 'Berufserfahrung',
      edu: 'Ausbildung',
      skills: 'Kenntnisse',
      langs: 'Sprachen',
      now: 'heute',
      download: 'Lebenslauf ansehen & als PDF speichern',
      about: 'Über mich',
      aboutText: 'Geboren in Bocholt, Informatikstudium an der TU Dortmund, seit 2024 Full-Stack-Entwickler. Abseits des Codes: Spieleentwicklung, Klavier, Geocaching, Lesen und Fitnessstudio.',
    },
    contact: {
      title: 'Ihr Prozess hat Besseres verdient.',
      text: 'Erzählen Sie mir, wo es hakt – beim Lager, beim ERP oder bei der Excel-Datei, die niemand mehr anfassen will. Das erste Gespräch ist kostenlos.',
      cta: 'E-Mail schreiben',
      copied: 'Adresse kopiert',
      copy: 'Adresse kopieren',
    },
    footer: { imprint: 'Impressum', privacy: 'Datenschutz', source: 'Gebaut mit Astro, ausgeliefert per Docker & Traefik' },
    theme: 'Farbschema wechseln',
    switchLang: 'English',
  },
  en: {
    meta: {
      title: 'Umut Aslan – Full-stack development for industry',
      description: 'Software, apps and dashboards for manufacturing and SMEs. Full-stack developer based in Bocholt & Dortmund, Germany – C#, .NET, Angular, React, Docker. With live demos.',
    },
    nav: { problems: 'Solutions', projects: 'Projects', method: 'Approach', cv: 'Résumé', contact: 'Contact' },
    hero: {
      kicker: 'Full-stack development · Bocholt & Dortmund',
      lead: 'I build software that replaces patchwork systems: mobile apps for the warehouse, dashboards for ERP data and web apps instead of Excel macros.',
      lead2: 'Every project on this page runs live on my own infrastructure.',
      ctaPrimary: 'See live projects',
      ctaSecondary: 'Discuss a project',
      stats: ['years in production at Leue & Nill', 'subdomains, one infrastructure', 'languages & frameworks'],
    },
    problems: {
      title: 'Problems I solve',
      intro: 'These scenarios come straight from conversations with machine-building companies. Each one has a demo.',
      pain: 'Today',
      fix: 'Tomorrow',
      demo: 'See demo',
    },
    projects: {
      title: 'A network of live demos',
      intro: 'Every subdomain is a standalone project with its own stack – frontend to database, containerised and shipped automatically.',
      status: { live: 'Live', building: 'In progress', planned: 'Planned' },
      open: 'Open',
      code: 'Code',
      solves: 'Solves',
    },
    method: {
      title: 'AI-assisted. Owned by me.',
      intro: 'AI agents write a lot of code today. What makes the difference is specification, architecture, tests and review – and that is exactly my job.',
      steps: [
        ['Understand', 'Listen on site, map the process, capture requirements as a testable spec.'],
        ['Design', 'Settle architecture, data model and interfaces before the first line is written.'],
        ['Build', 'Implement with AI agents in small, reviewable steps. Every change is read.'],
        ['Verify', 'Automated tests, self-checks and code review are mandatory, not optional.'],
        ['Ship', 'Containers, automatic HTTPS, reproducible builds, monitoring.'],
      ],
      caseKicker: 'Case study',
      caseTitle: 'SkulInsight QoL',
      caseLead: 'A mod for the game “Skul: The Hero Slayer”, built entirely with AI agents. It hooks into an undocumented third-party Unity game through Harmony patches, exposes hidden game mechanics and survives game updates.',
      casePoints: [
        ['Self-test on startup', 'After a game update the mod checks every hook and disables only what broke. Everything else keeps working.'],
        ['Dedicated test project', 'Damage maths and logic are testable independently of the game.'],
        ['Real users', 'Published on Thunderstore, the official mod platform, with regular releases.'],
        ['Production-grade', '40+ in-game settings, all 11 game languages, combat log with JSON export.'],
      ],
      caseStats: ['releases', 'days to v{v}', 'downloads', 'languages'],
      caseLinks: ['On Thunderstore', 'Source on GitHub'],
    },
    pipeline: {
      title: 'This page is evidence, too',
      intro: 'This site goes through the same lifecycle as every client project. The values below come from the current build.',
      stages: [
        ['Plan', 'Typed content in one file, bilingual'],
        ['Build', 'Astro, static, minimal JavaScript'],
        ['Test', 'Playwright tests in Chromium'],
        ['Ship', 'Docker multi-stage, nginx'],
        ['Run', 'Traefik, Let’s Encrypt, HSTS'],
      ],
      built: 'Built',
      commit: 'Commit',
      privacy: 'No cookies, no tracking, no third-party fonts.',
    },
    cv: {
      title: 'Résumé',
      work: 'Experience',
      edu: 'Education',
      skills: 'Skills',
      langs: 'Languages',
      now: 'present',
      download: 'Printable CV (German, PDF)',
      about: 'About me',
      aboutText: 'Born in Bocholt, studied computer science at TU Dortmund, full-stack developer since 2024. Away from code: game development, piano, geocaching, reading and the gym.',
    },
    contact: {
      title: 'Your process deserves better.',
      text: 'Tell me where it hurts – the warehouse, the ERP or the Excel file nobody dares to touch. The first conversation is free.',
      cta: 'Send an email',
      copied: 'Address copied',
      copy: 'Copy address',
    },
    footer: { imprint: 'Legal notice', privacy: 'Privacy', source: 'Built with Astro, shipped with Docker & Traefik' },
    theme: 'Toggle colour scheme',
    switchLang: 'Deutsch',
  },
};

export type Copy = (typeof t)['de'];

/** Project overview for the printable CV (/lebenslauf). */
export const cvProjects: { title: string; tag: string; text: string }[] = [
  { title: 'Einsatz – Serviceberichte (svelte.umut-aslan.dev)', tag: 'SvelteKit-BFF · C# ASP.NET Core · GraphQL · PostgreSQL · Docker', text: 'Offlinefähige Techniker-App mit Freigabe-Workflow, ERP-Export (XML) und DMS-Ablage (PDF). Architektur Frontend · Backend-for-Frontend · Backend; idempotente Offline-Synchronisation; 33 automatisierte Tests (xUnit, Vitest, Playwright); CI/CD, ADRs.' },
  { title: 'ERP-Cockpit (react.umut-aslan.dev)', tag: 'React · TypeScript · C# ASP.NET Core · EF Core · PostgreSQL', text: 'Import von ERP-Exporten (CSV/Excel, Zeichensatz- und Zahlenformat-Erkennung, automatische Spaltenzuordnung, Prüfung mit Fehlerbericht, Rücknahme) und Kennzahlen wie Lagerumschlag, Ladenhüter, Auftragsrückstand und Liefertreue mit Drill-down und Excel-Export. Privater Arbeitsbereich je Besucher; 67 automatisierte Tests.' },
  { title: 'Lager-Scan (angular.umut-aslan.dev)', tag: 'Angular · Java Spring Boot · PostgreSQL · PWA', text: 'Smartphone als Barcode-Scanner fürs Ersatzteillager statt „PC auf Rollwagen“: Kamera-Scan (BarcodeDetector/jsQR) und Handscanner, Buchungen auch ohne Netz (IndexedDB-Outbox, idempotente API), Leitstand mit Live-Feed per Server-Sent Events, Handy-Kopplung per QR-Code. 35 automatisierte Tests (JUnit, Vitest, Playwright inkl. künstlicher Kamera).' },
  { title: 'SkulInsight QoL', tag: 'C# · BepInEx · Harmony · veröffentlicht', text: 'Mod für „Skul: The Hero Slayer“, agentisch entwickelt: echte Schadenswerte, Kampf-Log mit JSON-Export, Bestiarium, 11 Sprachen. Selbsttest aller Hooks beim Start, eigenes Testprojekt, regelmäßige Releases auf Thunderstore.' },
  { title: 'umut-aslan.dev', tag: 'Astro · TypeScript · Docker · Traefik', text: 'Portfolio und eigene Infrastruktur: zweisprachige Seite, Playwright-Tests gegen das Produktions-Image, Container hinter Traefik mit automatischem HTTPS.' },
  { title: 'GlobalPenfriends', tag: '.NET MAUI · C#', text: 'Plattformübergreifende App mit Registrierung, Profilen, Suche, Direktnachrichten und Monetarisierung.' },
  { title: 'Conway’s Game of Life', tag: 'C# · WPF', text: 'Simulation mit wählbaren Regelwerken als Konsolenanwendung und WPF-Oberfläche (Spielfeld, Geschwindigkeit, Zellen per Mausklick), inklusive Testprojekt.' },
  { title: 'Splendor', tag: 'Java · Uni, 9er-Team', text: 'Brettspiel mit vollständigem Regelwerk, GUI und drei KI-Stufen (Zufall, Greedy, Minimax mit variabler Tiefe); Spielstand jederzeit speicher- und ladbar.' },
  { title: 'Terminverwaltung Arztpraxis', tag: 'Java · Uni, 9er-Team', text: 'Planung mit UML, Umsetzung im Team über GitHub: Patienten anlegen, bearbeiten, löschen, Termine je Patient.' },
  { title: 'Face Mask Recognition', tag: 'Python · PyTorch · Uni', text: 'Bildklassifikation (Maske ja/nein) auf über 4.000 Bildern mit Merkmalsvektoren und k-Nearest-Neighbour.' },
  { title: 'HTTP-Server', tag: 'Java · Uni', text: 'Server auf Socket-Ebene, der HTTP-Requests protokollgerecht beantwortet (Statuscodes, Payload).' },
  { title: 'Lego-Roboter', tag: 'C · Embedded · Uni', text: 'Aufgaben mit Sensorik im Hardware-Praktikum und Modul Embedded Systems, inklusive konkurrierender Zugriffe auf gemeinsame Ressourcen.' },
];
