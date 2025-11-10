/**
 * property.js - JavaScript for Property Details Page
 * Handles loading and displaying individual property details
 */

// API Base URL (switches between local dev and Render deployment)
const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:8080/api/properties'
    : 'https://urbannest-mrmh.onrender.com/api/properties';

/**
 * Load property details on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get property ID from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');
    
    if (propertyId) {
        loadPropertyDetails(propertyId);
    } else {
        displayError('No property ID provided. Please select a property from the listings page.');
    }
    
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
 * Fetch and display property details
 */
async function loadPropertyDetails(propertyId) {
    const container = document.getElementById('propertyDetails');
    
    try {
        const response = await fetch(`${API_BASE_URL}/${propertyId}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Property not found');
            }
            throw new Error('Failed to fetch property details');
        }
        
        const property = await response.json();
        
        displayPropertyDetails(property);
        
    } catch (error) {
        console.error('Error loading property details:', error);
        displayError(error.message);
    }
}

/**
 * Display property details
 */
function displayPropertyDetails(property) {
    const container = document.getElementById('propertyDetails');
    
    // Format price in Indian currency format
    const formattedPrice = formatPrice(property.price);
    
    container.innerHTML = `
        <div class="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-amber-500/30">
            <div class="relative overflow-hidden group">
                <img src="${property.imageUrl}" alt="${property.title}" 
                     class="w-full h-96 object-cover bg-gradient-to-br from-slate-700 to-slate-800 group-hover:scale-105 transition-transform duration-700"
                     onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div class="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    Featured Property
                </div>
            </div>
            <div class="p-8">
                <h2 class="text-5xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">${property.title}</h2>
                <p class="text-xl text-gray-400 mb-4 flex items-center"><span class="text-2xl mr-2">📍</span> ${property.location}</p>
                <p class="text-4xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent mb-6">₹${formattedPrice}</p>
                <div class="mb-8">
                    <h3 class="text-2xl font-semibold text-amber-400 mb-4">About this Property</h3>
                    <p class="text-lg text-gray-300 leading-relaxed">${property.description}</p>
                </div>
                <div class="flex flex-wrap gap-4">
                    <button onclick="contactAboutProperty('${property.title}')" 
                        class="flex-1 min-w-[200px] px-8 py-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105 transition-all duration-300 transform">
                        📞 Contact Us
                    </button>
                    <button onclick="goBackToListings()" 
                        class="flex-1 min-w-[200px] px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300 transform">
                        ← Back to Listings
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Update page title
    document.title = `${property.title} - Urban Nest`;
}

/**
 * Display error message
 */
function displayError(message) {
    const container = document.getElementById('propertyDetails');
    
    container.innerHTML = `
        <div class="text-center py-16">
            <div class="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-3xl shadow-2xl p-12 max-w-2xl mx-auto border border-red-500/30">
                <h2 class="text-4xl font-bold text-red-400 mb-4">Oops! Something went wrong</h2>
                <p class="text-lg text-gray-400 mb-8">${message}</p>
                <button onclick="goBackToListings()" 
                    class="px-8 py-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105 transition-all duration-300 transform">
                    ← Back to Listings
                </button>
            </div>
        </div>
    `;
}

/**
 * Format price with commas (Indian currency format)
 */
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Navigate back to listings page
 */
function goBackToListings() {
    window.location.href = '/listings.html';
}

/**
 * Navigate to contact page with property context
 */
function contactAboutProperty(propertyTitle) {
    // Store property title in session storage to pre-fill contact form
    sessionStorage.setItem('propertyInquiry', propertyTitle);
    window.location.href = '/contact.html';
}
