/**
 * Tableau pour stocker les interactions.
 * @type {Object[]}
 */
// Tableau pour stocker les interactions
let interactions = [];

/**
 * Largeur de l'écran.
 * @type {number}
 */
const screenWidth = window.innerWidth;

/**
 * Hauteur de l'écran.
 * @type {number}
 */
const screenHeight = window.innerHeight;

/**
 * URL de la page actuelle.
 * @type {string}
 */
let currentPageURL = window.location.href;


/**
 * Enregistre une interaction.
 * @param {string} type - Le type d'interaction.
 * @param {Object} details - Les détails de l'interaction.
 */
function enregistrerInteraction(type, details) {
    // Ajouter l'URL de la page actuelle uniquement si elle a changé depuis la dernière interaction enregistrée
    if (window.location.href !== currentPageURL) {
        currentPageURL = window.location.href;
        interactions.push({ type: type, details: details, pageURL: currentPageURL });
    } else {
        interactions.push({ type: type, details: details });
    }
}


/**
 * Détermine le type de périphérique.
 * @returns {string} - Le type de périphérique ('mobile' ou 'desktop').
 */
function detectDevice() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return 'mobile';
    } else {
        return 'desktop';
    }
}


/**
 * Réexécute les interactions enregistrées.
 */
function rejouerInteractions() {
    interactions.forEach(function(interaction) {
        switch (interaction.type) {
            case 'mousemove':
                // Code pour déplacer la souris
                break;
            case 'click':
                // Code pour simuler un clic de souris
                break;
            case 'scroll':
                // Code pour simuler le scrolling de la molette
                break;
            case 'keydown':
                // Code pour simuler une touche du clavier
                break;
            default:
                console.error('Type d\'interaction inconnu:', interaction.type);
        }
    });
}


/**
 * Sauvegarde les interactions dans un fichier.
 */
function sauvegarderInteractions() {
    // Ajouter la largeur et la hauteur de l'écran aux détails des interactions
    interactions.push({ type: 'screenSize', details: { screenWidth: window.innerWidth, screenHeight: window.innerHeight } });

    const interactionsJSON = JSON.stringify(interactions);
    const blob = new Blob([interactionsJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'interactions.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}



/**
 * Prend une capture d'écran de l'élément body de la page.
 * @returns {Promise<Object>} - Une promesse résolvant avec l'image base64 de la capture d'écran.
 */
function takeNodeScreenshot() {
    // Retourner une promesse qui résout avec l'image base64
    return new Promise((resolve, reject) => {
        html2canvas(document.body, { scale: 0.25 }).then(canvas => { //0.25 pour la qualité d'image
            // Convertir le canvas en une image base64
            const imageDataURL = canvas.toDataURL();
            // Résoudre la promesse avec l'image base64
            resolve({ screenshot: imageDataURL });
        });
    });
}



/**
 * Fonction à exécuter lorsque la page HTML est chargée.
 */
document.addEventListener('DOMContentLoaded', async function() {
    // Insérer l'URL sur laquelle nous sommes :
    interactions.push(await takeNodeScreenshot());

    // Ajouter un écouteur d'événement pour les déplacements de la souris
    document.addEventListener('mousemove', function(event) {
        enregistrerInteraction('mousemove', { x: event.clientX, y: event.clientY });
    });

    // Ajouter un écouteur d'événement pour les clics de souris
    document.addEventListener('click', function(event) {
        enregistrerInteraction('click', { x: event.clientX, y: event.clientY });
    });

    // Ajouter un écouteur d'événement pour les touches du clavier
    document.addEventListener('keydown', function(event) {
        enregistrerInteraction('keydown', { key: event.key });
    });

    // Ajouter un écouteur d'événement pour les mouvements de la molette de défilement
    document.addEventListener('wheel', function(event) {
        enregistrerInteraction('scroll', { deltaX: event.deltaX, deltaY: event.deltaY });
    });

    // Détecter le type de périphérique au chargement de la page
    const deviceType = detectDevice();
    console.log('Type de périphérique détecté :', deviceType);
    
    // Ajouter un bouton pour sauvegarder les interactions dans un fichier
    const button = document.createElement('button');
    button.textContent = 'Save interactions';
    button.addEventListener('click', sauvegarderInteractions);
    document.body.appendChild(button);

    // Ajouter un écouteur d'événement pour détecter les changements d'URL
    window.addEventListener('hashchange', function() {
        currentPageURL = window.location.href;
    });
});

