document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.nav-menu');
    const menuContainer = document.querySelector('.menu-container');
    const mainMenu = document.querySelector('.main-menu');
    const dots = document.querySelectorAll('.dot-nav .dot');
    const sections = ['#hero', '#stats', '#services', '#contact'].map(id => document.querySelector(id));
    let lettersAnimated = false;

    /* ----------------------------------------
       SCROLLSPY DOTS - VERSION SIMPLIFIÉE
    -----------------------------------------*/
    function updateDots() {
        const viewportCheck = window.innerHeight * 0.33; // Ajuste la précision ICI

        sections.forEach((section, i) => {
            const rect = section.getBoundingClientRect();

            if (rect.top <= viewportCheck && rect.bottom >= viewportCheck) {
                dots.forEach(dot => dot.classList.remove('active'));
                dots[i].classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateDots);
    updateDots(); // Initial


    /* ----------------------------------------
       NAVIGATION AU CLIC SUR LES POINTS
    -----------------------------------------*/
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            sections[i].scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    /* ----------------------------------------
       ANIMATION DES LETTRES
    -----------------------------------------*/
    function animateLetters(element) {
        const text = element.textContent;
        element.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
            span.style.animationDelay = `${i * 0.05}s`;
            element.appendChild(span);
        }
    }


    /* ----------------------------------------
       MENU HAMBURGER
    -----------------------------------------*/
    if (menuIcon && menuContainer) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('active');
            menuContainer.classList.toggle('active');
            
            if (menuContainer.classList.contains('active')) {
                if (!lettersAnimated) {
                    setTimeout(() => {
                        document.querySelectorAll('.list-items a').forEach(link => {
                            animateLetters(link);
                        });
                        lettersAnimated = true;
                    }, 100);
                }
                resetToMainMenu();
            }
        });
    }


    /* ----------------------------------------
       GESTION DES SOUS-MENUS
    -----------------------------------------*/
    const hasSubmenuLinks = document.querySelectorAll('.has-submenu');
    hasSubmenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const submenuId = link.getAttribute('data-submenu');
            openSubmenu(submenuId);
        });
    });

    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            resetToMainMenu();
        });
    });

    function openSubmenu(submenuId) {
        const submenu = document.getElementById(`submenu-${submenuId}`);
        if (submenu) {
            mainMenu.classList.add('slide-left');
            setTimeout(() => {
                submenu.classList.add('active');
            }, 400);
        }
    }

    function resetToMainMenu() {
        const allSubmenus = document.querySelectorAll('.submenu');
        allSubmenus.forEach(sub => {
            sub.classList.remove('active');
        });
        setTimeout(() => {
            mainMenu.classList.remove('slide-left');
        }, 400);
    }


    /* ----------------------------------------
       FERMETURE DU MENU SUR CLIC
    -----------------------------------------*/
    document.querySelectorAll('.menu-link:not(.has-submenu)').forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('active');
            menuContainer.classList.remove('active');
            resetToMainMenu();
        });
    });

    document.querySelectorAll('.submenu-items a').forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('active');
            menuContainer.classList.remove('active');
            resetToMainMenu();
        });
    });


    /* ----------------------------------------
       ANIMATIONS AU SCROLL
    -----------------------------------------*/
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('stat-card')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-card, .zigzag-block').forEach(el => {
        observer.observe(el);
    });


    /* ----------------------------------------
       COMPTEURS CHIFFRÉS
    -----------------------------------------*/
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const numberElement = element.querySelector('.stat-number');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                numberElement.textContent = target;
                clearInterval(timer);
            } else {
                numberElement.textContent = Math.floor(current);
            }
        }, 16);
    }


    /* ----------------------------------------
       SMOOTH SCROLL
    -----------------------------------------*/
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    /* ----------------------------------------
       FAQ ACCORDÉON
    -----------------------------------------*/
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            if (!isActive) faqItem.classList.add('active');
        });
    });

});