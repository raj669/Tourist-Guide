

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const resultsContainer = document.querySelector('.results-container');
    let map;
    let markers = []; 


    function initMap(lat, lng) {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: lat, lng: lng}, 
            zoom: 10
        });
    }

    
    initMap(27.7172, 85.3240);

   
    function addMarker(lat, lng, title) {
        const marker = new google.maps.Marker({
            position: {lat: lat, lng: lng},
            map: map,
            title: title
        });
        markers.push(marker); 
    }

  
    function clearMarkers() {
        markers.forEach(marker => {
            marker.setMap(null); 
        });
        markers = []; 
    }

    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();

        

        const searchResults = [
            { name: "John Doe", description: "Kathmandu Historical Expert", image: "guide1.jpg", lat: 27.7172, lng: 85.3240 }, //Kathmandu
            { name: "Jane Smith", description: "Pokhara Nature Tours", image: "guide2.jpg", lat: 28.2380, lng: 83.9956 }, //Pokhara
        ];

        resultsContainer.innerHTML = '';
        clearMarkers();

        const filteredResults = searchResults.filter(guide =>
            guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            guide.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filteredResults.length > 0) {
            let totalLat = 0;
            let totalLng = 0;

            filteredResults.forEach(guide => {
                const guideCard = document.createElement('div');
                guideCard.classList.add('guide-card');

                guideCard.innerHTML = `
                    <img src="${guide.image}" alt="${guide.name}">
                    <h4>${guide.name}</h4>
                    <p>${guide.description}</p>
                    <a href="#" class="view-profile">View Profile</a>
                `;

                resultsContainer.appendChild(guideCard);
                addMarker(guide.lat, guide.lng, guide.name);
                totalLat += guide.lat;
                totalLng += guide.lng;
            });

            let avgLat = totalLat/filteredResults.length || 27.7172;
            let avgLng = totalLng/filteredResults.length || 85.3240;
            map.setCenter({lat: avgLat, lng: avgLng});

        } else {
            resultsContainer.innerHTML = '<p>No results found.</p>';
        }
    });
});