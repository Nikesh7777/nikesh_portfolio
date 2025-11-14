// Keep CSS var synced with real header height (prevents anchor overlap)
function setHeaderHeightVar(){
  const header = document.querySelector('.site-header');
  if (!header) return;
  document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
}

document.addEventListener('DOMContentLoaded', () => {
  setHeaderHeightVar();
  window.addEventListener('resize', setHeaderHeightVar);

  // Theme toggle (persist)
  const tbtn = document.getElementById('themeToggle');
  const syncToggleText = () => {
    const isLight = document.body.classList.contains('light-mode');
    if (tbtn){
      tbtn.textContent = isLight ? 'Dark' : 'Light';
      tbtn.setAttribute('aria-pressed', String(isLight));
    }
  };
  if (tbtn){
    const saved = localStorage.getItem('theme');
    if (saved === 'light') document.body.classList.add('light-mode');
    else if (saved === 'dark')  document.body.classList.remove('light-mode');
    else { document.body.classList.add('light-mode'); localStorage.setItem('theme', 'light'); }
    syncToggleText();
    tbtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      syncToggleText();
      setHeaderHeightVar();
    });
  }

  // Reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting){
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

  // Active nav link on scroll
  const navLinks = Array.from(document.querySelectorAll('.nav a[href^="#"]'));
  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  function updateActive(){
    const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 96;
    const pos = window.scrollY + headerH + 40;
    let current = sections[0]?.id || null;
    sections.forEach(sec => { if (sec.offsetTop <= pos) current = sec.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
  }
  window.addEventListener('scroll', updateActive, { passive:true });
  updateActive();

  // Smooth anchor scroll with header offset
  document.querySelectorAll('.nav a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length > 1){
        const target = document.querySelector(id);
        if (target){
          e.preventDefault();
          const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 96;
          const top = target.getBoundingClientRect().top + window.scrollY - (headerH + 10);
          window.scrollTo({ top, behavior:'smooth' });
        }
      }
    });
  });

  // Personal projects: expand/collapse
  document.querySelectorAll('.project').forEach(card => {
    const toggle = card.querySelector('.project-toggle');
    const body   = card.querySelector('.project-body');
    if (!toggle || !body) return;
    toggle.addEventListener('click', () => {
      const open = card.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      body.setAttribute('aria-hidden', String(!open));
    });
  });

  // Document preview
  const dialog = document.getElementById('docPreview');
  const obj = document.getElementById('docObject');
  dialog?.querySelector('.close-preview')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  document.querySelectorAll('[data-preview]').forEach(el => {
    el.addEventListener('click', () => {
      const url = el.getAttribute('data-preview');
      if (!dialog || !obj || !url) return;
      if (url.toLowerCase().endsWith('.pdf')) obj.setAttribute('type','application/pdf');
      else obj.removeAttribute('type');
      obj.setAttribute('data', url);
      dialog.showModal();
    });
  });

  // ===== Skills filtering & search (search overrides tab) =====
  const tabbar = document.querySelector('.skills-pro .tabs');
  const cards  = Array.from(document.querySelectorAll('.skillboard .skillcard'));
  const search = document.getElementById('skillSearch');
  const notice = document.getElementById('skillNotice');
  const empty  = document.getElementById('skillEmpty');

  let currentGroup = 'core'; // remember selected tab when search is cleared

  function showCard(card, show){ card.style.display = show ? '' : 'none'; }

  function clearTagStates(card){
    card.querySelectorAll('.tags li').forEach(li => {
      li.classList.remove('tag-hit');
      li.classList.remove('tag-hidden');
    });
  }

  function applyGroup(group){
    currentGroup = group;
    cards.forEach(c => {
      clearTagStates(c);
      const groups = (c.getAttribute('data-group') || '').split(' ');
      showCard(c, group === 'all' || groups.includes(group));
    });
    empty.hidden = true;
  }

  function applySearch(termRaw){
    const term = termRaw.trim().toLowerCase();
    if (!term){
      // restore selected tab
      notice.hidden = true;
      applyGroup(currentGroup);
      return;
    }
    // Search mode: override to ALL categories
    notice.hidden = false;
    let anyHit = false;
    cards.forEach(c => {
      const title = c.querySelector('header h3')?.textContent?.toLowerCase() || '';
      clearTagStates(c);
      let cardHasHit = false;
      c.querySelectorAll('.tags li').forEach(li => {
        const hit = li.textContent.toLowerCase().includes(term);
        if (hit){
          li.classList.add('tag-hit');
          cardHasHit = true;
        } else {
          li.classList.add('tag-hidden');
        }
      });
      if (title.includes(term)) cardHasHit = true;

      showCard(c, cardHasHit);
      anyHit = anyHit || cardHasHit;
    });
    empty.hidden = anyHit;
  }

  tabbar?.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab');
    if (!btn) return;
    document.querySelectorAll('.skills-pro .tab').forEach(t => t.classList.remove('is-active'));
    btn.classList.add('is-active');
    const group = btn.getAttribute('data-skill-filter') || 'all';
    if (search && search.value.trim()){
      currentGroup = group;
      return applySearch(search.value);
    }
    applyGroup(group);
  });

  search?.addEventListener('input', (e) => applySearch(e.target.value));

  // Default view
  applyGroup('core');
});
