// script.js - funcionamiento del menú, scroll suave, año en footer y plantilla EmailJS

// --- DOM elements
const btnMenu = document.getElementById('btn-menu');
const nav = document.getElementById('main-nav');
const form = document.getElementById('form-contact');
const formStatus = document.getElementById('form-status');

// --- Hamburger toggle (accesible)
if (btnMenu && nav) {
  btnMenu.addEventListener('click', () => {
    const expanded = btnMenu.getAttribute('aria-expanded') === 'true';
    btnMenu.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

// --- Close nav when clicking a link + smooth scroll
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    if (!href || href.charAt(0) !== '#') return;
    const target = document.querySelector(href);
    if (target) {
      // calcular offset para el header sticky
      const headerOffset = 72; // ajustar si el header tiene otra altura
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    // cerrar nav en móvil
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      if (btnMenu) btnMenu.setAttribute('aria-expanded', 'false');
    }
  });
});

// --- Poner año actual en footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// --- EMAILJS (plantilla)
// 1) Incluí en el HTML la librería (ya la agregué):
//    <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
// 2) Inicializá con tu USER_ID (reemplazar 'TU_USER_ID'):
//    emailjs.init('TU_USER_ID');

// Ejemplo de inicialización (comentado):
// (function(){ emailjs.init('TU_USER_ID'); })();

// sendEmail: usa emailjs.sendForm('SERVICE_ID','TEMPLATE_ID', '#form-contact')
function sendEmail(e) {
  e.preventDefault();
  if (!formStatus) return;

  formStatus.textContent = 'Enviando...';

  // Si querés probar sin EmailJS: simulamos
  // BORRAR este bloque cuando integres EmailJS real
  setTimeout(() => {
    formStatus.textContent = 'Mensaje enviado (simulado). Reemplazar con EmailJS en script.js';
    if (form) form.reset();
  }, 900);

  /* Ejemplo real con EmailJS (descomentar y completar IDs):
  if (typeof emailjs === 'undefined') {
    formStatus.textContent = 'Error: EmailJS no está cargado.';
    return;
  }

  emailjs.sendForm('TU_SERVICE_ID', 'TU_TEMPLATE_ID', '#form-contact')
    .then(function(response) {
       formStatus.textContent = 'Mensaje enviado. Gracias!';
       if (form) form.reset();
    }, function(error) {
       console.error('EmailJS error:', error);
       formStatus.textContent = 'Error al enviar. Intentá nuevamente.';
    });
  */
}

// Enlace el handler al formulario
if (form) {
  form.addEventListener('submit', sendEmail);
}

// --- Mejoras opcionales: cerrar nav al click fuera (móvil)
document.addEventListener('click', (e) => {
  if (!nav || !btnMenu) return;
  const isClickInsideNav = nav.contains(e.target) || btnMenu.contains(e.target);
  if (!isClickInsideNav && nav.classList.contains('open')) {
    nav.classList.remove('open');
    btnMenu.setAttribute('aria-expanded', 'false');
  }
});
