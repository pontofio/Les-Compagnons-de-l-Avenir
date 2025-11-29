document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ANIMATION SCROLL ---
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

    // --- 2. GESTION CARTES ACCUEIL (OFFRE) ---
    const interactiveCards = document.querySelectorAll('.interactive-card');
    if(interactiveCards.length > 0) {
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
                    if (!hint.hasAttribute('data-original-text')) hint.setAttribute('data-original-text', hint.textContent);
                    hint.textContent = card.classList.contains('active') ? "Masquer -" : hint.getAttribute('data-original-text');
                }
            });
        });
    }

    // --- 3. SCÉNARIO DE LA MIND MAP ---
    const storyData = {
        'prison': {
            title: "🛑 Le Constat : La Prison",
            text: "<strong>Le Problème :</strong> Aujourd'hui, il y a trop peu de travail en prison. Sans activité et sans formation, le temps d'incarcération est vide.<br><br><strong>La Conséquence :</strong> Une perte de sens et un taux de récidive élevé à la sortie."
        },
        'ressource': {
            title: "⚖️ Le Constat : La Loi",
            text: "<strong>L'Obligation :</strong> La loi impose désormais aux collectivités d'utiliser des matériaux biosourcés et locaux.<br><br><strong>L'Opportunité :</strong> Les mairies ont besoin de mobilier, mais l'offre locale manque."
        },
        'asso': {
            title: "🤝 La Solution : Les Compagnons",
            text: "<strong>Le Trait d'Union :</strong> L'association crée un formation Menuiserie directement DANS la prison.<br><br><strong>L'Action :</strong> Nous transformons le bois local grâce au travail des détenus, qui acquièrent de vraies compétences."
        },
        'public': {
            title: "🏛️ L'Usage : Service Public",
            text: "<strong>Destination :</strong> Le mobilier fabriqué (bancs, tables) équipe les écoles, les parcs et les mairies de l'Agglo.<br><br><strong>Fierté :</strong> Le détenu participe à l'amélioration de la vie locale."
        },
        'cycle': {
            title: "❓ Le Cycle de Vie",
            text: "<strong>Le constat technique :</strong> Après des années d'usage, le meuble est abîmé ou cassé.<br><br>Que fait-on ? On ne jette pas ! Il revient à l'association."
        },
        'reparer': {
            title: "♻️ La Réparation (Boucle)",
            text: "<strong>Seconde Vie :</strong> Le meuble revient à l'atelier. Il est poncé, réparé et remis à neuf par les apprentis.<br><br><strong>Symbole :</strong> 'Réparer l'objet, c'est aussi se réparer soi-même'."
        },
        'transformer': {
            title: "🔥 Fin de Vie (Valorisation)",
            text: "<strong>Zéro Déchet :</strong> Si le meuble n'est plus réparable, le bois est transformé en copeaux pour le chauffage ou le paillage.<br><br>Rien ne se perd."
        },
        'final': {
            title: "🎓 L'Objectif Final : L'Avenir",
            text: "<strong>Le Résultat :</strong> Grâce à ce circuit, le détenu sort avec un formation et une expérience.<br><br><strong>Gagnant-Gagnant :</strong> L'Agglo a ses meubles, l'homme a son avenir. La réinsertion est réussie."
        }
    };

    // --- 4. LOGIQUE INTERACTIVE MIND MAP ---
    const detailBox = document.getElementById('cross-details');
    const titleEl = document.getElementById('cd-title');
    const textEl = document.getElementById('cd-text');

    function revealElement(id) {
        const el = document.getElementById(id);
        if(el) { el.classList.remove('step-hidden'); el.classList.add('step-visible'); }
    }

    const mapNodes = document.querySelectorAll('.map-node, .branch-option');
    if(mapNodes.length > 0) {
        mapNodes.forEach(node => {
            node.addEventListener('click', function() {
                const stepKey = this.getAttribute('data-step');
                if(storyData[stepKey]) {
                    detailBox.classList.remove('hidden-box');
                    detailBox.classList.add('visible-box');
                    titleEl.textContent = storyData[stepKey].title;
                    textEl.innerHTML = storyData[stepKey].text;
                }
                mapNodes.forEach(n => n.classList.remove('active'));
                this.classList.add('active');
                const instruction = this.querySelector('.click-instruction');
                if(instruction) instruction.style.display = 'none';

                const nextStep = this.getAttribute('data-next');
                if (nextStep === 'asso') { revealElement('arrow-1'); setTimeout(() => revealElement('node-asso'), 300); }
                else if (nextStep === 'public') { revealElement('arrow-2'); setTimeout(() => revealElement('node-public'), 300); }
                else if (nextStep === 'cycle') { revealElement('arrow-3'); setTimeout(() => revealElement('node-cycle'), 300); }
                else if (nextStep === 'branches') { setTimeout(() => { document.getElementById('group-branches').classList.remove('step-hidden'); document.getElementById('group-branches').classList.add('step-visible'); }, 200); }
                else if (nextStep === 'final') { revealElement('arrow-4'); setTimeout(() => revealElement('node-final'), 300); }
            });
        });
    }
});