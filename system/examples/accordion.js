(() => {
  const accordion = document.querySelector('[data-example-accordion]');
  if (!accordion) return;

  const items = [...accordion.querySelectorAll('.example-item')];
  const byId = new Map(items.map(item => [item.id, item]));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let openId = null;

  function setOpen(id, { updateUrl = false, focus = false, scroll = false } = {}) {
    const nextId = byId.has(id) ? id : null;
    for (const item of items) {
      const expanded = item.id === nextId;
      item.querySelector('.example-trigger').setAttribute('aria-expanded', String(expanded));
      item.querySelector('.example-accordion-panel').hidden = !expanded;
    }
    openId = nextId;
    if (updateUrl) {
      const url = nextId ? `#${encodeURIComponent(nextId)}` : `${location.pathname}${location.search}`;
      history.replaceState(null, '', url);
    }
    if (nextId) {
      const item = byId.get(nextId);
      const trigger = item.querySelector('.example-trigger');
      if (focus) trigger.focus({ preventScroll: true });
      if (scroll) requestAnimationFrame(() => item.scrollIntoView({ block: 'start', behavior: reducedMotion.matches ? 'auto' : 'smooth' }));
    }
  }

  accordion.addEventListener('click', event => {
    const trigger = event.target.closest('.example-trigger');
    if (trigger) {
      const id = trigger.dataset.example;
      setOpen(openId === id ? null : id, { updateUrl: true, scroll: openId !== id });
      return;
    }
    const next = event.target.closest('[data-open-example]');
    if (next) setOpen(next.dataset.openExample, { updateUrl: true, focus: true, scroll: true });
  });

  window.addEventListener('hashchange', () => {
    const id = decodeURIComponent(location.hash.slice(1));
    setOpen(id, { scroll: byId.has(id) });
  });

  const initialId = decodeURIComponent(location.hash.slice(1));
  if (byId.has(initialId)) setOpen(initialId, { scroll: true });
})();
