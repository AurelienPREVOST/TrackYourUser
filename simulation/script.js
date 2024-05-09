function rejouerInteractions() {
    fetch('interactions.json')
        .then(response => response.json())
        .then(data => {
            // Recherche des dimensions de l'écran dans les données JSON
            // Recuperation de l'image via screenshot du node
            data.forEach(interaction => {
                if (interaction.screenshot) {
                    const imageBase64 = interaction.screenshot;
    
                    // Sélectionnez l'élément avec l'ID "backgroundScreenshot"
                    var imgElement = document.getElementById("backgroundScreenshot");
    
                    // Modifiez la source de l'image avec la base64
                    imgElement.src = imageBase64;
                }
            });

            let originalScreenWidth = 1920; // Valeur par défaut
            let originalScreenHeight = 1080; // Valeur par défaut
            data.forEach(interaction => {
                if (interaction.type === 'screenSize') {
                    originalScreenWidth = interaction.details.screenWidth;
                    originalScreenHeight = interaction.details.screenHeight;
                }
            });

            // Obtention des dimensions de la fenêtre de lecture
            const replayWidth = window.innerWidth;
            const replayHeight = window.innerHeight;

            // Utilisation des dimensions de la fenêtre de lecture pour ajuster les interactions
            data.forEach((interaction, index) => {
                setTimeout(() => {
                    if (interaction.type) {
                        switch (interaction.type) {
                            case 'mousemove':
                                // Ajuster les coordonnées de la souris en fonction de la taille de la fenêtre de lecture
                                const adjustedX = (replayWidth * interaction.details.x) / originalScreenWidth;
                                const adjustedY = (replayHeight * interaction.details.y) / originalScreenHeight;
                                deplacerCurseur(adjustedX, adjustedY);
                                break;
                            case 'click':
                                // Ajuster les coordonnées du clic en fonction de la taille de la fenêtre de lecture (si nécessaire)
                                const adjustedClickX = (replayWidth * interaction.details.x) / originalScreenWidth;
                                const adjustedClickY = (replayHeight * interaction.details.y) / originalScreenHeight;
                                simulerClic(adjustedClickX, adjustedClickY);
                                break;
                            case 'keydown':
                                simulerKeyPress(interaction.details.key);
                                break;
                            case 'scroll':
                                // Simuler le défilement de la page
                                console.log("scroll event received")
                                window.scrollTo(interaction.details.x, interaction.details.y);
                                break;
                            case 'screenSize':
                                console.log("fin du json, screenSize atteint")
                                break
                            default:
                                console.error('Type d\'interaction inconnu:', interaction.type);
                        }
                    }
                }, index * 25); // Délai de 25 millisecondes (0.025 seconde) entre chaque interaction
            });
        })
        .catch(error => console.error('Erreur lors de la lecture du fichier:', error));
}


// Fonction pour simuler le déplacement du curseur de la souris
function deplacerCurseur(x, y) {
    const cursor = document.getElementById('cursor');
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
}

// Fonction pour simuler un clic de souris avec un effet d'onde
function simulerClic(x, y) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = (x - 25) + 'px';
    ripple.style.top = (y - 25) + 'px';
    document.body.appendChild(ripple);
    setTimeout(() => {
        document.body.removeChild(ripple);
    }, 500); // Supprimer l'effet d'onde après 0.5 seconde
}

// Fonction pour simuler une pression de touche
function simulerKeyPress(key) {
    // Passage en majuscule
    const upperCaseKey = key.toUpperCase();

    // Recherche de l'élément correspondant à la touche pressée
    const keyElement = document.querySelector(`.key[data-key="${upperCaseKey}"]`);
    
    console.log("KEY ELEMENT PRESSED =>", keyElement)
    // Vérification si l'élément a été trouvé
    if (keyElement) {
        // Ajout de la classe pour mettre en surbrillance la touche pressée
        keyElement.classList.add('highlight');

        // Suppression de la classe après 250 ms
        setTimeout(() => {
            keyElement.classList.remove('highlight');
        }, 250);
    }
}


// Fonction pour écouter les touches du clavier
document.addEventListener('keydown', function(event) {
    const key = event.key.toUpperCase();
    const keyboardKey = document.querySelector(`#fake-keyboard .key[data-key="${key}"]`);
    if (keyboardKey) {
        keyboardKey.classList.add('active');
        setTimeout(() => {
            keyboardKey.classList.remove('active');
        }, 200); // Retirer la classe active après 0.2 seconde pour l'effet de surbrillance
    }
});
// Appeler la fonction pour rejouer les interactions lors du chargement de la page
window.addEventListener('load', rejouerInteractions);
