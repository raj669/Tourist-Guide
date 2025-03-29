// search-results.js (or <script> tag in search-results.html)

document.addEventListener('DOMContentLoaded', function() {
    // Function to get the value of a query parameter from the URL
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    const searchTerm = getQueryParam('q'); // Get the search term from the URL
    const guideListings = document.querySelector('.guide-listings');
    const searchSummary = document.querySelector('.search-summary p');

    if (searchTerm) { // If a search term exists
        // Perform the search and display results (AJAX request to your backend)
        fetch(`/api/search?q=${searchTerm}`) // Replace with your API endpoint
            .then(response => response.json())
            .then(data => {
                // Clear existing results
                guideListings.innerHTML = '';

                // Update search summary
                searchSummary.textContent = `Showing 1-${data.guides.length} of ${data.total} tour guides for "${searchTerm}"`; // Include search term

                // Generate guide cards
                data.guides.forEach(guide => {
                    const guideCard = document.createElement('div');
                    guideCard.classList.add('guide-card');
                    guideCard.innerHTML = `
                        <div class="guide-image">
                            <img src="${guide.image}" alt="Tour Guide - ${guide.name}">
                        </div>
                        <div class="guide-details">
                            <h3>${guide.name}</h3>
                            <p class="guide-location"><i class="fas fa-map-marker-alt"></i> ${guide.location}</p>
                            <div class="guide-rating">
                                ${generateStars(guide.rating)} (${guide.rating})
                            </div>
                            <p class="guide-description">${guide.description}</p>
                            <a href="profile-${guide.id}.html" class="guide-profile-link">View Profile</a>
                        </div>
                    `;
                    guideListings.appendChild(guideCard);
                });

                // Update pagination (omitted for brevity, but crucial!)
                updatePagination(data.currentPage, data.totalPages);
            })
            .catch(error => console.error('Error:', error));
    } else {
        // No search term provided
        guideListings.innerHTML = '<p>Please enter a search term.</p>';
        searchSummary.textContent = 'No search term provided.';
    }

    // Helper function to get a URL parameter
    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    // Helper function to generate star rating icons
    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const emptyStars = 5 - fullStars;
        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        return stars;
    }

    function updatePagination(currentPage, totalPages) {
      //Logic to handle pagination
    }
});