const menuData = {
    cakes: [
        { name: "Vanilla Cake", price: 650, img: "vanilla_cake.jpg" },
        { name: "Chocolate Cake", price: 1100, img: "chocolate_cake.jpg" },
        { name: "Butterscotch Cake", price: 900, img: "butterscotch_cake.jpg" },
        { name: "Caramel Cake", price: 1400, img: "caramel_cake.jpg" },
        { name: "Pistachio Cake", price: 1050, img: "pistachio_cake.jpg" },
        { name: "Choco Truffle Cake", price: 1400, img: "choco_truffle_cake.jpg" },
        { name: "Blackcurrant Cake", price: 1300, img: "blackcurrant_cake.jpg" },
        { name: "Blueberry Cake", price: 1300, img: "blueberry_cake.jpg" },
        { name: "Red Velvet Cake", price: 1200, img: "red_velvet_cake.jpg" },
        { name: "Rainbow Cake", price: 2000, img: "rainbow_cake.jpg" },
        { name: "Rasamalai Cake", price: 1700, img: "rasamalai_cake.jpg" },
        { name: "Ferrero Rocher Cake", price: 1600, img: "ferrero_rocher_cake.jpg" },
        { name: "Biscoff Cake", price: 1800, img: "biscoff_cake.jpg" },
        { name: "Black Forest Cake", price: 950, img: "black_forest_cake.jpg" },
        { name: "White Forest Cake", price: 950, img: "white_forest_cake.jpg" },
        { name: "Mango Cake", price: 1200, img: "mango_cake.jpg" },
        { name: "Strawberry Cake", price: 1200, img: "strawberry_cake.jpg" }
    ],
    cookies: [
        { name: "Chocolate Chip Cookie", price: 50, img: "chocolate_chip_cookie.jpg" },
        { name: "Oatmeal Cookie", price: 40, img: "oatmeal_cookie.jpg" },
        { name: "Butter Cookie", price: 60, img: "butter_cookie.jpg" },
        { name: "Peanut Butter Cookie", price: 70, img: "peanut_butter_cookie.jpg" },
        { name: "Sugar Cookie", price: 50, img: "sugar_cookie.jpg" },
        { name: "Molasses Cookie", price: 65, img: "molasses_cookie.jpg" },
        { name: "Coconut Macaroon", price: 80, img: "coconut_macaroon.jpg" },
        { name: "Shortbread Cookie", price: 55, img: "shortbread_cookie.jpg" }
    ],
    tresleches: [
        { name: "Classic Tres Leches", price: 1200, img: "classic_tresleches.jpg" },
        { name: "Strawberry Tres Leches", price: 1300, img: "strawberry_tresleches.jpg" },
        { name: "Chocolate Tres Leches", price: 1400, img: "chocolate_tresleches.jpg" },
        { name: "Coffee Tres Leches", price: 1350, img: "coffee_tresleches.jpg" },
        { name: "Mango Tres Leches", price: 1400, img: "mango_tresleches.jpg" },
        { name: "Pineapple Tres Leches", price: 1350, img: "pineapple_tresleches.jpg" }
    ],
    brownies: [
        { name: "Brownie Bites", price: 150, img: "brownie_bites.jpg" },
        { name: "Chocolate Brownie", price: 100, img: "chocolate_brownie.jpg" },
        { name: "Fudge Brownie", price: 120, img: "fudge_brownie.jpg" },
        { name: "Walnut Brownie", price: 130, img: "walnut_brownie.jpg" },
        { name: "Cheesecake Brownie", price: 160, img: "cheesecake_brownie.jpg" },
        { name: "Nutella Brownie", price: 180, img: "nutella_brownie.jpg" }
    ]
};

function showCategory(category) {
    const menuContainer = document.getElementById("menu-items");
    menuContainer.innerHTML = "";

    menuData[category].forEach(item => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");

        menuItem.innerHTML = `
            <img src="images/${item.img}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price}</p> <!-- Display price with ₹ -->
            </div>
            <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button> <!-- Pass number only -->
        `;

        menuContainer.appendChild(menuItem);
    });
}


// Default: Show Cakes on Load
document.addEventListener("DOMContentLoaded", () => {
    showCategory("cakes");
});

function addToCart(name, price) {
    price = parseInt(price); // Convert to number

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
}


