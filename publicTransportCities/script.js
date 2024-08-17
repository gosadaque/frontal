const optionsLabels = [
    "Papierfahrschein",
    "Wiederaufladbare Karten",
    "Kreditkarte als Tap-on Ticket",
    "Mobile Ticket (App)",
    "Kontaktloses Bezahlen (Smartphone)",
    "Wochen-/Monatskarten und Abonnements",
    "City Cards (Touristenkarten)"
];

function generateHTML(data) {
    const container = document.getElementById('cities-container');
    container.innerHTML = ''; // Vorherigen Inhalt löschen

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

function loadJSON(country) {
    const url = `./data/${country}.json`;

    console.log(`Lade JSON-Datei von: ${url}`); // Debug-Ausgabe

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP-Fehler! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Daten geladen:', data); // Debug-Ausgabe
            generateHTML(data);
        })
        .catch(error => {
            console.error('Fehler beim Laden der JSON-Datei:', error);
        });
}

document.getElementById('country-select').addEventListener('change', function() {
    const selectedCountry = this.value;
    loadJSON(selectedCountry);
});

window.onload = function() {
    loadJSON('deutschland');
};
