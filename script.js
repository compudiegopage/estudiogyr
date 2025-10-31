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


function sendEmail(e) {
  e.preventDefault();
  if (!formStatus) return;

  formStatus.textContent = 'Enviando...';

  // Verifica que EmailJS esté cargado
  if (typeof emailjs === 'undefined') {
    formStatus.textContent = 'Error: EmailJS no está cargado.';
    return;
  }

  // Envía el formulario
  emailjs.sendForm('service_fdpnxyi', 'template_9bvt898', '#form-contact')
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
       formStatus.textContent = 'Mensaje enviado. Gracias!';
       form.reset(); // limpia el formulario
    }, function(error) {
       console.error('EmailJS error:', error);
       formStatus.textContent = 'Error al enviar. Intentá nuevamente.';
    });
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
// Animaciones al hacer scroll
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-in-up");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach(el => observer.observe(el));
});
// Inicializar EmailJS
emailjs.init("uTn3KW7p_v0tEukSm");

window.addEventListener("scroll", () => {
  const footer = document.querySelector(".site-footer");
  const whatsapp = document.querySelector(".whatsapp-float");
  const footerTop = footer.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (footerTop < windowHeight) {
    whatsapp.style.bottom = `${windowHeight - footerTop + 20}px`; // sube cuando se acerca al footer
  } else {
    whatsapp.style.bottom = "20px";
  }
});
