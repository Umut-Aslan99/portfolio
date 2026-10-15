// Guided tour of umut-aslan.dev (German and English) – mechanics in site-tour.js, shared with every demo.
import { startTours } from '/site-tour.js';

const en = document.documentElement.lang.startsWith('en');
const home = () => location.pathname === '/' || location.pathname === '/en/';

const de = [
  {
    title: 'Willkommen auf umut-aslan.dev',
    text: `Ich begleite Sie kurz über diese Seite: **wer hier arbeitet**, welche **Probleme** er löst – und wo Sie alles **live ausprobieren** können.

Dauert etwa eine Minute.`,
  },
  {
    target: '.idcard',
    title: 'Wer hier arbeitet',
    text: `**Umut Aslan**, Full-Stack-Entwickler aus Bocholt & Dortmund mit Praxis bei Leue & Nill.
Er baut Software, die alte Insellösungen ablöst – vom Frontend bis zur Datenbank.`,
  },
  {
    target: '#problems .grid',
    title: 'Probleme aus der Werkhalle',
    mood: 'worried',
    text: `Zettel im Außendienst, der PC auf dem Rollwagen im Lager, ERP-Exporte in Excel, Maschinen, die keiner beobachtet,
die Excel-Datei mit Makros, die niemand mehr anfassen will.

Jede Karte zeigt **heute** und **morgen** – und zu jedem Problem gibt es eine Demo.`,
  },
  {
    target: '#projects .list',
    title: 'Live-Demos statt Screenshots',
    text: `Jede Karte ist ein **eigenständiges Projekt** auf einer eigenen Subdomain, jedes mit einem anderen Stack –
Svelte, React, Angular, Vue, Blazor, .NET MAUI.

**Jede Demo hat ihre eigene Tour** wie diese.`,
  },
  {
    target: '#method',
    title: 'KI-gestützt. Von ihm verantwortet.',
    text: `KI-Agenten schreiben viel Code. Den Unterschied machen **Spezifikation, Architektur, Tests und Review** –
die Fallstudie zeigt das an einem veröffentlichten Projekt mit echten Nutzern.`,
  },
  {
    target: '.pipeline',
    title: 'Auch diese Seite ist ein Beweis',
    text: `Plan, Build, Test, Ship, Run – dieselbe Pipeline wie jedes Kundenprojekt. Die Werte stammen aus dem aktuellen Build.`,
  },
  {
    target: '.cv-link',
    title: 'Der Werdegang',
    text: `Berufserfahrung und Ausbildung – auch als **Lebenslauf zum Drucken**.`,
  },
  {
    target: '#contact .panel',
    title: 'Wo hakt es bei Ihnen?',
    mood: 'curious',
    text: `Beim Lager, beim ERP oder bei der Excel-Datei? **Das erste Gespräch ist kostenlos.**`,
  },
  {
    title: 'Viel Spaß beim Ausprobieren',
    mood: 'celebrate',
    text: `Am besten öffnen Sie eine der Demos – jede erklärt sich mit einer eigenen Tour.

Diese Tour starten Sie jederzeit über den runden Knopf unten links neu.`,
  },
];

const enSteps = [
  {
    title: 'Welcome to umut-aslan.dev',
    text: `Let me walk you through this page: **who builds here**, which **problems** he solves – and where you can **try everything live**.

It takes about a minute.`,
  },
  {
    target: '.idcard',
    title: 'Who builds here',
    text: `**Umut Aslan**, full-stack developer from Bocholt & Dortmund with hands-on experience at Leue & Nill.
He builds software that replaces patchwork systems – from frontend to database.`,
  },
  {
    target: '#problems .grid',
    title: 'Problems from the shop floor',
    mood: 'worried',
    text: `Paper reports in field service, the PC on wheels in the warehouse, ERP exports in Excel, machines nobody watches,
the macro-laden Excel file nobody dares to touch.

Each card shows **today** and **tomorrow** – and every problem has a demo.`,
  },
  {
    target: '#projects .list',
    title: 'Live demos, not screenshots',
    text: `Every card is a **standalone project** on its own subdomain, each with a different stack –
Svelte, React, Angular, Vue, Blazor, .NET MAUI.

**Every demo has its own tour** like this one (in German).`,
  },
  {
    target: '#method',
    title: 'AI-assisted. Owned by him.',
    text: `AI agents write a lot of code. What makes the difference is **specification, architecture, tests and review** –
the case study shows it on a published project with real users.`,
  },
  {
    target: '.pipeline',
    title: 'This page is proof, too',
    text: `Plan, build, test, ship, run – the same pipeline as every client project. The figures come from the current build.`,
  },
  {
    target: '.cv-link',
    title: 'The background',
    text: `Work experience and education – also as a **printable CV**.`,
  },
  {
    target: '#contact .panel',
    title: 'Where does it hurt?',
    mood: 'curious',
    text: `The warehouse, the ERP or the Excel file? **The first conversation is free.**`,
  },
  {
    title: 'Enjoy exploring',
    mood: 'celebrate',
    text: `Best next step: open one of the demos – each one explains itself with its own tour.

You can restart this tour any time with the round button in the bottom left.`,
  },
];

startTours([{ id: 'portfolio', lang: en ? 'en' : 'de', when: home, steps: en ? enSteps : de }]);
