document.addEventListener('DOMContentLoaded', () => {

    const scrollToTop = document.querySelector('.scroll-to-top');
    if (scrollToTop) {
        scrollToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    // Welcome Message Function
    const createWelcomeOverlay = () => {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(26, 31, 46, 0.97)';
        overlay.style.zIndex = '9999';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';

        const welcomeContainer = document.createElement('div');
        welcomeContainer.style.color = '#f8f9fa';
        welcomeContainer.style.fontSize = '2.5rem';
        welcomeContainer.style.fontFamily = 'Inter, sans-serif';
        welcomeContainer.style.padding = '2rem';
        welcomeContainer.style.borderRadius = '12px';
        welcomeContainer.style.border = '1px solid rgba(45, 212, 191, 0.3)';
        welcomeContainer.style.background = 'rgba(26, 31, 46, 0.95)';
        welcomeContainer.style.boxShadow = '0 4px 20px rgba(45, 212, 191, 0.2)';
        welcomeContainer.style.fontStyle = 'italic';

        overlay.appendChild(welcomeContainer);
        document.body.appendChild(overlay);

        const text = 'Welcome!';
        let charIndex = 0;

        function typeWriter() {
            if (charIndex < text.length) {
                welcomeContainer.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 150);
            } else {
                setTimeout(() => {
                    overlay.style.transition = 'opacity 0.8s ease';
                    overlay.style.opacity = '0';
                    setTimeout(() => {
                        overlay.remove();
                    }, 800);
                }, 1000);
            }
        }

        setTimeout(typeWriter, 500);
    };

    // Initializes message
    createWelcomeOverlay();

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    //  adds section transitions
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.sticky-header').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(10px)';
        section.style.transition = 'all 0.5s ease-out';
        sectionObserver.observe(section);
    });

    // Project card interactions
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Tech tag interactions
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.05)';
            tag.style.transition = 'transform 0.2s ease';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1)';
        });
    });

    
    const createScrollIndicator = () => {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-progress';
        document.body.appendChild(indicator);

        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            indicator.style.width = `${scrollPercent}%`;
        });
    };

    createScrollIndicator();
});
