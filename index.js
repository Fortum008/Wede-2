
// ======================================
// NKATEKOWEARS - IMAGE GALLERY
// ======================================

// Select all product images
const productImages = document.querySelectorAll(".product-card img");

// Create gallery background
const gallery = document.createElement("div");

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

// Create enlarged image
const enlargedImage = document.createElement("img");

enlargedImage.style.maxWidth = "80%";
enlargedImage.style.maxHeight = "80%";
enlargedImage.style.objectFit = "contain";

gallery.appendChild(enlargedImage);

// Create close button
const closeGallery = document.createElement("button");

closeGallery.textContent = "X";
closeGallery.style.position = "absolute";
closeGallery.style.top = "20px";
closeGallery.style.right = "30px";
closeGallery.style.fontSize = "25px";
closeGallery.style.cursor = "pointer";

gallery.appendChild(closeGallery);

document.body.appendChild(gallery);

// Open gallery when image is clicked
productImages.forEach(function(image) {

    image.addEventListener("click", function() {

        enlargedImage.src = image.src;
        gallery.style.display = "flex";

    });

});

// Close gallery
closeGallery.addEventListener("click", function() {

    gallery.style.display = "none";

});

gallery.addEventListener("click", function(event) {

    if (event.target === gallery) {

        gallery.style.display = "none";

    }

});

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        gallery.style.display = "none";

    }

});


// ======================================
// REGISTRATION AND LOGIN SYSTEM
// ======================================

// Get registration elements
const registerPopup = document.getElementById("registerPopup");
const registerForm = document.getElementById("registerForm");
const closeRegister = document.getElementById("closeRegister");

const registerName = document.getElementById("registerName");
const registerCell = document.getElementById("registerCell");
const registerPassword = document.getElementById("registerPassword");
const confirmPassword = document.getElementById("confirmPassword");
const registerMessage = document.getElementById("registerMessage");

// Get login elements
const loginPopup = document.getElementById("loginPopup");
const loginForm = document.getElementById("loginForm");
const closeLogin = document.getElementById("closeLogin");

const loginPassword = document.getElementById("loginPassword");
const loginMessage = document.getElementById("loginMessage");

// Get navigation login button
const loginBtn = document.getElementById("loginBtn");

// Hide both popups initially
registerPopup.style.display = "none";
loginPopup.style.display = "none";

// Retrieve registered account
let registeredCustomer = JSON.parse(
    localStorage.getItem("nkatekoAccount")
);

// Count incorrect login attempts
let attempts = 0;


// ======================================
// PASSWORD HASHING FOR DEMO ACCOUNT
// ======================================

// Convert password into a hash before saving
async function hashPassword(password, salt) {

    const encoder = new TextEncoder();

    const passwordData = encoder.encode(salt + password);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        passwordData
    );

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray.map(function(byte) {

        return byte.toString(16).padStart(2, "0");

    }).join("");

}


// ======================================
// DISPLAY MESSAGES
// ======================================

function showRegisterMessage(message, colour) {

    registerMessage.textContent = message;
    registerMessage.style.color = colour;

}

function showLoginMessage(message, colour) {

    loginMessage.textContent = message;
    loginMessage.style.color = colour;

}


// ======================================
// OPEN AND CLOSE POPUPS
// ======================================

// Open the correct popup when Login is clicked
loginBtn.addEventListener("click", function() {

    if (registeredCustomer) {

        registerPopup.style.display = "none";
        loginPopup.style.display = "flex";

    } else {

        loginPopup.style.display = "none";
        registerPopup.style.display = "flex";

    }

});

// Close registration popup
closeRegister.addEventListener("click", function() {

    registerPopup.style.display = "none";

});

// Close login popup
closeLogin.addEventListener("click", function() {

    loginPopup.style.display = "none";

});


// ======================================
// CUSTOMER REGISTRATION
// ======================================

registerForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    // Get the entered passwords
    let password = registerPassword.value;
    let confirm = confirmPassword.value;

    // Check whether passwords match
    if (password !== confirm) {

        showRegisterMessage(
            "Passwords do not match. Please try again.",
            "red"
        );

        return;

    }

    try {

        // Create a random salt
        const randomSalt = crypto.getRandomValues(
            new Uint8Array(16)
        );

        const salt = Array.from(randomSalt).map(function(byte) {

            return byte.toString(16).padStart(2, "0");

        }).join("");

        // Hash the password
        const passwordHash = await hashPassword(password, salt);

        // Create customer account
        registeredCustomer = {

            name: registerName.value,
            cell: registerCell.value,
            salt: salt,
            passwordHash: passwordHash

        };

        // Save account details
        localStorage.setItem(
            "nkatekoAccount",
            JSON.stringify(registeredCustomer)
        );

        // Display successful registration
        showRegisterMessage(
            "Registration successful!",
            "green"
        );

        // Clear registration form
        registerForm.reset();

        // Open login popup immediately
        setTimeout(function() {

            registerPopup.style.display = "none";
            loginPopup.style.display = "flex";

            showLoginMessage(
                "Account created! Please log in.",
                "green"
            );

        }, 1000);

    } catch (error) {

        showRegisterMessage(
            "Registration could not be completed. Please use a secure browser connection.",
            "red"
        );

    }

});


// ======================================
// CUSTOMER LOGIN
// ======================================

loginForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    if (attempts === 3) {

    showLoginMessage(
        "Goodbye! Thank you for visiting NkatekoWears.",
        "red"
    );

    // Disable further login attempts
    loginForm.querySelector("button").disabled = true;

    // Close the login popup after 3 seconds
    setTimeout(function() {

        loginPopup.style.display = "none";

    }, 3000);

    }

    // Get entered password
    let enteredPassword = loginPassword.value;

    try {

        // Hash the entered password using the saved salt
        const enteredHash = await hashPassword(
            enteredPassword,
            registeredCustomer.salt
        );

        // Compare entered password with saved password hash
        if (enteredHash === registeredCustomer.passwordHash) {

            showLoginMessage(
                "Login successful! Welcome to NkatekoWears.",
                "green"
            );

            // Save customer details for the Enquiry page
            let customer = {

                name: registeredCustomer.name,
                cell: registeredCustomer.cell

            };

            localStorage.setItem(
                "nkatekoCustomer",
                JSON.stringify(customer)
            );

            // Reset attempts
            attempts = 0;

            // Clear login form
            loginForm.reset();

            // Close popup after successful login
            setTimeout(function() {

                loginPopup.style.display = "none";

            }, 1500);

        } else {

            attempts++;

            let remaining = 3 - attempts;

            showLoginMessage(
                "Password unsuccessful! Attempts remaining: " + remaining,
                "red"
            );

            loginForm.reset();

            if (attempts === 3) {

                showLoginMessage(
                    "Login locked. You have used all 3 attempts.",
                    "red"
                );

            }

        }

    } catch (error) {

        showLoginMessage(
            "Login could not be completed. Please try again.",
            "red"
        );

    }

});


// ======================================
// FIRST-TIME VISITOR CHECK
// ======================================

if (registeredCustomer) {

    // Returning customer sees Login
    loginPopup.style.display = "flex";

} else {

    // New customer sees Registration
    registerPopup.style.display = "flex";

}
