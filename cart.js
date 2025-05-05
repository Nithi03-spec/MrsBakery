document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout");

    // Load cart from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCart() {
        const cartItemsContainer = document.getElementById("cart-items");
        const totalPriceElement = document.getElementById("total-price");
    
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartItemsContainer.innerHTML = "";
    
        let total = 0;
    
        cart.forEach((item, index) => {
            let itemTotal = item.price * item.quantity; // Correct calculation
            total += itemTotal;
    
            const li = document.createElement("li");
            li.innerHTML = `${item.name} x${item.quantity} - ₹${itemTotal} 
                <button class="remove-item" data-index="${index}">Remove</button>`;
            cartItemsContainer.appendChild(li);
        });
    
        totalPriceElement.textContent = total; // Ensure total is displayed correctly
    
        // Attach event listeners to remove buttons
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function() {
                let index = this.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCart();
            });
        });
    }
    

    // Add to Cart Functionality
    if (document.querySelector(".add-to-cart")) {
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", () => {
                const itemName = button.getAttribute("data-name");
                const itemPrice = parseFloat(button.getAttribute("data-price")); // Ensure it's parsed as a float

                let existingItem = cart.find(item => item.name === itemName);
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push({ name: itemName, price: itemPrice, quantity: 1 });
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                alert(`${itemName} added to cart!`);
            });
        });
    }

    // If on cart page, update the cart
    if (window.location.pathname.includes("cart.html")) {
        updateCart();
    }

    // Checkout Functionality (WhatsApp Order)
    checkoutButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        let orderMessage = "Hello Mrs Bakery, I want to order:\n";
        cart.forEach(item => {
            orderMessage += `${item.quantity} x ${item.name} - ₹${(item.price * item.quantity).toFixed(2)}\n`;
        });
        orderMessage += `Total: ₹${totalPriceElement.textContent}`;

        const whatsappURL = `https://wa.me/919944061931?text=${encodeURIComponent(orderMessage)}`;
        window.open(whatsappURL, "_blank");
    });
});
