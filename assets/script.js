/* ============================================================
   QUANTIX BD — Shared Scripts
   ============================================================ */

const WHATSAPP = "https://wa.me/8801333388489";

const PRODUCTS = [
  {slug:"electronic-brush",   emoji:"🪥", name:"Electronic Brush",                              short:"Smart electric brush for effortless cleaning",            category:"electronics"},
  {slug:"pencil-battery",     emoji:"✏️", name:"Type C Rechargeable Pencil Battery",            short:"Modern rechargeable battery with USB Type C charging",   category:"electronics"},
  {slug:"massage-combo",      emoji:"💆", name:"Massage Combo (3/4/5 in 1)",                    short:"All-in-one massage device with multiple heads",          category:"lifestyle"},
  {slug:"hot-water-bag",      emoji:"♨️", name:"Hot Water Bag",                                  short:"Fast heating reusable hot water bag for pain relief",    category:"home"},
  {slug:"chargestand-cable",  emoji:"🔌", name:"Chargestand 2-in-1 Cable",                      short:"Charges your device while holding it at the perfect angle", category:"electronics"},
  {slug:"rotating-cable",     emoji:"⚡", name:"180° Rotating Head Charging Cable",             short:"Flexible rotating connector for easy charging from any angle", category:"electronics"},
  {slug:"foldable-bottle",    emoji:"💧", name:"Foldable Water Bottle",                         short:"Collapsible eco-friendly bottle for on-the-go hydration", category:"home", image:"https://i.postimg.cc/RV7pyqQz/IMG-0318.jpg"},
  {slug:"mini-cooler-fan",    emoji:"🌀", name:"Mini Cooler Fan",                               short:"Compact personal fan for instant cooling anywhere",      category:"electronics"},
  {slug:"key-ring",           emoji:"🔑", name:"Key Ring with Phone Number",                    short:"Smart key ring engraved with your phone number",         category:"home"},
  {slug:"gardening-tools",    emoji:"🌱", name:"3 PCS Gardening Mini Garden Tools",             short:"Essential mini tool set for home gardening",             category:"tools"},
  {slug:"dragon-stress-toy",  emoji:"🐲", name:"Cute Dragon Eye Squeeze Stress Relief Toy",     short:"Satisfying squeeze toy for instant stress relief",       category:"lifestyle"},
  {slug:"monkey-night-light", emoji:"🐵", name:"Cute Monkey LED Night Light",                   short:"Adorable LED night light perfect for kids rooms",        category:"electronics"},
  {slug:"smart-gps-tracker",  emoji:"📍", name:"Smart GPS Tracking Device",                     short:"Compact anti-loss GPS tracker for both Android and iOS", category:"electronics", image:"https://i.postimg.cc/G90DhRWT/IMG-0325.jpg"}
];

const WA_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
const ARROW_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';

function escAttr(s){
  return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function productCardHTML(p, basePath){
  const detailUrl = basePath + p.slug + ".html";
  const orderMsg = encodeURIComponent(`Hi! I'd like to order: ${p.name}`);
  const visual = p.image
    ? `<img src="${escAttr(p.image)}" alt="${escAttr(p.name)}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">`
    : `<span class="product-emoji">${p.emoji}</span>`;
  return `
    <article class="product-card reveal" data-name="${escAttr(p.name.toLowerCase())}" data-category="${escAttr(p.category || '')}">
      <a href="${detailUrl}" class="product-image" aria-label="${escAttr(p.name)} details">
        ${visual}
      </a>
      <div class="product-body">
        <h3>${escAttr(p.name)}</h3>
        <p>${escAttr(p.short)}</p>
        <div class="product-price">৳ Contact Us</div>
        <div class="product-actions">
          <a href="${detailUrl}" class="btn-view-details">
            <span>View Details</span>
            ${ARROW_SVG}
          </a>
          <a href="${WHATSAPP}?text=${orderMsg}" class="product-order" target="_blank" rel="noopener">
            ${WA_SVG}
            <span>Order Now</span>
          </a>
        </div>
      </div>
    </article>
  `;
}

function renderProductGrid(containerSelector, basePath, filterSlugs){
  const container = document.querySelector(containerSelector);
  if (!container) return;
  let items = PRODUCTS;
  if (Array.isArray(filterSlugs) && filterSlugs.length){
    items = filterSlugs
      .map(slug => PRODUCTS.find(p => p.slug === slug))
      .filter(Boolean);
  }
  container.innerHTML = items.map(p => productCardHTML(p, basePath)).join('');
}

function renderRelatedProducts(containerSelector, currentSlug, count, basePath){
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const others = PRODUCTS.filter(p => p.slug !== currentSlug);
  for (let i = others.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [others[i], others[j]] = [others[j], others[i]];
  }
  container.innerHTML = others.slice(0, count).map(p => productCardHTML(p, basePath)).join('');
}

function initProductSearch(inputSelector, gridSelector, emptySelector){
  const input = document.querySelector(inputSelector);
  const grid = document.querySelector(gridSelector);
  const empty = document.querySelector(emptySelector);
  if (!input || !grid) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    let visible = 0;
    grid.querySelectorAll('.product-card').forEach(card => {
      const match = card.dataset.name.includes(q);
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    if (empty) empty.classList.toggle('show', visible === 0);
  });
}

function initProductFilters({ grid: gridSel, search: searchSel, filterBar: filterSel, empty: emptySel }){
  const grid = document.querySelector(gridSel);
  if (!grid) return;
  const search = searchSel ? document.querySelector(searchSel) : null;
  const filterBar = filterSel ? document.querySelector(filterSel) : null;
  const empty = emptySel ? document.querySelector(emptySel) : null;
  let currentCategory = 'all';

  function apply(){
    const q = (search && search.value || '').toLowerCase().trim();
    let visible = 0;
    grid.querySelectorAll('.product-card').forEach(card => {
      const nameMatch = card.dataset.name.includes(q);
      const catMatch = currentCategory === 'all' || card.dataset.category === currentCategory;
      const show = nameMatch && catMatch;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (empty) empty.classList.toggle('show', visible === 0);
  }

  if (search) search.addEventListener('input', apply);
  if (filterBar){
    filterBar.querySelectorAll('.cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category || 'all';
        apply();
      });
    });
  }
}

function initProductGallery(){
  const thumbs = document.querySelectorAll('.product-thumb');
  const main = document.querySelector('.product-main-image');
  if (!main || !thumbs.length) return;
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      main.classList.remove('thumb-v1','thumb-v2','thumb-v3','thumb-v4');
      const variant = thumb.dataset.variant;
      if (variant) main.classList.add(variant);
    });
  });
}

function initTabs(){
  const tabBtns = document.querySelectorAll('.tab-btn');
  if (!tabBtns.length) return;
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById(tabId);
      if (panel) panel.classList.add('active');
    });
  });
}

function initMobileMenu(){
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!menuToggle || !mobileMenu) return;
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });
}

function initFAQ(){
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;
  items.forEach(item => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      items.forEach(other => {
        other.classList.remove('open');
        const otherBtn = other.querySelector('.faq-q');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen){
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function initHeaderShadow(){
  const header = document.querySelector('header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initReveal(){
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderShadow();
  initProductGallery();
  initTabs();
  initFAQ();
});
