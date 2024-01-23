document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
	
	/*
	L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}.jpg', {
        attribution: 'Map tiles @ Stamen Design, CC BY 3.0. © OpenStreetMap contributors',
    }).addTo(map); 
	*/

    map.on('click', function(e) {
        console.log("Koordinaten des Klicks: ", e.latlng);
    });
	
    fetch('data.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            data.locations.forEach(function(location) {
                var marker = L.marker([location.lat, location.lng]).addTo(map);
                marker.on('click', function() {
                    showDetails(location);
                });
            });
        });

    function showDetails(location) {
        var detailsDiv = document.getElementById('details');
        detailsDiv.innerHTML = '<h2>' + location.name + '</h2>';
        location.images.forEach(function(image) {
            detailsDiv.innerHTML += '<img src="' + image + '" style="width:100%;">';
        });
        detailsDiv.innerHTML += '<p>' + location.description + '</p>';
    }

});
