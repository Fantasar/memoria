document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.nav-menu');
    const menuContainer = document.querySelector('.menu-container');
    const mainMenu = document.querySelector('.main-menu');
    let lettersAnimated = false;

    // Fonction pour animer les lettres
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

    // Toggle menu hamburger
    if (menuIcon && menuContainer) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('active');
            menuContainer.classList.toggle('active');
            
            if (menuContainer.classList.contains('active')) {
                // Animer les lettres seulement la première fois que le menu s'ouvre
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

    // Gestion des sous-menus
    const hasSubmenuLinks = document.querySelectorAll('.has-submenu');
    hasSubmenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const submenuId = link.getAttribute('data-submenu');
            openSubmenu(submenuId);
        });
    });

    // Boutons retour
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

    // Fermeture du menu sur clic de lien
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

    // Animations au scroll
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

    // Animation des compteurs
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

    // Smooth scroll
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

    // FAQ Accordéon
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Fermer tous les autres items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Ouvrir celui cliqué si il n'était pas déjà ouvert
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});