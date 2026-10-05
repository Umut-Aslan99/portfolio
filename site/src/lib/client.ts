/** Progressive enhancements. The site is fully usable without any of this. */

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function theme() {
  const root = document.documentElement;
  const resolve = () =>
    root.dataset.theme ?? (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  const sync = () => (root.dataset.themeResolved = resolve());
  sync();
  matchMedia('(prefers-color-scheme: light)').addEventListener('change', sync);
  document.getElementById('theme')?.addEventListener('click', () => {
    const next = resolve() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch {}
    sync();
  });
}

function progress() {
  const root = document.documentElement;
  let ticking = false;
  const update = () => {
    const max = root.scrollHeight - innerHeight;
    root.style.setProperty('--progress', String(max > 0 ? Math.min(1, scrollY / max) : 0));
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

function reveal() {
  const els = document.querySelectorAll<HTMLElement>('.reveal');
  if (!('IntersectionObserver' in window) || reduced()) { els.forEach((e) => e.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -8% 0px' });
  els.forEach((e) => io.observe(e));
}

function activeNav() {
  const links = new Map<string, HTMLAnchorElement>();
  document.querySelectorAll<HTMLAnchorElement>('.band nav a').forEach((a) => links.set(a.hash.slice(1), a));
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const a = links.get(e.target.id);
      if (a && e.isIntersecting) { links.forEach((l) => l.removeAttribute('aria-current')); a.setAttribute('aria-current', 'true'); }
    }
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}

/** Pointer-following spotlight on cards. */
function spotlight() {
  if (matchMedia('(hover: none)').matches) return;
  document.addEventListener('pointermove', (ev) => {
    const card = (ev.target as HTMLElement).closest<HTMLElement>('.card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${ev.clientX - r.left}px`);
    card.style.setProperty('--my', `${ev.clientY - r.top}px`);
  }, { passive: true });
}

/** Count numbers up when they scroll into view. */
function counters() {
  const els = document.querySelectorAll<HTMLElement>('[data-count]');
  if (reduced()) return;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      const el = e.target as HTMLElement;
      const end = Number(el.dataset.count);
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / 1200);
        el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  });
  els.forEach((e) => io.observe(e));
}

function copyMail() {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy!);
        const label = btn.querySelector('span')!;
        const prev = label.textContent;
        label.textContent = btn.dataset.done ?? '✓';
        setTimeout(() => (label.textContent = prev), 1800);
      } catch { location.href = `mailto:${btn.dataset.copy}`; }
    });
  });
}

/** Hero terminal: types a deploy log line by line. */
function terminal() {
  const el = document.querySelector<HTMLElement>('[data-terminal]');
  if (!el) return;
  const lines = [...el.querySelectorAll<HTMLElement>('[data-line]')];
  if (reduced()) { lines.forEach((l) => l.classList.add('on')); return; }
  let i = 0;
  const next = () => {
    if (i >= lines.length) return;
    lines[i].classList.add('on');
    const delay = Number(lines[i].dataset.line) || 380;
    i++;
    setTimeout(next, delay);
  };
  const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); setTimeout(next, 500); } });
  io.observe(el);
}

export function initSite() {
  theme();
  progress();
  reveal();
  activeNav();
  spotlight();
  counters();
  copyMail();
  terminal();
}
