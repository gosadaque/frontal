function processFile() {
    const fileInput = document.getElementById('fileInput');
    if (!fileInput.files.length) {
        alert('Bitte wählen Sie eine Datei aus.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        const results = analyzeChat(content);
        displayResults(results);
    };

    reader.readAsText(file);
}

function analyzeChat(content) {
    const lines = content.split('\n');
    const counts = {};
    let dayOfWeekCount = Array(7).fill(0); // 0: Sonntag, 6: Samstag
    let hourCount = Array(24).fill(0);
    let yearCount = {};
    let monthCount = Array(12).fill(0);
    let wordCount = {};
    let emojiCount = {};
    const specificWord = "spezifischesWort"; // Beispiel
    const specificEmoji = "😂"; // Beispiel
    let emojisUsed = {};
    let firstSixMessages = lines.slice(0, 6);

    lines.forEach((line, index) => {
        const dateMatch = line.match(/\[(\d{2})\.(\d{2})\.(\d{2}), (\d{2}):(\d{2}):\d{2}\]/);
        if (dateMatch) {
            const date = new Date(`20${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}T${dateMatch[4]}:${dateMatch[5]}:00`);
            const dayOfWeek = date.getDay();
            const hour = date.getHours();
            const year = date.getFullYear();
            const month = date.getMonth(); // 0-based index

            dayOfWeekCount[dayOfWeek]++;
            hourCount[hour]++;
            yearCount[year] = (yearCount[year] || 0) + 1;
            monthCount[month]++;
			
			// Teilnehmername und Nachrichtenzählung
            const nameMatch = line.match(/\]\s([^:]+):/);
            if (nameMatch) {
                const name = nameMatch[1];
                counts[name] = (counts[name] || 0) + 1;
            }
			
            // Wort- und Emoji-Zählung innerhalb der Nachricht
            const messageContent = line.split(']: ')[1];
            if (messageContent) {
                const words = messageContent.split(/\s+/);
                words.forEach(word => {
                    if (word === specificWord) {
                        wordCount[specificWord] = (wordCount[specificWord] || 0) + 1;
                    }
                    // Emoji-Erkennung und Zählung
                    Array.from(word).forEach(char => {
                        if (char === specificEmoji) {
                            emojiCount[specificEmoji] = (emojiCount[specificEmoji] || 0) + 1;
                        }
                        if (char.match(/[\u{1F600}-\u{1F64F}]/u)) { // Einfache Emoji-Erkennung
                            emojisUsed[char] = (emojisUsed[char] || 0) + 1;
                        }
                    });
                });
            }
        }
    });

    // Die 6 meistbenutzten Emojis ermitteln
    const mostUsedEmojis = Object.entries(emojisUsed).sort((a, b) => b[1] - a[1]).slice(0, 6);


    // Ergebnisse zurückgeben
    return {
        counts,
        dayOfWeekCount,
        hourCount,
        yearCount,
        monthCount,
        wordCount,
        emojiCount,
        mostUsedEmojis,
        firstSixMessages
    };
}



function displayResults(analysisResults) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Vorherige Ergebnisse löschen

    // Analyse nach Wochentag
    if (document.getElementById('analyzeDaysOfWeek').checked) {
        const daysOfWeek = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
        const dayOfWeekResults = analysisResults.dayOfWeekCount.map((count, index) => `${daysOfWeek[index]}: ${count}`).join('<br>');
        appendResult('Analyse nach Wochentag:', dayOfWeekResults);
    }

    // Analyse nach Stunde
    if (document.getElementById('analyzeHours').checked) {
        const hourResults = analysisResults.hourCount.map((count, index) => `${index} Uhr: ${count}`).join('<br>');
        appendResult('Analyse nach Stunde:', hourResults);
    }

    // Analyse nach Jahr
    if (document.getElementById('analyzeYears').checked) {
        const yearResults = Object.entries(analysisResults.yearCount).map(([year, count]) => `${year}: ${count}`).join('<br>');
        appendResult('Analyse nach Jahr:', yearResults);
    }

    // Analyse nach Monat
    if (document.getElementById('analyzeMonths').checked) {
        const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
        const monthResults = analysisResults.monthCount.map((count, index) => `${months[index]}: ${count}`).join('<br>');
        appendResult('Analyse nach Monat:', monthResults);
    }

    // Beispiel für die Anpassung der Ausgabe für spezifisches Wort und Emoji

	// Stellen Sie sicher, dass wordCount und emojiCount richtig initialisiert wurden
	const word = document.getElementById('specificWord').value;
	const emoji = document.getElementById('specificEmoji').value;
	const wordFrequency = analysisResults.wordCount[word] || 0;
	const emojiFrequency = analysisResults.emojiCount[emoji] || 0;

	appendResult(`Häufigkeit des Wortes "${word}":`, wordFrequency.toString());
	appendResult(`Häufigkeit des Emojis "${emoji}":`, emojiFrequency.toString());

	// Für die 6 meistbenutzten Emojis
	if (analysisResults.mostUsedEmojis.length > 0) {
		const mostUsedEmojisContent = analysisResults.mostUsedEmojis.map(([emoji, count]) => `${emoji}: ${count}`).join('<br>');
		appendResult('Die 6 meistbenutzten Emojis:', mostUsedEmojisContent);
	} else {
		appendResult('Die 6 meistbenutzten Emojis:', 'Keine Daten verfügbar');
	}
	// Teilnehmernamen und Anzahl der Nachrichten anzeigen
    const participantResults = Object.entries(analysisResults.counts).map(([name, count]) => `${name}: ${count} Nachricht(en)`).join('<br>');
    appendResult('Chat-Teilnehmer und ihre Nachrichtenanzahl:', participantResults);


    // Erste 6 Nachrichten anzeigen
    if (document.getElementById('showFirstSixMessages').checked) {
        const firstSixMessages = analysisResults.firstSixMessages.join('<br>');
        appendResult('Erste 6 Nachrichten:', firstSixMessages);
    }
	
	const daysOfWeek = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
	const dayColors = ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#4BC0C0', '#FF9F40', '#B4B8AB'];

	// Nachdem die Analyseergebnisse vorliegen
	drawPieChart(analysisResults.dayOfWeekCount, daysOfWeek, dayColors, 'chatAnalysisCanvas');


    // Hilfsfunktion zum Anhängen von Ergebnissen
    function appendResult(title, content) {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
        resultsDiv.appendChild(div);
    }
}


function drawPieChart(data, labels, colors, canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Vorherige Zeichnungen löschen

    let total = data.reduce((sum, value) => sum + value, 0);
    let startAngle = 0;

    data.forEach((value, index) => {
        let sliceAngle = (value / total) * 2 * Math.PI;
        ctx.fillStyle = colors[index];
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();

        startAngle += sliceAngle;

        // Optional: Text für Labels hinzufügen
        if (value > 0) { // Nur Label für tatsächliche Werte hinzufügen
            ctx.fillStyle = '#fff';
            ctx.font = '16px Arial';
            let text = labels[index] + ` (${value})`;
            let textX = canvas.width / 2 + Math.cos(startAngle - sliceAngle / 2) * (canvas.height / 4);
            let textY = canvas.height / 2 + Math.sin(startAngle - sliceAngle / 2) * (canvas.height / 4);
            ctx.fillText(text, textX, textY);
        }
    });
}
