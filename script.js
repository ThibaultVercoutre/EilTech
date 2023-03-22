function smoothScroll(event) {
    event.preventDefault(); // Empêcher le comportement de défilement par défaut
  
    const targetId = event.currentTarget.getAttribute('href'); // Récupérer l'ID de la cible depuis l'attribut href
    const target = document.querySelector(targetId); // Sélectionner l'élément cible
  
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset; // Récupérer la position de l'élément cible par rapport au document
    const startPosition = window.pageYOffset; // Récupérer la position de défilement actuelle
    const distance = targetPosition - startPosition; // Calculer la distance à parcourir
    const duration = 1500; // Durée de l'animation en ms
  
    let start = null;
  
    // Fonction d'animation
    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1); // Calculer la progression de l'animation
  
      // Appliquer une fonction d'interpolation pour adoucir le défilement
      const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
      const easing = easeInOutQuad(progress);
  
      // Mettre à jour la position de défilement en fonction de la progression et de l'interpolation
      window.scrollTo(0, startPosition + distance * easing);
  
      // Continuer l'animation jusqu'à la fin de la durée
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }
  
    // Démarrer l'animation
    requestAnimationFrame(animation);
}
  
// Sélectionner tous les liens de navigation
const navLinks = document.querySelectorAll('.nav-link');
  
// Ajouter un écouteur d'événements 'click' à chaque lien de navigation
navLinks.forEach((link) => {
  link.addEventListener('click', smoothScroll);
});
  