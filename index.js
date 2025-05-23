document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.add('theme-transition');
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
        
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 500);
    });
    
    const createWelcomeOverlay = () => {
        try {
            const isBlogPage = window.location.pathname.includes('blog.html');
            
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            
            const isDarkMode = !document.body.classList.contains('light-mode');
            const bgColor = isDarkMode ? 'rgba(17, 38, 38, 0.97)' : 'rgba(249, 249, 249, 0.97)';
            const textColor = isDarkMode ? '#F0F0F0' : '#0F172A';
            const borderColor = isDarkMode ? 'rgba(157, 60, 60, 0.3)' : 'rgba(30, 58, 138, 0.3)';
            const shadowColor = isDarkMode ? 'rgba(157, 60, 60, 0.2)' : 'rgba(30, 58, 138, 0.2)';
            
            overlay.style.backgroundColor = bgColor;
            overlay.style.zIndex = '9999';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';

            const welcomeContainer = document.createElement('div');
            welcomeContainer.style.color = textColor;
            welcomeContainer.style.fontSize = '2.5rem';
            welcomeContainer.style.fontFamily = 'Inter, sans-serif';
            welcomeContainer.style.padding = '2rem';
            welcomeContainer.style.borderRadius = '12px';
            welcomeContainer.style.border = `1px solid ${borderColor}`;
            welcomeContainer.style.background = bgColor;
            welcomeContainer.style.boxShadow = `0 4px 20px ${shadowColor}`;
            welcomeContainer.style.fontStyle = 'italic';

            overlay.appendChild(welcomeContainer);
            document.body.appendChild(overlay);

            const text = isBlogPage ? 'Happy Reading!' : 'Welcome!';
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
                            if (overlay && overlay.parentNode) {
                                overlay.remove();
                            }
                        }, 800);
                    }, 1000);
                }
            }

            setTimeout(typeWriter, 500);
            
            setTimeout(() => {
                if (overlay && overlay.parentNode) {
                    overlay.remove();
                }
            }, 5000);
        } catch (error) {
            console.error('Error creating welcome overlay:', error);
        }
    };

    createWelcomeOverlay();
    
    const createScrollIndicator = () => {
        const indicator = document.querySelector('.scroll-progress');
        if (!indicator) return;
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            indicator.style.width = `${scrollPercent}%`;
        });
    };
    
    createScrollIndicator();
    
    const scrollToTop = document.querySelector('.scroll-to-top');
    if (scrollToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTop.classList.add('visible');
            } else {
                scrollToTop.classList.remove('visible');
            }
        });
        
        scrollToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.top-nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileNavToggle && navLinks) {
        mobileNavToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            const navIcon = mobileNavToggle.querySelector('i');
            if (navIcon) {
                if (navLinks.classList.contains('active')) {
                    navIcon.classList.replace('fa-bars', 'fa-times');
                } else {
                    navIcon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const navIcon = mobileNavToggle.querySelector('i');
                if (navIcon && navIcon.classList.contains('fa-times')) {
                    navIcon.classList.replace('fa-times', 'fa-bars');
                }
            });
        });
    }
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section-container').forEach(section => {
        sectionObserver.observe(section);
    });
    
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = '';
        });
    });
});
