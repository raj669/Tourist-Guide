import { auth, db, onAuthStateChanged, collection, getDocs, query, where, deleteDoc, doc } from "./firebase-config.js";

const userEmailElement = document.getElementById("user-email");
const reviewsContainer = document.getElementById("reviews-container");

onAuthStateChanged(auth, async (user) => {
    if (user) {
        userEmailElement.textContent = user.email;

        let allReviews = [];

        for (let i = 1; i <= 2; i++) { // Adjust range based on attraction count
            const reviewsRef = collection(db, `reviews-${i}`);
            const q = query(reviewsRef, where("user", "==", user.email));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                allReviews.push({ id: doc.id, ...doc.data(), attractionId: i });
            });
        }

        displayReviews(allReviews);
    } else {
        window.location.href = "index.html";
    }
});

function displayReviews(reviews) {
    reviewsContainer.innerHTML = "";
    if (reviews.length === 0) {
        reviewsContainer.innerHTML = "<p>No reviews yet.</p>";
        return;
    }

    reviews.forEach((review) => {
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review");
        reviewElement.innerHTML = `
            <p><strong>Attraction ID:</strong> ${review.attractionId}</p>
            <p><strong>Rating:</strong> ${review.stars} ⭐</p>
            <p><strong>Review:</strong> ${review.text}</p>
            <button class="delete-btn" data-id="${review.id}" data-attraction="${review.attractionId}">🗑 Delete</button>
        `;
        reviewsContainer.appendChild(reviewElement);
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", async (event) => {
            const reviewId = event.target.dataset.id;
            const attractionId = event.target.dataset.attraction;
            await deleteReview(reviewId, attractionId);
        });
    });
}

async function deleteReview(reviewId, attractionId) {
    await deleteDoc(doc(db, `reviews-${attractionId}`, reviewId));
    location.reload(); // Refresh the page to update the list
}
