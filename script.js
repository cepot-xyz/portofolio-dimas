document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, observerOptions);

    // Initial classes for reveal components
    const elementsToReveal = [
        '.hero-container',
        '.intro-icon-box',
        '.intro-text-box',
        '.status-box'
    ];

    elementsToReveal.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.add('reveal-hidden');
            observer.observe(el);
        });
    });

    // 2. Mouse Move Effect for Hero
    const heroContainer = document.querySelector('.hero-container');
    const heroTitle = document.querySelector('.hero-title');
    const memoji = document.querySelector('.memoji-wrapper');

    if (heroContainer) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const moveX = (clientX - centerX) / 50;
            const moveY = (clientY - centerY) / 50;

            if (heroTitle) {
                heroTitle.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
            
            if (memoji) {
                memoji.style.transform = `translate(${moveX * 1.5}px, ${moveY * 1.5}px)`;
            }
        });
    }

    // 3. Smooth Scroll and Active Link Handling
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // In a real multi-section site, we would scroll to the target here
        });
    });

    // 4. Subtle Glow Follower
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
});

/* Add necessary styles dynamically for JS effects */
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .reveal-hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        filter: blur(10px);
    }

    .reveal-active {
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
    }

    .cursor-glow {
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(167, 230, 187, 0.05) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: left 0.1s ease-out, top 0.1s ease-out;
    }

    .hero-title {
        transition: transform 0.1s ease-out;
    }
`;
document.head.appendChild(dynamicStyles);
