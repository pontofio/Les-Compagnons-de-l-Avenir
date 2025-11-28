// Attendre que le document soit chargé
document.addEventListener('DOMContentLoaded', () => {
    
    // Animation simple : Apparition des éléments au scroll
    const observerOptions = {
        threshold: 0.2 // Déclenche quand 20% de l'élément est visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Sélectionner les cartes et les étapes
    const elementsToAnimate = document.querySelectorAll('.card, .step, .benefit-item');

    elementsToAnimate.forEach(el => {
        // État initial (caché)
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.6s ease-out";
        
        // Observer l'élément
        observer.observe(el);
    });

    // Smooth scroll pour les ancres (si le CSS scroll-behavior ne suffit pas sur certains navigateurs)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});