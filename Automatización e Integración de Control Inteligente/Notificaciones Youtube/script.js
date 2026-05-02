document.addEventListener('DOMContentLoaded', () => {
    
    // --- Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal');
    
    // Add active class initially to elements already in viewport
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        
        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // --- Optional: Interactive Background Blobs ---
    const backgroundElements = document.querySelector('.background-elements');
    const blobs = document.querySelectorAll('.blob');
    
    // Only apply mouse move effect on larger screens to save performance on mobile
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            // Move blobs slightly based on mouse position
            blobs[0].style.transform = `translate(${x * -30}px, ${y * -30}px)`;
            blobs[1].style.transform = `translate(${x * 40}px, ${y * 40}px)`;
            blobs[2].style.transform = `translate(${x * -20}px, ${y * 20}px)`;
        });
    }
});
