// Fonction de navigation
function navigateTo(page) {
    window.location.href = page;
}

// Empêcher le double clic sur les liens
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

// Animation d'entrée
window.addEventListener('load', () => {
    document.querySelectorAll('.split-block').forEach((block, index) => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(50px)';
        setTimeout(() => {
            block.style.transition = 'opacity 0.6s, transform 0.6s, flex 0.5s ease';
            block.style.opacity = '1';
            block.style.transform = 'translateY(0)';
        }, index * 200);
    });
});