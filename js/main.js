// =========================================================
// Rameez Asghar - Portfolio interactions
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Navbar shrinks once the page scrolls; back-to-top button appears
  const nav = document.getElementById('mainNav');
  const backToTop = document.getElementById('backToTop');
  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    nav.classList.toggle('scrolled', scrolled);
    backToTop.classList.toggle('show', window.scrollY > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0 }));

  // Close the mobile menu after a link is tapped
  const navCollapse = document.getElementById('navLinks');
  document.querySelectorAll('#navLinks .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (navCollapse.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
      }
    });
  });

  // Terminal typing effect
  const typed = document.getElementById('typed');
  if (typed) {
    const commands = ['npm run dev', 'git status', 'npm run build', 'npm start'];
    let cmd = 0;
    let char = 0;
    let deleting = false;
    const tick = () => {
      const text = commands[cmd];
      typed.textContent = text.slice(0, char);
      if (!deleting && char < text.length) {
        char++;
        setTimeout(tick, 80);
      } else if (!deleting) {
        deleting = true;
        setTimeout(tick, 1600);
      } else if (char > 0) {
        char--;
        setTimeout(tick, 35);
      } else {
        deleting = false;
        cmd = (cmd + 1) % commands.length;
        setTimeout(tick, 400);
      }
    };
    tick();
  }

  // Project filter
  const filterButtons = document.querySelectorAll('.btn-filter');
  const projects = document.querySelectorAll('#projectGrid .project');
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projects.forEach((p) => {
        const categories = p.dataset.category.split(' ');
        p.classList.toggle('hide', filter !== 'all' && !categories.includes(filter));
      });
    });
  });

  // Reveal sections as they scroll into view
  const revealTargets = document.querySelectorAll(
    '.section-title, .stat-card, .skill-card, .project-card, .timeline-item, .cert-card, .contact-form'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => observer.observe(el));

  // Contact form: Bootstrap validation, then open the visitor's email app
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
    window.location.href = `mailto:rameezasghar78670@gmail.com?subject=${subject}&body=${body}`;
    form.reset();
    form.classList.remove('was-validated');
  });
});
