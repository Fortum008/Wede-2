// ENQUIRY PAGE - SHOPPING BASKET

// Retrieve saved products from localStorage
let basket = JSON.parse(localStorage.getItem("nkatekoBasket")) || [];

// Select the basket display areas
let enquiryBasket = document.getElementById("enquiryBasket");
let shippingFee = document.getElementById("shippingFee");
let orderTotal = document.getElementById("orderTotal");

// Set the shipping fee
let shipping = 100;

// Display the products and calculate the total
function displayOrder() {

    enquiryBasket.innerHTML = "";

    let subtotal = 0;

    if (basket.length === 0) {
        enquiryBasket.innerHTML = "<p>Your basket is empty.</p>";
    } else {

        basket.forEach(function(product) {

            let item = document.createElement("p");

            item.textContent =
                product.code + " | Size: " + product.size +
                " | R" + product.price.toFixed(2);

            enquiryBasket.appendChild(item);

            subtotal = subtotal + product.price;

        });

    }

    let total = subtotal + shipping;

    shippingFee.textContent = "R" + shipping.toFixed(2);

    orderTotal.textContent = "R" + total.toFixed(2);
}

// Display the order when the page opens
displayOrder();

// ======================================
// CUSTOMER DETAILS AUTOFILL
// ======================================

// Retrieve saved customer information
let customer = JSON.parse(
    localStorage.getItem("nkatekoCustomer")
);

// Select customer input fields
let enquiryName = document.getElementById("name");
let enquiryPhone = document.getElementById("phone");

let shippingName = document.getElementById("shippingName");
let shippingPhone = document.getElementById("shippingPhone");

// Fill in the details automatically
if (customer) {

    enquiryName.value = customer.name;
    enquiryPhone.value = customer.cell;

    shippingName.value = customer.name;
    shippingPhone.value = customer.cell;

}


// ======================================
// ENQUIRY FORM SUBMISSION
// ======================================

let enquiryForm = document.getElementById("enquiryForm");

enquiryForm.addEventListener("submit", function(event) {

    event.preventDefault();

    alert("Thank you! Your enquiry has been received.");

    enquiryForm.reset();

});


// ======================================
// CHECKOUT FORM SUBMISSION
// ======================================

let checkoutForm = document.getElementById("checkoutForm");

checkoutForm.addEventListener("submit", function(event) {

    event.preventDefault();

    alert("Thank you for choosing NkatekoWears! Your order details have been submitted.");

});
