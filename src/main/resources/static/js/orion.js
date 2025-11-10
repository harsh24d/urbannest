/**
 * Orion AI Assistant - Shared Functionality
 * Handles chat interface and AI responses
 */

// Initialize Orion when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeOrion();
});

function initializeOrion() {
    const orionButton = document.getElementById('orionAssistant');
    const orionChat = document.getElementById('orionChat');
    const closeButton = document.getElementById('closeOrion');
    const sendButton = document.getElementById('sendMessage');
    const input = document.getElementById('orionInput');

    // Toggle chat window
    if (orionButton) {
        orionButton.addEventListener('click', function() {
            orionChat.classList.toggle('hidden');
            if (!orionChat.classList.contains('hidden')) {
                input.focus();
            }
        });
    }

    // Close chat
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            orionChat.classList.add('hidden');
        });
    }

    // Send message
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }

    // Enter key to send
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

function sendMessage() {
    const input = document.getElementById('orionInput');
    const message = input.value.trim();
    
    if (!message) return;

    // Add user message
    addMessageToChat(message, 'user');
    
    // Clear input
    input.value = '';

    // Simulate AI thinking
    setTimeout(() => {
        const response = getOrionResponse(message.toLowerCase());
        addMessageToChat(response, 'orion');
    }, 1000);
}

function addMessageToChat(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    
    if (sender === 'user') {
        messageDiv.className = 'flex items-start space-x-2 justify-end';
        messageDiv.innerHTML = `
            <div class="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl rounded-tr-none p-3 shadow-md max-w-[80%]">
                <p class="text-sm">${message}</p>
            </div>
            <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
            </div>
        `;
    } else {
        messageDiv.className = 'flex items-start space-x-2';
        messageDiv.innerHTML = `
            <div class="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
            </div>
            <div class="bg-white rounded-2xl rounded-tl-none p-3 shadow-md max-w-[80%]">
                <p class="text-sm text-gray-800">${message}</p>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getOrionResponse(message) {
    // Simple AI responses based on keywords
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return "Hi there! 👋 I'm Orion, your AI assistant. I can help you find properties, answer questions about listings, or guide you through our services. What would you like to know?";
    }
    
    if (message.includes('mumbai') || message.includes('bangalore') || message.includes('delhi') || message.includes('pune')) {
        const city = message.match(/(mumbai|bangalore|delhi|pune|chennai|hyderabad|kolkata)/i)?.[0] || 'that city';
        return `Great choice! We have amazing properties in ${city.charAt(0).toUpperCase() + city.slice(1)}. You can use our <a href="/listings.html#filters" class="text-amber-600 font-semibold hover:underline">advanced filters</a> to browse properties in ${city}. Would you like me to guide you there?`;
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('budget')) {
        return "Our properties range from ₹38 lakhs to ₹4.5 crores across India! You can use the <a href='/listings.html#filters' class='text-amber-600 font-semibold hover:underline'>price filter</a> on our listings page to find properties within your budget. What's your price range?";
    }
    
    if (message.includes('filter') || message.includes('search')) {
        return "You can use our powerful filters to search by location, price range, and sort properties. Visit the <a href='/listings.html#filters' class='text-amber-600 font-semibold hover:underline'>Listings page</a> and click on 'Show More' to access advanced filters! 🔍";
    }
    
    if (message.includes('contact') || message.includes('phone') || message.includes('email')) {
        return "You can reach us at:<br>📧 Email: vardhan24d@gmail.com<br>📞 Phone: +91-9508081252<br>Or visit our <a href='/contact.html' class='text-amber-600 font-semibold hover:underline'>Contact page</a> to send us a message!";
    }
    
    if (message.includes('help') || message.includes('what can you do')) {
        return "I can help you with:<br>🏠 Finding properties by location<br>💰 Filtering by price range<br>🔍 Searching listings<br>📞 Contact information<br>❓ Answering questions about our services<br><br>Just ask me anything!";
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
        return "You're welcome! 😊 Feel free to ask if you need anything else. Happy house hunting! 🏡";
    }
    
    if (message.includes('2bhk') || message.includes('3bhk') || message.includes('4bhk') || message.includes('villa')) {
        return "We have a variety of properties including 1BHK, 2BHK, 3BHK, 4BHK apartments, and luxury villas! Head over to our <a href='/listings.html' class='text-amber-600 font-semibold hover:underline'>Listings page</a> to explore all options. What type of property are you looking for?";
    }
    
    // Default response
    return "I'm here to help! 😊 You can ask me about:<br>• Property locations (Mumbai, Bangalore, Delhi, etc.)<br>• Price ranges and budgets<br>• How to use filters<br>• Contact information<br>• Property types<br><br>What would you like to know?";
}
