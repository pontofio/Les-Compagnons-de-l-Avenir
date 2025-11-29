# 🔨 Les Compagnons de l'Avenir

> **Le mobilier urbain de demain : produits biosourcés, parcours retrouvés.**

Ce projet a été développé dans le cadre du **Hackathon EuraBIOECONOMY 2025** (Beauvais). Il s'agit d'une vitrine numérique présentant une initiative de réinsertion sociale et écologique au sein du Centre Pénitentiaire de Beauvais.

## 📖 À propos du projet

**Les Compagnons de l'Avenir** est une réponse double aux enjeux actuels :
1.  **Enjeu Écologique :** Fournir aux collectivités du mobilier urbain biosourcé, fabriqué localement (Beauvaisis) en circuit court.
2.  **Enjeu Social :** Offrir une formation qualifiante et un travail porteur de sens aux détenus pour préparer leur sortie et éviter la récidive.

Le site web sert de plateforme de présentation pour convaincre les mairies, les écoles et les partenaires de l'impact de ce modèle.

## ✨ Fonctionnalités du site

Le site est une "Landing Page" interactive conçue pour raconter une histoire (Storytelling) :

* **Design Immersif :** Effet Parallax avec un fond flouté ("prison.png") qui reste fixe tandis que le contenu défile, symbolisant la transparence et l'ouverture vers l'extérieur.
* **Carte Interactive des Flux (The Cross Flow Map) :** Une expérience utilisateur unique (développée en JS) qui permet de suivre parallèlement :
    * Le flux **Matière** (du bois brut au meuble fini/recyclé).
    * Le flux **Humain** (de l'incarcération à la réinsertion).
* **Animations au défilement :** Les sections apparaissent progressivement (`revealOnScroll`) pour dynamiser la lecture.
* **Cartes Détails :** Section "Notre Offre" avec des cartes interactives qui se déplient pour afficher les spécificités techniques (Normes, Sécurité).

## 🛠️ Stack Technique

Le projet est réalisé sans framework lourd pour garantir légèreté et performance, en utilisant les standards du web :

* **HTML5 :** Structure sémantique.
* **CSS3 :**
    * Mise en page avec **Grid** et **Flexbox**.
    * Animations CSS (`@keyframes`, transitions).
    * Effet de verre (Glassmorphism) et flous.
* **JavaScript (Vanilla) :**
    * Gestion du DOM.
    * Logique de déroulement conditionnel (Step-by-step) pour le schéma des flux.

## 📂 Structure des fichiers

.
├── images/
│   └── prison.png       # Image de fond principale
├── index.html           # Structure de la page
├── script.js            # Logique des animations et de la carte interactive
├── style.css            # Feuilles de style (Design system, responsive)
└── README.md            # Documentation

## 🚀 Comment lancer le projet

Aucune installation (npm, node, etc.) n'est nécessaire.

1.  Téléchargez ou clonez le dossier du projet.
2.  Ouvrez simplement le fichier `index.html` dans votre navigateur web préféré (Chrome, Firefox, Edge...).

## 🧩 Détails de l'implémentation JS

Le script `script.js` gère principalement deux comportements :

1.  **Le Scroll Reveal :** Utilise `getBoundingClientRect` pour détecter quand une section entre dans la fenêtre et lui ajoute la classe `.visible`.
2.  **L'Arbre de Décision :** Un système d'objets (`crossData`) stocke les textes descriptifs pour chaque étape (Prison, Atelier, Usage, etc.). Lorsqu'un utilisateur clique sur une étape, le script :
      * Met à jour les détails affichés.
      * Révèle dynamiquement l'étape suivante (flèches et nœuds) pour guider l'œil de l'utilisateur.

## 👥 Équipe & Contexte

Projet réalisé pour le **Hackathon EuraBIOECONOMY 2025**.

  * **Thématique :** Comment augmenter l'usage de produits biosourcés en collectivité ?
  * **Partenaires évoqués :** ITII Picardie, UniLaSalle, Centre Pénitentiaire de Beauvais.


*© 2025 - Les Compagnons de l'Avenir*