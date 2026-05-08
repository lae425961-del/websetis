// ===== CART SYSTEM =====
let cartCount = parseInt(localStorage.getItem('cartCount') || '0');
updateCartUI();

function addToCart(btn) {
  cartCount++;
  localStorage.setItem('cartCount', cartCount);
  updateCartUI();
  showToast();

  // Animate button
  const icon = btn.querySelector('i');
  icon.className = 'bi bi-bag-check-fill';
  btn.style.background = '#22c55e';
  btn.style.color = '#fff';
  setTimeout(() => {
    icon.className = 'bi bi-bag-plus';
    btn.style.background = '';
    btn.style.color = '';
  }, 1500);
}

function updateCartUI() {
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = cartCount;
  });
}

function showToast() {
  const toastEl = document.getElementById('cartToast');
  if (toastEl) {
    const toast = new bootstrap.Toast(toastEl, { delay: 2500 });
    toast.show();
  }
}

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(6,6,6,0.98)';
    nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)';
  } else {
    nav.style.background = 'rgba(10,10,10,0.95)';
    nav.style.boxShadow = 'none';
  }
});

// ===== HOME PAGE COUNTDOWN =====
function startCountdown() {
  const hEl = document.getElementById('cd-h');
  const mEl = document.getElementById('cd-m');
  const sEl = document.getElementById('cd-s');
  if (!hEl) return;

  let total = 23 * 3600 + 59 * 60 + 59;
  function tick() {
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    hEl.textContent = String(h).padStart(2, '0');
    mEl.textContent = String(m).padStart(2, '0');
    sEl.textContent = String(s).padStart(2, '0');
    if (total > 0) total--;
  }
  tick();
  setInterval(tick, 1000);
}

// ===== SCROLL ANIMATIONS =====
function initAnimations() {
  const els = document.querySelectorAll('.product-card, .cat-card, .stat-item, .contact-card, .coupon-card, .bundle-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
  initAnimations();
});
