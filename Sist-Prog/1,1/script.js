document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation (Micro-animaciones al scrollear)
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 120; // Cuántos píxeles antes de aparecer se dispara

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    
    // Disparar una vez al cargar para elementos ya visibles en el viewport
    revealOnScroll();

    // Smooth scroll personalizado para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Cálculo de altura considerando el navbar flotante
                const navHeight = document.querySelector('.navbar').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight - 20, // Offset adicional de 20px
                    behavior: 'smooth'
                });
            }
        });
    });
});
