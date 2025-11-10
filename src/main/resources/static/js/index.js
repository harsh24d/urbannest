/**
 * index.js - JavaScript for Homepage
 * Handles loading featured properties and search functionality
 */

// API Base URL (switches between local dev and Render deployment)
const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:8080/api/properties'
    : 'https://urbannest-mrmh.onrender.com/api/properties';

/**
 * Typing Animation Effect with Loop
 */
function typeWriter(text, element, speed = 100) {
    let i = 0;
    let isDeleting = false;
    const cursorElement = document.getElementById('cursor');
    
    function type() {
        if (!isDeleting && i < text.length) {
            // Typing forward
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (!isDeleting && i === text.length) {
            // Finished typing, wait 2 seconds then start deleting
            cursorElement.style.display = 'inline';
            setTimeout(() => {
                isDeleting = true;
                type();
            }, 2000);
        } else if (isDeleting && i > 0) {
            // Deleting backward
            element.innerHTML = text.substring(0, i - 1);
            i--;
            setTimeout(type, speed / 2); // Delete faster
        } else if (isDeleting && i === 0) {
            // Finished deleting, wait 1 second then start typing again
            isDeleting = false;
            setTimeout(type, 1000);
        }
    }
    
    type();
}

/**
 * Load featured properties on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    // Start typing animation
    const typingElement = document.getElementById('typingText');
    const textToType = 'Find Your Perfect Home';
    typeWriter(textToType, typingElement, 80);
    
    // Show subtitle and search bar immediately
    setTimeout(() => {
        document.getElementById('subtitle').style.opacity = '1';
        document.getElementById('searchBar').style.opacity = '1';
        const ctaBtn = document.getElementById('ctaButton');
        if (ctaBtn) {
            ctaBtn.style.opacity = '1';
        }
    }, 500);
    
    // Load properties
    loadFeaturedProperties();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
});

/**
 * Fetch and display featured properties (first 6 properties)
 */
async function loadFeaturedProperties() {
    const container = document.getElementById('featuredProperties');
    
    try {
        const response = await fetch(API_BASE_URL);
        
        if (!response.ok) {
            throw new Error('Failed to fetch properties');
        }
        
        const properties = await response.json();
        
        // Display only first 6 properties as featured
        const featuredProperties = properties.slice(0, 6);
        
        if (featuredProperties.length === 0) {
            container.innerHTML = '<p class="col-span-full text-center py-12 text-xl text-teal-700">No properties available at the moment.</p>';
            return;
        }
        
        // Clear loading message
        container.innerHTML = '';
        
        // Create property cards
        featuredProperties.forEach(property => {
            const card = createPropertyCard(property);
            container.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading properties:', error);
        container.innerHTML = '<p class="col-span-full text-center py-12 text-xl text-red-600">Unable to load properties. Please try again later.</p>';
    }
}

/**
 * Create a property card element
 */
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-2 transition-all duration-300 transform cursor-pointer border border-amber-500/20 overflow-hidden group';
    card.onclick = () => viewProperty(property.id);
    
    // Format price in Indian currency format
    const formattedPrice = formatPrice(property.price);
    
    card.innerHTML = `
        <div class="relative overflow-hidden">
            <img src="${property.imageUrl}" alt="${property.title}" 
                 class="w-full h-48 object-cover bg-gradient-to-br from-slate-700 to-slate-800 group-hover:scale-110 transition-transform duration-500"
                 onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400'">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                Featured
            </div>
        </div>
        <div class="p-6">
            <h3 class="text-xl font-bold text-amber-400 mb-2 group-hover:text-yellow-400 transition-colors">${property.title}</h3>
            <p class="text-gray-400 mb-2 flex items-center"><span class="text-lg mr-1">📍</span> ${property.location}</p>
            <p class="text-2xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent mb-3">₹${formattedPrice}</p>
            <p class="text-gray-400 text-sm leading-relaxed">${truncateText(property.description, 100)}</p>
        </div>
    `;
    
    return card;
}

/**
 * Format price with commas (Indian currency format)
 */
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Truncate text to specified length
 */
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

/**
 * Navigate to property details page
 */
function viewProperty(propertyId) {
    window.location.href = `/property.html?id=${propertyId}`;
}

/**
 * Search properties by location
 */
function searchProperties() {
    const searchInput = document.getElementById('searchInput');
    const location = searchInput.value.trim();
    
    if (location) {
        // Redirect to listings page with search query
        window.location.href = `/listings.html?location=${encodeURIComponent(location)}`;
    } else {
        // If no search term, just go to listings page
        window.location.href = '/listings.html';
    }
}

/**
 * Allow Enter key to trigger search
 */
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                searchProperties();
            }
        });
    }
});
