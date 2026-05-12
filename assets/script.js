/* ============================================================
   QUANTIX BD — Shared Scripts
   ============================================================ */

const WHATSAPP = "https://wa.me/8801333388489";

const PRODUCTS = [
  {slug:"electronic-brush",   emoji:"🪥", name:"Electronic Brush",                              short:"Smart electric brush for effortless cleaning"},
  {slug:"pencil-battery",     emoji:"✏️", name:"Type C Rechargeable Pencil Battery",            short:"Modern rechargeable battery with USB Type C charging"},
  {slug:"massage-combo",      emoji:"💆", name:"Massage Combo (3/4/5 in 1)",                    short:"All-in-one massage device with multiple heads"},
  {slug:"hot-water-bag",      emoji:"♨️", name:"Hot Water Bag",                                  short:"Fast heating reusable hot water bag for pain relief"},
  {slug:"chargestand-cable",  emoji:"🔌", name:"Chargestand 2-in-1 Cable",                      short:"Charges your device while holding it at the perfect angle"},
  {slug:"rotating-cable",     emoji:"⚡", name:"180° Rotating Head Charging Cable",             short:"Flexible rotating connector for easy charging from any angle"},
  {slug:"foldable-bottle",    emoji:"💧", name:"Foldable Water Bottle",                         short:"Collapsible eco-friendly bottle for on-the-go hydration"},
  {slug:"mini-cooler-fan",    emoji:"🌀", name:"Mini Cooler Fan",                               short:"Compact personal fan for instant cooling anywhere"},
  {slug:"key-ring",           emoji:"🔑", name:"Key Ring with Phone Number",                    short:"Smart key ring engraved with your phone number"},
  {slug:"gardening-tools",    emoji:"🌱", name:"3 PCS Gardening Mini Garden Tools",             short:"Essential mini tool set for home gardening"},
  {slug:"dragon-stress-toy",  emoji:"🐲", name:"Cute Dragon Eye Squeeze Stress Relief Toy",     short:"Satisfying squeeze toy for instant stress relief"},
  {slug:"monkey-night-light", emoji:"🐵", name:"Cute Monkey LED Night Light",                   short:"Adorable LED night light perfect for kids rooms"}
];

const WA_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.3 5.3 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3M12 2a10 10 0 00-8.4 15.4L2 22l4.7-1.5A10 10 0 1012 2z"/></svg>';
const ARROW_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';

function escAttr(s){
  return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function productCardHTML(p, basePath){
  const detailUrl = basePath + p.slug + ".html";
  const orderMsg = encodeURIComponent(`Hi! I'd like to order: ${p.name}`);
  return `
    <article class="product-card reveal" data-name="${escAttr(p.name.toLowerCase())}">
      <a href="${detailUrl}" class="product-image" aria-label="${escAttr(p.name)} details">
        <span class="product-emoji">${p.emoji}</span>
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

function renderProductGrid(containerSelector, basePath){
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.innerHTML = PRODUCTS.map(p => productCardHTML(p, basePath)).join('');
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
});
