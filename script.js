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
// --- LOGIQUE DE DÉROULEMENT PROGRESSIF ---

    const crossData = {
        'prison': {
            title: "1. Le Point de Départ Humain",
            matter: "Flux Matière : En attente. L'atelier est dimensionné pour recevoir le bois.",
            human: "Arrivée du détenu. Souvent sans qualification. Le projet offre un cadre structurant immédiat."
        },
        'ressource': {
            title: "1. La Ressource Locale",
            matter: "Bois biosourcé (Forêt de Chantilly) ou gisement de vieux mobilier. Circuit ultra-court.",
            human: "Lien avec l'extérieur. Le détenu travaille une matière noble et locale."
        },
        'atelier': {
            title: "2. L'Atelier (Le Cœur)",
            matter: "<strong>Fabrication :</strong> Transformation du bois en mobilier urbain (Bancs, Tables).",
            human: "<strong>Formation :</strong> Apprentissage technique (Menuiserie) et savoir-être pro."
        },
        'usage': {
            title: "3. L'Usage Citoyen",
            matter: "Installation en ville : Écoles, Parcs. Mobilier durable et robuste.",
            human: "Valorisation sociale. 'J'ai construit ce banc pour l'école de mon fils'."
        },
        'decision': {
            title: "4. Le Temps du Choix",
            matter: "Le mobilier est abîmé ? Diagnostic technique : réparable ou non ?",
            human: "Apprentissage de l'analyse. Ne pas jeter par réflexe, mais réfléchir."
        },
        'reparation': {
            title: "5A. La Réparation (Boucle)",
            matter: "Retour à l'atelier -> Remise à neuf -> Repart pour 10 ans.",
            human: "Compétence 'Prendre soin'. Réparer l'objet, c'est symboliquement se réparer soi-même."
        },
        'copeaux': {
            title: "5B. La Fin de Vie (Zéro Déchet)",
            matter: "Bois trop abîmé -> Broyage -> Paillage/Chauffage.",
            human: "Accepter la fin d'un cycle pour avancer."
        },
        'sortie': {
            title: "6. La Sortie (L'Avenir)",
            matter: "Ville équipée durablement, économie circulaire bouclée.",
            human: "<strong>Objectif Zéro Récidive :</strong> Sortie avec un diplôme et un métier en main."
        }
    };

    const detailBox = document.getElementById('cross-details');
    const titleEl = document.getElementById('cd-title');
    const matterEl = document.getElementById('cd-matter');
    const humanEl = document.getElementById('cd-human');

    // Fonction pour révéler un élément par son ID
    function revealElement(id) {
        const el = document.getElementById(id);
        if(el) {
            el.classList.remove('step-hidden');
            el.classList.add('step-visible');
        }
    }

    // Gestion du clic sur les nœuds
    document.querySelectorAll('.map-node, .branch-up, .branch-down').forEach(node => {
        node.addEventListener('click', function() {
            
            // 1. Afficher les détails (Boite du bas)
            const key = this.getAttribute('data-step');
            if(crossData[key]) {
                detailBox.classList.remove('hidden-box');
                detailBox.classList.add('visible-box');
                
                titleEl.textContent = crossData[key].title;
                matterEl.innerHTML = crossData[key].matter;
                humanEl.innerHTML = crossData[key].human;
            }

            // 2. Gestion Active (Couleur)
            document.querySelectorAll('.map-node, .branch-up, .branch-down').forEach(n => n.classList.remove('active'));
            this.classList.add('active');

            // 3. Supprimer l'instruction de clic si présente
            const instruction = this.querySelector('.click-instruction');
            if(instruction) instruction.style.display = 'none';

            // 4. LOGIQUE DE RÉVÉLATION (CHAÎNE)
            const nextStep = this.getAttribute('data-next');
            
            if (nextStep === 'atelier') {
                revealElement('arrow-to-atelier-v'); // Flèche vert
                revealElement('arrow-to-atelier-h'); // Flèche horiz
                setTimeout(() => revealElement('node-atelier'), 200);
            }
            else if (nextStep === 'usage') {
                revealElement('arrow-to-usage');
                setTimeout(() => revealElement('node-usage'), 200);
            }
            else if (nextStep === 'decision') {
                revealElement('arrow-to-decision');
                setTimeout(() => {
                    revealElement('group-decision'); // Le conteneur du losange
                    revealElement('node-decision');
                }, 200);
            }
            else if (nextStep === 'branches') {
                revealElement('group-branches'); // Les deux options
                // On révèle les flèches des branches
                setTimeout(() => {
                    document.querySelector('.decision-branches').classList.remove('step-hidden');
                    document.querySelector('.decision-branches').classList.add('step-visible');
                }, 100);
            }
            else if (nextStep === 'sortie') {
                revealElement('arrow-to-sortie');
                setTimeout(() => revealElement('node-sortie'), 200);
            }

        });
    });

});