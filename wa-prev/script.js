let result = {
  counts: {
    Alice: 320,
    Bob: 285,
  },
  dayOfWeekCount: [45, 75, 60, 30, 40, 25, 35], // Angenommen: 0 - Sonntag, 6 - Samstag
  hourCount: [
    10, 5, 0, 20, 15, 30, 25, 40, 55, 60, 35, 30, 25, 20, 15, 10, 5, 0, 5, 10,
    15, 20, 25, 30,
  ],
  yearCount: {
    2020: 200,
    2021: 250,
    2022: 155,
  },
  monthCount: [60, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95], // Januar bis Dezember
  wordCount: {
    spezifischesWort: 30,
  },
  emojiCount: {
    '😂': 150,
  },
  mostUsedEmojis: [
    ['😂', 150],
    ['😅', 100],
    ['🤣', 75],
    ['❤️', 50],
    ['👍', 45],
    ['😢', 30],
  ],
  firstSixMessages: [
    'Nachricht 1',
    'Nachricht 2',
    'Nachricht 3',
    'Nachricht 4',
    'Nachricht 5',
    'Nachricht 6',
  ],
};

function draw() {
  var canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // Canvas-Dimensionen
  canvas.width = 3508;
  canvas.height = 4961;
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Vorherige Zeichnungen löschen
  
  const wall = document.getElementById("pinback"); //pinback reinalden
  ctx.drawImage(wall, 0, 0, wall.width, wall.height, 0, 0, 3508, 4961);
  
  const img = document.getElementById("paperback"); //paperback reinalden
  
  //paperback hinterggruende
  ctx.drawImage(img, 0, 0, img.width, img.height/2, 100, 417, 1036, 1036);
  ctx.drawImage(img, 0, 0, img.width, img.height/2, 100+1036+100, 417, 1036+1036+100, 1036);
  
  ctx.drawImage(img, 0, 0, img.width, img.height, 100, 1036+100+417, 1036, img.height/4);
  ctx.drawImage(img, 0, 0, img.width, img.height/2.2, 100+1036+100, 1036+100+417, 1036, img.height/4);
  ctx.drawImage(img, 0, 0, img.width/2, img.height/1.5, 100+1036+100+1036+100, 1036+100+417, 1036, img.height/4);
  
  ctx.drawImage(img, 0, 0, img.width/2, img.height/2, 100, 1036+100+417+100+1036, 1036, img.height/4);
  ctx.drawImage(img, 0, 0, img.width/1.5, img.height/2, 100+1036+100, 1036+100+417+100+1036, 1036, img.height/4);
  ctx.drawImage(img, 0, 0, img.width, img.height/2, 100+1036+100+1036+100, 1036+100+417+100+1036, 1036, img.height/4);
  
  ctx.drawImage(img, 0, 0, img.width, img.height/2, 100, 1036+100+417+100+1036+100+1036, 1036+1036+100, 1036);
  ctx.drawImage(img, 0, 0, img.width/1.5, img.height/1.5, 100+1036+100+1036+100, 1036+100+417+100+1036+100+1036, 1036, img.height/4);
  
  
  // Verteiliung zwischen beiden Nachrichten
  //gesamtbreite zu vergeben 1036-100-100=836 -> fuer den rest nen dreisatz
  ctx.fillStyle = '#000';
  ctx.font = '64px Verdana';
  ctx.fillText(
    "Nachrichten",
    100+100,
    417+100
  );
  let namePositionX = 100+100;
  let namePositionY = 417+225;
  let nameCounterOffset = 0;
  let gesamtnachrichten = 0;
  for (let name in result.counts) {
    ctx.font = 'bold 128px Verdana´';
    ctx.fillText(
      name,
      namePositionX,
      namePositionY + 75 + nameCounterOffset
    );
	gesamtnachrichten = gesamtnachrichten + result.counts[name] 
	
	nameCounterOffset = nameCounterOffset + 400
  }
  nameCounterOffset = 0;
  let prozenti = 0;
  for (let name in result.counts) {
	ctx.fillStyle = '#000';
    ctx.font = 'bold 128px Verdana´';
    ctx.fillRect(namePositionX, namePositionY+100+nameCounterOffset, 836*(result.counts[name]/gesamtnachrichten)*2-100, 200);
	prozenti = (result.counts[name]/gesamtnachrichten).toFixed(2)*100;
	ctx.fillStyle = '#fff';
    ctx.fillText(
      result.counts[name],
      namePositionX+50,
      namePositionY+245+nameCounterOffset
    );
    ctx.font = '64px Verdana';
    ctx.fillText(
      prozenti+"%",
      namePositionX+450,
      namePositionY+245+nameCounterOffset
    );
	nameCounterOffset = nameCounterOffset + 400
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // Kreisdiagramm-Daten
  ctx.fillStyle = '#000';
  ctx.font = '64px Verdana';
  ctx.fillText(
    "Wann schreibt ihr?",
    100+100+1036+100,
    417+100
  );
  let colors = [
    '#b45f06',
    '#e69138',
    '#f6b26b',
    '#f9cb9c',
    '#fce5cd',
    '#ff9900',
    '#783f04',
  ];
  let labels = [
    'Sonntag',
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
  ];
  let data = result.dayOfWeekCount; // Stellen Sie sicher, dass result.dayOfWeekCount die korrekten Daten enthält
  let total = data.reduce((sum, value) => sum + value, 0);

  // Mittelpunkt und Radius für das Kreisdiagramm, das nur die obere Hälfte der Canvas einnimmt
  let centerX = canvas.width - 1700;
  let centerY = canvasHeight / 6+117; // Ein Viertel der Höhe für die obere Hälfte
  let radius = Math.min(canvasWidth, canvasHeight / 2) / 7; // Der Radius ist die Hälfte der kleineren Dimension

  // Kreisdiagramm fuer wochentage zeichnen
  let startAngle = 0;
  data.forEach((value, index) => {
    let sliceAngle = (value / total) * 2 * Math.PI;
    ctx.fillStyle = colors[index];
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fill();
    startAngle += sliceAngle;
  });

  // Legende zeichnen 
  let legendPositionX = canvas.width - 1100;
  let legendPositionY = 525+115;
  let legendSpacing = 110;

  labels.forEach((label, index) => {
    ctx.fillStyle = colors[index];
    ctx.beginPath();
    ctx.arc(
      legendPositionX - 5,
      legendPositionY + (index * legendSpacing - 20),
      20,
      0,
      2 * Math.PI
    );
    ctx.fill();

    ctx.fillStyle = '#000';
    ctx.font = '64px Verdana';
    ctx.fillText(
      label,
      legendPositionX + 25,
      legendPositionY + index * legendSpacing + 5
    );
    ctx.fillText(
      data[index],
      legendPositionX + 425,
      legendPositionY + index * legendSpacing + 5
    );
  });
  
  
  
  
  
  
  //Emoji counter
  let emoji6PositionX = 100+100;
  let emoji6PositionY = 417+225+1036;
  ctx.fillStyle = '#000';
    ctx.font = '64px Verdana';
  ctx.fillText(
    "Emojis",
    100+100,
    417+100+100+1036
  );
  
  
  
  
  
  //Top words counter
  let words6PositionX = 100+100;
  let words6PositionY = 417+225+1036;
  ctx.fillStyle = '#000';
    ctx.font = '64px Verdana';
  ctx.fillText(
    "Top Wörter",
    100+100+1036+100,
    417+100+100+1036
  );
  
  
  
  
  
  
  //Morgens nachrichten counter
  let morningPositionX = 100+100;
  let morningPositionY = 417+225+1036;
  ctx.fillStyle = '#000';
    ctx.font = '64px Verdana';
  ctx.fillText(
    "Morgens",
    100+100+1036+100+1036+100,
    417+100+100+1036
  );
  
  
  
  
  
  //fav word counter
  let favWordPositionX = 100+100;
  let favWordPositionY = 417+225+1036;
  ctx.fillStyle = '#000';
  ctx.font = '64px Verdana';
  ctx.fillText(
    "Ihr habt ",
    100+100,
    417+100+100+1036+100+1036
  );
  ctx.font = 'bold 150px Verdana´';
  ctx.fillText(
    "ich liebe dich",
    100+100,
    417+100+100+1036+100+1036+300
  );
  
  ctx.font = 'bold 128px Verdana´';
  ctx.fillText(
    result.wordCount["spezifischesWort"]+" mal gesagt",
    100+100,
    417+100+100+1036+100+1036+500
  );
  
  
  //Top words counter
  let words5PositionX = 100+100;
  let words5PositionY = 417+225+1036;
  ctx.fillStyle = '#000';
    ctx.font = '64px Verdana';
  ctx.fillText(
    '1. "Hier Satz einfugen"',
    100+100+1036+100,
    417+100+100+1036+100+1036
  );
  
  
  
  
  
  
  //nachmittags nachrichten counter
  let afternoonPositionX = 100+100;
  let afternoonPositionY = 417+225+1036;
  ctx.fillStyle = '#000';
    ctx.font = '64px Verdana';
  ctx.fillText(
    "Nachmittags",
    100+100+1036+100+1036+100,
    417+100+100+1036+100+1036
  );
  
  
  
  
  
  //first Messagio counter
  let firstMessagePositionX = 100+100;
  let firstMessagePositionY = 417+225+1036;
  ctx.fillStyle = '#000';
    ctx.font = '64px Verdana';
  ctx.fillText(
    "Erste Nachrichten",
    100+100,
    417+100+100+1036+100+1036+100+1036
  );
  
  
  
  
  
  
  
  
  //fav emoji counter
  let favEmojiPositionX = 100+100;
  let favEmojiPositionY = 417+225+1036;
  ctx.fillStyle = '#000';
    ctx.font = '64px Verdana';
  ctx.fillText(
    "Emoji Counter",
    100+100+1036+100+1036+100,
    417+100+100+1036+100+1036+100+1036
  );
}

draw();
