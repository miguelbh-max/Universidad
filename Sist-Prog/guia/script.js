document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Animations (Intersection Observer)
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.style.getPropertyValue('--delay');
                if (delay) {
                    entry.target.style.transitionDelay = delay;
                }
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => scrollObserver.observe(el));

    // 2. Checklist Logic
    const checkboxes = document.querySelectorAll('.custom-checkbox');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-percent');
    const successMessage = document.getElementById('success-message');

    function updateProgress() {
        const total = checkboxes.length;
        const checked = document.querySelectorAll('.custom-checkbox:checked').length;
        
        const percentage = Math.round((checked / total) * 100);
        
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}%`;

        if (percentage === 100) {
            successMessage.classList.add('show');
            progressFill.style.background = 'linear-gradient(90deg, #2ea043, #3fb950)';
        } else {
            successMessage.classList.remove('show');
            progressFill.style.background = 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))';
        }
    }

    checkboxes.forEach(box => {
        box.addEventListener('change', updateProgress);
    });

    // 3. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});
