const coffeeList = document.getElementById('coffee-list');
const allProductsButton = document.getElementById('all-products');
const availableProductsButton = document.getElementById('available-products');

let allCoffees = [];

fetch('https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        allCoffees = data;
        displayCoffees(allCoffees);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

function displayCoffees(coffees) {
    coffeeList.innerHTML = '';
    coffees.forEach(coffee => {
        const li = document.createElement('li');
        const ratingText = coffee.votes > 0 ? `${coffee.rating} (${coffee.votes} votes)` : '<span class="no-ratings">No Ratings</span>';

        const availabilityText = coffee.available ? '' : '<span class="sold-out">Sold Out</span>';
        const popularText = coffee.popular ? '<span class="popular">Popular</span>' : '';

        const svgIcon = coffee.rating === null || coffee.rating === 0 
            ? '<img src="img/Star.svg" alt="No ratings" class="rating-icon">' 
            : '<img src="img/Star_fill.svg" alt="Ratings available" class="rating-icon">';
        li.innerHTML = `
            <div class="image-container">
                <img src="${coffee.image}" alt="${coffee.title}">
                ${popularText}
            </div>
            <div class="name-price">
                <h2>${coffee.name}</h2>
                <div class="price-box"">
                    <p class="price">${coffee.price}</p>
                </div>
            </div>

            <div class="rating-votes">
                ${svgIcon}
                <p class="rating">${coffee.votes > 0 ? coffee.rating : '<span class="no-ratings">No Ratings</span>'}</p>
                <p class="votes">
                ${coffee.votes > 0 ? `(${coffee.votes} votes)` : ''}</p>
                ${availabilityText}
            </div>
        `;
        coffeeList.appendChild(li);
    });
}

// buttons
allProductsButton.addEventListener('click', () => {
    allProductsButton.classList.add('active');
    availableProductsButton.classList.remove('active');
    displayCoffees(allCoffees);
});

availableProductsButton.addEventListener('click', () => {
    availableProductsButton.classList.add('active');
    allProductsButton.classList.remove('active');
    const availableCoffees = allCoffees.filter(coffee => coffee.available);
    displayCoffees(availableCoffees);
});
