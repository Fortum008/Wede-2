
// GET CHATBOT ELEMENTS
let chatbotToggle = document.getElementById("chatbotToggle");
let chatbotWindow = document.getElementById("chatbotWindow");
let closeChat = document.getElementById("closeChat");

let chatForm = document.getElementById("chatForm");
let chatInput = document.getElementById("chatInput");
let chatMessages = document.getElementById("chatMessages");

// OPEN CHATBOT
chatbotToggle.addEventListener("click", function() {
    chatbotWindow.style.display = "block";
});

// CLOSE CHATBOT
closeChat.addEventListener("click", function() {
    chatbotWindow.style.display = "none";
});

// DISPLAY MESSAGES
function addMessage(message, className) {
    let newMessage = document.createElement("div");

    newMessage.className = className;
    newMessage.textContent = message;

    chatMessages.appendChild(newMessage);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// CHATBOT RESPONSES
function getBotResponse(message) {
    let question = message.toLowerCase();

    if (question.includes("hello") || question.includes("hi")) {
        return "Hello! Welcome to NkatekoWears. How can I help you?";
    }

    else if (question.includes("price") || question.includes("cost")) {
        return "Our traditional dresses start from R750. Visit our Products page to view more items and prices.";
    }

    else if (question.includes("order") || question.includes("buy")) {
        return "You can place an order by visiting our Products page, adding items to your basket and completing the Enquiry form.";
    }

    else if (question.includes("delivery") || question.includes("shipping")) {
        return "Our delivery fee is R100. Please complete the Enquiry form for your order.";
    }

    else if (question.includes("size")) {
        return "We currently offer sizes XS, S, M, L and XL on our listed products.";
    }

    else if (question.includes("payment") || question.includes("pay")) {
        return "We offer Card and EFT payment options. Payment arrangements will be confirmed after your order is submitted.";
    }

    else if (question.includes("contact") || question.includes("phone")) {
        return "You can contact us on 063 082 4086 or email info@nkatekowear000.co.za.";
    }

    else if (question.includes("hours") || question.includes("open")) {
        return "We are open Monday to Friday from 09:00 to 19:00, Saturday from 09:00 to 17:00, and closed on Sunday.";
    }

    else if (question.includes("thank")) {
        return "You're welcome! Thank you for choosing NkatekoWears.";
    }

    else {
        return "I'm sorry, I didn't understand that. Please ask about our products, prices, orders, delivery or payment.";
    }
}

// SEND CUSTOMER MESSAGE
chatForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let customerMessage = chatInput.value.trim();

    if (customerMessage === "") {
        return;
    }

    addMessage(customerMessage, "user-message");

    let botResponse = getBotResponse(customerMessage);

    addMessage(botResponse, "bot-message");

    chatInput.value = "";
});
