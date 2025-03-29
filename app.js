document.getElementById("search-btn").addEventListener("click", function() {
    const searchValue = document.getElementById("search").value;
    if (searchValue) {
        window.location.href = `search.html?query=${searchValue}`;
    }
});

// Handle search results
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");
    
    if (query) {
        document.getElementById("search-input").value = query;
        fetchGuides(query);
    }
});

function fetchGuides(query) {
    // Mock Data (Replace with Firebase fetch)
    const guides = [
        { name: "John Doe", city: "Paris", rating: 4.8, image: "assets/john.jpg" },
        { name: "Maria Rossi", city: "Rome", rating: 4.7, image: "assets/maria.jpg" }
    ];

    const resultsContainer = document.getElementById("guide-results");
    resultsContainer.innerHTML = "";

    const filteredGuides = guides.filter(guide => guide.city.toLowerCase().includes(query.toLowerCase()));

    filteredGuides.forEach(guide => {
        const guideElement = document.createElement("div");
        guideElement.innerHTML = `
            <img src="${guide.image}" alt="${guide.name}">
            <p><strong>${guide.name}</strong></p>
            <p>${guide.city} - ⭐ ${guide.rating}</p>
            <a href="guide.html?name=${guide.name}">View Profile</a>
        `;
        resultsContainer.appendChild(guideElement);
    });
}
