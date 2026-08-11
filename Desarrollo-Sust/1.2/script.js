/**
 * Lógica para interactividad y animaciones
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Animaciones de entrada al hacer scroll usando IntersectionObserver
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');

    const observerOptions = {
        root: null, // viewport por defecto
        rootMargin: '0px',
        threshold: 0.15 // Dispara la animación cuando el 15% del elemento es visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Dejamos de observar el elemento una vez animado
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animatedElements.forEach(el => observer.observe(el));


    // 2. Micro-interacción: Efecto de iluminación con el cursor en las tarjetas
    const cards = document.querySelectorAll('.topic-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Calcular posición X e Y del cursor relativa a la tarjeta
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Aplicar un gradiente radial sutil que sigue al cursor (brillo)
            card.style.background = `
                radial-gradient(
                    600px circle at ${x}px ${y}px, 
                    rgba(255, 255, 255, 0.1), 
                    var(--glass-bg) 40%
                )
            `;
        });

        // Restaurar el fondo cuando el cursor sale
        card.addEventListener('mouseleave', () => {
            card.style.background = 'var(--glass-bg)'; 
        });
    });

    // 3. Smooth scroll personalizado para los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Lógica de Modales
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Abrir modal
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                // Cerramos todos primero por si acaso
                document.querySelectorAll('.modal-box').forEach(m => m.classList.remove('active'));
                
                modalOverlay.classList.add('active');
                modal.classList.add('active');
            }
        });
    });

    // Cerrar modal con la X
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            document.querySelectorAll('.modal-box').forEach(m => m.classList.remove('active'));
        });
    });

    // Cerrar modal al hacer clic en el overlay (fuera del modal)
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            document.querySelectorAll('.modal-box').forEach(m => m.classList.remove('active'));
        }
    });

});
