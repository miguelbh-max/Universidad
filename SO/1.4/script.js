document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // Lógica del Acordeón (Accordion)
    // ==========================================================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const content = currentItem.querySelector('.accordion-content');
            
            // Cerrar otros items si se desea que solo uno esté abierto a la vez
            const allItems = document.querySelectorAll('.accordion-item');
            allItems.forEach(item => {
                if (item !== currentItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Alternar estado activo del item actual
            currentItem.classList.toggle('active');

            // Animar la apertura/cierre calculando el scrollHeight
            if (currentItem.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // ==========================================================================
    // Intersection Observer para animaciones On-Scroll (Fade-in)
    // ==========================================================================
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // 15% del elemento debe ser visible para disparar
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Agregar clase visible cuando entra en pantalla
                entry.target.classList.add('visible');
                // Dejar de observar para que la animación solo ocurra una vez
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        scrollObserver.observe(el);
    });

});
