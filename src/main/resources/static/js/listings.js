/**
 * listings.js - JavaScript for Listings Page
 * Handles loading all properties and search/filter functionality
 */

// API Base URL (switches between local dev and Render deployment)
const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:8080/api/properties'
    : 'https://urbannest-mrmh.onrender.com/api/properties';

// Store all properties for client-side filtering
let allProperties = [];
let filteredProperties = []; // Store currently filtered properties
let currentPage = 1;
const propertiesPerPage = 12; // Show 12 properties per page

/**
 * Load properties on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    // Check if there's a search query in URL
    const urlParams = new URLSearchParams(window.location.search);
    const location = urlParams.get('location');
    
    if (location) {
        document.getElementById('searchInput').value = location;
    }
    
    loadAllProperties();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Enter key for search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                applyFilters();
            }
        });
    }

    // Update price range display
    updatePriceRangeDisplay();

    // Check if URL has #filters anchor and auto-expand filters
    if (window.location.hash === '#filters') {
        // Scroll to filters section
        setTimeout(() => {
            const filtersSection = document.getElementById('filters');
            if (filtersSection) {
                filtersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            // Auto-expand advanced filters
            const advancedFilters = document.getElementById('advancedFilters');
            if (advancedFilters && advancedFilters.classList.contains('hidden')) {
                toggleAdvancedFilters();
            }
        }, 300);
    }
});

/**
 * Fetch and display all properties
 */
async function loadAllProperties() {
    const container = document.getElementById('propertyList');
    const countContainer = document.getElementById('propertyCount');
    
    try {
        const response = await fetch(API_BASE_URL);
        
        if (!response.ok) {
            throw new Error('Failed to fetch properties');
        }
        
        allProperties = await response.json();
        
        // Apply filters if URL has location parameter
        const urlParams = new URLSearchParams(window.location.search);
        const location = urlParams.get('location');
        
        if (location) {
            applyFilters();
        } else {
            filteredProperties = allProperties;
            displayProperties(filteredProperties);
            updatePropertyCount(filteredProperties.length);
        }
        
    } catch (error) {
        console.error('Error loading properties:', error);
        container.innerHTML = '<p class="col-span-full text-center py-12 text-xl text-red-400">Unable to load properties. Please try again later.</p>';
    }
}

/**
 * Apply all filters (search, location, price, sort)
 */
function applyFilters() {
    currentPage = 1; // Reset to page 1 when filters change
    
    const searchText = document.getElementById('searchInput').value.trim().toLowerCase();
    const locationFilter = document.getElementById('locationFilter').value;
    const minPrice = parseFloat(document.getElementById('minPrice').value);
    const maxPrice = parseFloat(document.getElementById('maxPrice').value);
    const sortBy = document.getElementById('sortBy').value;
    
    // Filter properties
    let filtered = allProperties.filter(property => {
        // Search text filter (searches in location)
        if (searchText && !property.location.toLowerCase().includes(searchText)) {
            return false;
        }
        
        // Location dropdown filter
        if (locationFilter && !property.location.includes(locationFilter)) {
            return false;
        }
        
        // Price range filter
        if (property.price < minPrice || property.price > maxPrice) {
            return false;
        }
        
        return true;
    });
    
    // Sort properties
    filtered = sortProperties(filtered, sortBy);
    
    // Store filtered properties for pagination
    filteredProperties = filtered;
    
    // Display filtered and sorted properties
    displayProperties(filteredProperties);
    
    // Update count
    if (searchText || locationFilter) {
        const filterDesc = searchText || locationFilter;
        updatePropertyCount(filteredProperties.length, filterDesc);
    } else {
        updatePropertyCount(filteredProperties.length);
    }
}

/**
 * Sort properties based on selected option
 */
function sortProperties(properties, sortBy) {
    const sorted = [...properties];
    
    switch(sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'location':
            return sorted.sort((a, b) => a.location.localeCompare(b.location));
        default:
            return sorted;
    }
}

/**
 * Toggle advanced filters visibility
 */
function toggleAdvancedFilters() {
    const filters = document.getElementById('advancedFilters');
    const toggleText = document.getElementById('filterToggleText');
    const toggleBtn = document.getElementById('toggleFilters');
    
    if (filters.classList.contains('hidden')) {
        filters.classList.remove('hidden');
        toggleText.textContent = 'Show Less';
        toggleBtn.innerHTML = toggleBtn.innerHTML.replace('▼', '▲');
    } else {
        filters.classList.add('hidden');
        toggleText.textContent = 'Show More';
        toggleBtn.innerHTML = toggleBtn.innerHTML.replace('▲', '▼');
    }
}

/**
 * Update price range display
 */
function updatePriceRangeDisplay() {
    const minPrice = parseFloat(document.getElementById('minPrice').value);
    const maxPrice = parseFloat(document.getElementById('maxPrice').value);
    const display = document.getElementById('priceRangeDisplay');
    
    if (minPrice === 0 && maxPrice === 999999999) {
        display.textContent = 'All Prices';
    } else if (minPrice === 0) {
        display.textContent = `Up to ₹${formatPrice(maxPrice)}`;
    } else if (maxPrice === 999999999) {
        display.textContent = `From ₹${formatPrice(minPrice)}`;
    } else {
        display.textContent = `₹${formatPrice(minPrice)} - ₹${formatPrice(maxPrice)}`;
    }
}

/**
 * Clear all filters and reload
 */
function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('locationFilter').value = '';
    document.getElementById('minPrice').value = '0';
    document.getElementById('maxPrice').value = '999999999';
    document.getElementById('sortBy').value = 'default';
    
    updatePriceRangeDisplay();
    currentPage = 1;
    filteredProperties = allProperties;
    displayProperties(filteredProperties);
    updatePropertyCount(filteredProperties.length);
    
    // Remove location parameter from URL
    window.history.replaceState({}, document.title, '/listings.html');
}

/**
 * Display properties in the grid with pagination
 */
function displayProperties(properties) {
    const container = document.getElementById('propertyList');
    
    if (properties.length === 0) {
        container.innerHTML = '<p class="col-span-full text-center py-12 text-xl text-gray-400">No properties found matching your criteria.</p>';
        document.getElementById('pagination').innerHTML = '';
        return;
    }
    
    // Calculate pagination
    const totalPages = Math.ceil(properties.length / propertiesPerPage);
    const startIndex = (currentPage - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    const paginatedProperties = properties.slice(startIndex, endIndex);
    
    // Clear container
    container.innerHTML = '';
    
    // Create property cards
    paginatedProperties.forEach(property => {
        const card = createPropertyCard(property);
        container.appendChild(card);
    });
    
    // Create pagination controls
    createPagination(totalPages, properties.length);
    
    // Scroll to top of property list
    const propertyListElement = document.getElementById('propertyList');
    if (propertyListElement) {
        window.scrollTo({
            top: propertyListElement.offsetTop - 100,
            behavior: 'smooth'
        });
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
 * Update property count display
 */
function updatePropertyCount(count, location = null) {
    const countContainer = document.getElementById('propertyCount');
    
    if (location) {
        countContainer.innerHTML = `Found <strong>${count}</strong> ${count === 1 ? 'property' : 'properties'} in "${location}"`;
    } else {
        countContainer.innerHTML = `Showing <strong>${count}</strong> ${count === 1 ? 'property' : 'properties'}`;
    }
}

/**
 * Clear search and reload all properties
 */
function clearSearch() {
    clearFilters();
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
 * Create pagination controls
 */
function createPagination(totalPages, totalProperties) {
    const paginationContainer = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '<div class="flex items-center justify-center space-x-2 flex-wrap gap-2">';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `
            <button onclick="goToPage(${currentPage - 1})" 
                class="px-4 py-2 rounded-lg bg-slate-800/50 backdrop-blur-lg border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-white hover:border-amber-400 transition-all duration-300 font-semibold shadow-lg">
                ← Previous
            </button>
        `;
    }
    
    // Page numbers
    const pageNumbers = getPageNumbers(currentPage, totalPages);
    
    pageNumbers.forEach(page => {
        if (page === '...') {
            paginationHTML += `<span class="px-3 py-2 text-gray-400">...</span>`;
        } else if (page === currentPage) {
            paginationHTML += `
                <button class="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white font-bold shadow-lg shadow-amber-500/50">
                    ${page}
                </button>
            `;
        } else {
            paginationHTML += `
                <button onclick="goToPage(${page})" 
                    class="px-4 py-2 rounded-lg bg-slate-800/50 backdrop-blur-lg border border-amber-500/20 text-gray-300 hover:border-amber-400 hover:text-amber-400 transition-all duration-300 font-semibold">
                    ${page}
                </button>
            `;
        }
    });
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `
            <button onclick="goToPage(${currentPage + 1})" 
                class="px-4 py-2 rounded-lg bg-slate-800/50 backdrop-blur-lg border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-white hover:border-amber-400 transition-all duration-300 font-semibold shadow-lg">
                Next →
            </button>
        `;
    }
    
    paginationHTML += '</div>';
    
    // Add property range info
    const startNum = (currentPage - 1) * propertiesPerPage + 1;
    const endNum = Math.min(currentPage * propertiesPerPage, totalProperties);
    paginationHTML += `
        <p class="text-center text-gray-400 mt-4">
            Showing ${startNum}-${endNum} of ${totalProperties} properties
        </p>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
}

/**
 * Get page numbers to display (with ellipsis for many pages)
 */
function getPageNumbers(current, total) {
    const pages = [];
    
    if (total <= 7) {
        // Show all pages if 7 or fewer
        for (let i = 1; i <= total; i++) {
            pages.push(i);
        }
    } else {
        // Always show first page
        pages.push(1);
        
        if (current > 3) {
            pages.push('...');
        }
        
        // Show pages around current page
        const start = Math.max(2, current - 1);
        const end = Math.min(total - 1, current + 1);
        
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        
        if (current < total - 2) {
            pages.push('...');
        }
        
        // Always show last page
        pages.push(total);
    }
    
    return pages;
}

/**
 * Go to specific page
 */
function goToPage(page) {
    currentPage = page;
    displayProperties(filteredProperties);
}

/**
 * Reset to page 1 when filters change
 */
function resetPagination() {
    currentPage = 1;
}
