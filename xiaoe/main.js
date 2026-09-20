/* ---- 咨询弹窗 ---- */
(function(){
  var MASK = document.getElementById('agentMask');
  function open(){ MASK.classList.add('on'); document.documentElement.style.overflow = 'hidden'; }
  function close(){ MASK.classList.remove('on'); document.documentElement.style.overflow = ''; }
  document.getElementById('agClose').addEventListener('click', close);
  MASK.addEventListener('click', function(e){ if (e.target === MASK) close(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });

  /* 页面所有咨询类按钮 → 弹二维码 */
  document.querySelectorAll('a[href="#contact"], .btn-primary').forEach(function(el){
    el.addEventListener('click', function(e){
      e.preventDefault();
      open();
    });
  });

  /* 外部调用：window.openConsult() */
  window.openConsult = open;
})();

/* 用户偏好减少动画、或直接锚点进入时：跳过动画，内容立即可见 */
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (REDUCED || location.hash) {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  document.querySelectorAll('[data-count]').forEach(el => {
    el.textContent = (+el.dataset.count).toLocaleString() + (el.dataset.suffix || '');
  });
}

/* 导航滚动效果 */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

/* 移动端菜单 */
const toggle = document.getElementById('menuToggle');
const menu = document.getElementById('navMenu');
toggle.addEventListener('click', () => menu.classList.toggle('show'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('show')));

/* 产品能力 Tab */
document.querySelectorAll('.cap-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const i = tab.dataset.tab;
    document.querySelectorAll('.cap-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.cap-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector(`.cap-panel[data-panel="${i}"]`).classList.add('active');
  });
});

/* ---- 二维码灯箱（扫码下载） ---- */
(function(){
  var mask = null;
  function ensure(){
    if (mask) return mask;
    mask = document.createElement('div');
    mask.id = 'qrMask';
    mask.setAttribute('role','dialog');
    mask.setAttribute('aria-modal','true');
    mask.innerHTML = '<div id="qrCard">'
      + '<button class="qr-close" aria-label="关闭">&times;</button>'
      + '<h3 id="qrTitle"></h3>'
      + '<img id="qrImg" alt="扫码下载二维码">'
      + '<p id="qrNote">手机相机或微信「扫一扫」即可下载</p>'
      + '</div>';
    document.body.appendChild(mask);
    mask.addEventListener('click', function(e){ if (e.target === mask) hide(); });
    mask.querySelector('.qr-close').addEventListener('click', hide);
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') hide(); });
    return mask;
  }
  function show(src, title, note, big){
    var m = ensure();
    m.querySelector('#qrImg').src = src;
    m.querySelector('#qrTitle').textContent = title || '扫码下载';
    m.querySelector('#qrNote').textContent = note || '手机相机或微信「扫一扫」即可下载';
    m.querySelector('#qrCard').classList.toggle('big', !!big);
    m.classList.add('on');
    document.documentElement.style.overflow = 'hidden';
  }
  function hide(){
    if (!mask) return;
    mask.classList.remove('on');
    document.documentElement.style.overflow = '';
  }
  document.addEventListener('click', function(e){
    var t = e.target.closest ? e.target.closest('[data-qr]') : null;
    if (t){
      e.preventDefault();
      show(t.getAttribute('data-qr'), t.getAttribute('data-qr-title'),
           t.getAttribute('data-qr-note'), t.hasAttribute('data-qr-big'));
    }
  });
})();

document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

/* 滚动进入动画 */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* 数字滚动 */
const counters = document.querySelectorAll('[data-count]');
const cio = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const tick = () => {
      cur += step;
      if (cur >= target) { el.textContent = target.toLocaleString() + suffix; }
      else { el.textContent = cur.toLocaleString() + suffix; requestAnimationFrame(tick); }
    };
    tick();
    cio.unobserve(el);
  });
}, { threshold: 0.6 });
if (!REDUCED && !location.hash) counters.forEach(c => cio.observe(c));