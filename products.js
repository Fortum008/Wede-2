
// PRODUCT IMAGE GALLERY

// Select all product images
let productImages = document.querySelectorAll("main img");

// Create the image gallery overlay
let gallery = document.createElement("div");

gallery.id = "imageGallery";

gallery.style.display = "none";
gallery.style.position = "fixed";
gallery.style.top = "0";
gallery.style.left = "0";
gallery.style.width = "100%";
gallery.style.height = "100%";
gallery.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
gallery.style.justifyContent = "center";
gallery.style.alignItems = "center";
gallery.style.zIndex = "2000";

// Add the gallery to the webpage
document.body.appendChild(gallery);

// Create an enlarged image
let enlargedImage = document.createElement("img");

enlargedImage.style.maxWidth = "80%";
enlargedImage.style.maxHeight = "80%";
enlargedImage.style.objectFit = "contain";

// Add the image to the gallery
gallery.appendChild(enlargedImage);
// Create a close button
let closeButton = document.createElement("button");

closeButton.textContent = "×";

closeButton.style.position = "absolute";
closeButton.style.top = "20px";
closeButton.style.right = "30px";
closeButton.style.fontSize = "40px";
closeButton.style.color = "white";
closeButton.style.background = "none";
closeButton.style.border = "none";
closeButton.style.cursor = "pointer";

// Add the close button to the gallery
gallery.appendChild(closeButton);

// Close the gallery when the button is clicked
closeButton.addEventListener("click", function() {

    gallery.style.display = "none";

});


// Make each product image clickable
productImages.forEach(function(image) {

    image.addEventListener("click", function() {

        enlargedImage.src = image.src;

        gallery.style.display = "flex";

    });

});
// SHOPPING BASKET

// Retrieve saved basket items
let basket = JSON.parse(localStorage.getItem("nkatekoBasket")) || [];

// Select all Add to Basket buttons
let basketButtons = document.querySelectorAll(".basket-btn");

// Select the basket display areas
let basketItems = document.getElementById("basketItems");
let basketTotal = document.getElementById("basketTotal");
// Add products to the basket

basketButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Find the selected product
        let product = button.parentElement;

        // Get product information
        let productCode = product.dataset.code;
        let productPrice = Number(product.dataset.price);

        // Get the selected size
        let selectedSize = product.querySelector(".product-size").value;

        // Check whether a size was selected
        if (selectedSize === "") {

            alert("Please select a size first!");

        } else {

            // Create a product object
            let newProduct = {
                code: productCode,
                price: productPrice,
                size: selectedSize
            };

            // Add the product to the basket
            basket.push(newProduct);
            localStorage.setItem("nkatekoBasket", JSON.stringify(basket));
            displayBasket();

            alert(productCode + " has been added to your basket!");

        }

    });

});
// Display basket items
function displayBasket() {

    // Clear the current basket display
    basketItems.innerHTML = "";

    // Create a variable for the total
    let total = 0;

    // Check if the basket is empty
    if (basket.length === 0) {

        basketItems.innerHTML = "<p>Your basket is currently empty.</p>";

    } else {

        // Go through every product in the basket
        basket.forEach(function(product, index) {

            // Create a paragraph for the product
            let item = document.createElement("p");

            item.textContent = 
                product.code + " | Size: " + product.size +
                " | R" + product.price.toFixed(2);

            // Add the product to the basket display
            basketItems.appendChild(item);
            // Create a remove button
let removeButton = document.createElement("button");

removeButton.textContent = "Remove";

// Remove the selected product
removeButton.addEventListener("click", function() {

    basket.splice(index, 1);
localStorage.setItem("nkatekoBasket", JSON.stringify(basket));
    displayBasket();
    // Display saved basket when the page opens
displayBasket();

});

// Add the remove button to the display
basketItems.appendChild(removeButton);

            // Add the product price to the total
            total = total + product.price;

        });

    }

    // Display the total amount
    basketTotal.textContent = "Total: R" + total.toFixed(2);

}
