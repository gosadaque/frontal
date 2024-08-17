// Die Reihenfolge der Optionen
const optionsLabels = [
    "Papierfahrschein",
    "Wiederaufladbare Karten",
    "Kreditkarte als Tap-on Ticket",
    "Mobile Ticket (App)",
    "Kontaktloses Bezahlen (Smartphone)",
    "Wochen-/Monatskarten und Abonnements",
    "City Cards (Touristenkarten)"
];

// Funktion zum Generieren der HTML-Struktur
function generateHTML(data) {
    const container = document.getElementById('cities-container');
    container.innerHTML = ''; // Clear previous content

    data.cities.forEach(city => {
        const cityDiv = document.createElement('div');
        cityDiv.classList.add('city');

        const cityTitle = document.createElement('h2');
        cityTitle.textContent = city.city;
        cityDiv.appendChild(cityTitle);

        const optionsList = document.createElement('ul');
        
        city.options.forEach((option, index) => {
            const optionItem = document.createElement('li');
            
            const labelSpan = document.createElement('span');
            labelSpan.textContent = optionsLabels[index];
            optionItem.appendChild(labelSpan);

            const optionSpan = document.createElement('span');
            optionSpan.textContent = option;
            optionSpan.classList.add(option.toLowerCase() === "ja" ? 'option-yes' : 'option-no');
            optionItem.appendChild(optionSpan);

            optionsList.appendChild(optionItem);
        });

        cityDiv.appendChild(optionsList);
        container.appendChild(cityDiv);
    });
}

// Funktion zum Laden der JSON-Dateien
function loadJSON(country) {
    const url = `./data/${country}.json`;

    fetch(url)
        .then(response => response.json())
        .then(data => generateHTML(data))
        .catch(error => console.error('Error loading JSON:', error));
}

// Event Listener für den Länderauswahl
document.getElementById('country-select').addEventListener('change', function() {
    const selectedCountry = this.value;
    loadJSON(selectedCountry);
});

// Initiale Daten laden (z.B. Deutschland)
window.onload = function() {
    loadJSON('deutschland');
};