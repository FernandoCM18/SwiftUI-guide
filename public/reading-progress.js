(function () {
  'use strict';

  const STORAGE_KEY = 'swiftui-guide-read-v1';

  function getLang() {
    return /\/en\//.test(window.location.pathname) ? 'en' : 'es';
  }

  function t(key) {
    return {
      mark: { es: 'Marcar como leído', en: 'Mark as read' },
      read: { es: '✓ Leído', en: '✓ Read' },
    }[key][getLang()];
  }

  function getReadPages() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { return []; }
  }

  function setReadPages(pages) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
  }

  function isRead(path) {
    return getReadPages().includes(path);
  }

  function toggleRead(path) {
    const pages = getReadPages();
    const i = pages.indexOf(path);
    if (i === -1) pages.push(path);
    else pages.splice(i, 1);
    setReadPages(pages);
    return i === -1; // returns new read state
  }

  function updateBtn(btn, read) {
    btn.textContent = read ? t('read') : t('mark');
    btn.dataset.read = String(read);
    btn.setAttribute('aria-pressed', String(read));
  }

  function updateSidebar() {
    const readPages = getReadPages();
    document.querySelectorAll('.sidebar-content a[href]').forEach(link => {
      try {
        const path = new URL(link.href, location.origin).pathname;
        if (readPages.includes(path)) {
          link.setAttribute('data-rp-read', 'true');
        } else {
          link.removeAttribute('data-rp-read');
        }
      } catch (_) {}
    });
  }

  function inject() {
    const content = document.querySelector('.sl-markdown-content');
    if (!content) return;

    document.getElementById('rp-container')?.remove();

    const path = window.location.pathname;
    const read = isRead(path);

    const container = document.createElement('div');
    container.id = 'rp-container';

    const btn = document.createElement('button');
    btn.id = 'rp-btn';
    updateBtn(btn, read);

    btn.addEventListener('click', () => {
      const newState = toggleRead(path);
      updateBtn(btn, newState);
      updateSidebar();
    });

    container.appendChild(btn);
    content.after(container);

    if (!read) {
      const onScroll = () => {
        const reached = window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight * 0.9;
        if (reached) {
          window.removeEventListener('scroll', onScroll);
          if (!isRead(path)) {
            toggleRead(path);
            updateBtn(btn, true);
            updateSidebar();
          }
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  }

  function init() {
    inject();
    updateSidebar();
  }

  // astro:page-load fires on navigations when View Transitions are enabled.
  // DOMContentLoaded covers the initial page load in all cases.
  document.addEventListener('astro:page-load', init);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
