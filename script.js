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
// --- 3. MIND MAP HORIZONTALE INTERACTIVE ---
    
    const rootTrigger = document.getElementById('root-trigger');
    const rootConnector = document.getElementById('root-connector');
    const level1Wrapper = document.getElementById('level-1-wrapper');

    let isRootOpen = false;

    // 1. Clic sur la Racine (Compagnons)
    if(rootTrigger) {
        rootTrigger.addEventListener('click', () => {
            isRootOpen = !isRootOpen;
            
            if(isRootOpen) {
                rootConnector.classList.remove('hidden');
                level1Wrapper.classList.remove('hidden');
            } else {
                rootConnector.classList.add('hidden');
                level1Wrapper.classList.add('hidden');
                // On ferme aussi tous les sous-niveaux pour reset
                closeAllBranches();
            }
        });
    }

    // Fonction globale pour gérer les branches (appelée depuis le HTML onclick)
    window.toggleBranch = function(branchId) {
        const line = document.getElementById(`line-${branchId}`);
        const leaves = document.getElementById(`leaves-${branchId}`);
        // Trouver le noeud parent pour changer sa couleur
        const parentNode = line.previousElementSibling; 

        // Vérifier si c'est déjà ouvert
        const isHidden = leaves.classList.contains('hidden');

        if(isHidden) {
            // Ouvrir
            line.classList.remove('hidden');
            leaves.classList.remove('hidden');
            parentNode.classList.add('active');
        } else {
            // Fermer
            line.classList.add('hidden');
            leaves.classList.add('hidden');
            parentNode.classList.remove('active');
        }
    };

    function closeAllBranches() {
        // Sélectionne toutes les feuilles et lignes et les cache
        document.querySelectorAll('.leaves-column').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.horizontal-small').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.level-1').forEach(el => el.classList.remove('active'));
    }

});