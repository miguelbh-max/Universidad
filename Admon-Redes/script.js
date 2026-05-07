// Particle system
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 60; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
        p.style.animationDelay = Math.random() * 8 + 's';
        p.style.animationDuration = (Math.random() * 6 + 4) + 's';
        container.appendChild(p);
    }
}

// Packet counter animation
function animateCounter() {
    const el = document.getElementById('packetCounter');
    if (!el) return;
    let count = 0;
    const target = 1847;
    const step = Math.ceil(target / 80);
    const interval = setInterval(() => {
        count += step;
        if (count >= target) { count = target; clearInterval(interval); }
        el.textContent = count.toLocaleString();
    }, 30);
}

// Scroll reveal
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                if (entry.target.id === 'packetCounter') animateCounter();
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.step, .device-card, .status-card, .topo-device, .section-header, .counter').forEach(el => {
        observer.observe(el);
    });
}

// Tilt effect on device cards
function initTilt() {
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.03,1.03,1.03)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale3d(1,1,1)';
        });
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

// Init
createParticles();
initScrollReveal();
initTilt();
