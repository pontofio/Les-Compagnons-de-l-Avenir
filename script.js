document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. GESTION DU SCROLL (Apparition dynamique) ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150; 

        revealElements.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // --- 2. GESTION DES CARTES INTERACTIVES ---
    const interactiveCards = document.querySelectorAll('.interactive-card');

    interactiveCards.forEach(card => {
        card.addEventListener('click', () => {
            interactiveCards.forEach(c => {
                if (c !== card) {
                    c.classList.remove('active');
                    const hint = c.querySelector('.click-hint');
                    if(hint) hint.textContent = hint.getAttribute('data-original-text') || "Voir les détails +";
                }
            });

            card.classList.toggle('active');

            const hint = card.querySelector('.click-hint');
            if (hint) {
                if (!hint.hasAttribute('data-original-text')) {
                    hint.setAttribute('data-original-text', hint.textContent);
                }
                
                if (card.classList.contains('active')) {
                    hint.textContent = "Masquer -";
                } else {
                    hint.textContent = hint.getAttribute('data-original-text');
                }
            }
        });
    });
});