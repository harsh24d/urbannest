# 🏡 Urban Nest - Real Estate Property Listing Platform

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A modern, full-stack real estate property listing platform with a stunning dark theme and golden accents. Urban Nest provides an intuitive interface for browsing, searching, and filtering through 200+ premium properties across major Indian cities.

![Urban Nest Preview](src/main/resources/static/images/hero-property.png)

## ✨ Features

### 🎨 Modern UI/UX
- **Dark Theme Design**: Sleek slate-900/indigo-950 gradient background
- **Golden Accents**: Premium amber-400/500 and yellow-400/500 highlights
- **Glass Morphism**: Backdrop blur effects with semi-transparent elements
- **Global Grid Pattern**: Subtle indigo grid overlay for depth
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Smooth Animations**: Loading animations, hover effects, and transitions

### 🏠 Property Management
- **200+ Properties**: Pre-loaded property database
- **Advanced Search**: Search by location across 10+ major cities
- **Smart Filtering**: Filter by location, price range, and more
- **Dynamic Sorting**: Sort by price (low to high, high to low) or location
- **Pagination**: Browse properties with 9 items per page
- **Property Details**: Comprehensive view with images, descriptions, and pricing

### 🤖 AI Assistant - Orion
- **Intelligent Chat Bot**: AI-powered property assistant
- **Golden Cottage Icon**: Custom-designed home icon with animations
- **Real-time Help**: Get instant answers about properties and services
- **Contact Integration**: Direct access to contact information
- **Contextual Responses**: Smart replies based on user queries

### 📱 Core Pages
1. **Home Page**: Hero section with property search and featured listings
2. **Listings Page**: Complete property catalog with filters
3. **Property Details**: Individual property information
4. **Contact Page**: Form with validation and contact information

### 🔍 Advanced Features
- **Featured Properties**: Highlight top 6 properties on homepage
- **Typing Animation**: Dynamic hero text animation
- **Price Formatting**: Indian currency format (₹ Lakhs/Crores)
- **Mobile Menu**: Hamburger menu for mobile devices
- **Loading States**: Beautiful golden home icon loading animations
- **Form Validation**: Client-side validation for contact form

## 🛠️ Technology Stack

### Backend
- **Java 17**: Modern Java features
- **Spring Boot 3.1.5**: Rapid application development
- **Spring Web**: RESTful API development
- **Spring Data JPA**: Database abstraction layer
- **H2 Database**: In-memory database for development
- **Maven**: Dependency management

### Frontend
- **HTML5**: Semantic markup
- **Tailwind CSS 3.x**: Utility-first CSS framework
- **Vanilla JavaScript**: No framework dependencies
- **CSS3 Animations**: Custom keyframe animations
- **SVG Graphics**: Scalable vector graphics for icons

### Architecture
- **MVC Pattern**: Model-View-Controller architecture
- **RESTful API**: JSON-based API endpoints
- **Responsive Design**: Mobile-first approach
- **Component-Based**: Modular JavaScript structure

## 📂 Project Structure

```
urbannest/
├── src/
│   ├── main/
│   │   ├── java/com/urbannest/
│   │   │   ├── UrbanNestApplication.java       # Main application
│   │   │   ├── controller/
│   │   │   │   └── PropertyController.java     # REST endpoints
│   │   │   ├── model/
│   │   │   │   └── Property.java               # Property entity
│   │   │   ├── repository/
│   │   │   │   └── PropertyRepository.java     # Data access layer
│   │   │   └── service/
│   │   │       └── PropertyService.java        # Business logic
│   │   └── resources/
│   │       ├── application.properties           # App configuration
│   │       ├── schema.sql                       # Database schema
│   │       ├── data.sql                         # Sample data (200 properties)
│   │       └── static/
│   │           ├── index.html                   # Home page
│   │           ├── listings.html                # Property listings
│   │           ├── property.html                # Property details
│   │           ├── contact.html                 # Contact form
│   │           ├── css/
│   │           │   └── style.css                # Custom styles
│   │           ├── js/
│   │           │   ├── index.js                 # Home page logic
│   │           │   ├── listings.js              # Listings page logic
│   │           │   ├── property.js              # Property details logic
│   │           │   ├── contact.js               # Contact form logic
│   │           │   └── orion.js                 # AI assistant logic
│   │           └── images/
│   │               └── hero-property.png        # Hero image
├── pom.xml                                      # Maven configuration
├── .gitignore                                   # Git ignore rules
└── README.md                                    # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- **Java 17** or higher
- **Maven 3.6+** or Maven Wrapper (included)
- **Git** (for cloning)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/harsh24d/urbannest.git
cd urbannest
```

2. **Build the project**
```bash
./mvnw clean install
```
Or if you have Maven installed:
```bash
mvn clean install
```

3. **Run the application**
```bash
./mvnw spring-boot:run
```
Or:
```bash
mvn spring-boot:run
```

4. **Access the application**
```
http://localhost:8080
```

### Quick Start (JAR)
```bash
# Build JAR
./mvnw package

# Run JAR
java -jar target/urbannest-0.0.1-SNAPSHOT.jar
```

## 🎯 API Endpoints

### Property API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties` | Get all properties |
| GET | `/api/properties/{id}` | Get property by ID |
| GET | `/api/properties/location/{location}` | Get properties by location |

### Example Requests

**Get all properties:**
```bash
curl http://localhost:8080/api/properties
```

**Get property by ID:**
```bash
curl http://localhost:8080/api/properties/1
```

**Get properties by location:**
```bash
curl http://localhost:8080/api/properties/location/Mumbai
```

### Response Format
```json
{
  "id": 1,
  "title": "Luxury Apartment in South Mumbai",
  "location": "Mumbai, Maharashtra",
  "price": 15000000,
  "description": "Spacious 3BHK apartment with sea view...",
  "image": "/images/hero-property.png"
}
```

## 🎨 Design System

### Color Palette
```css
/* Background Gradients */
Background: slate-900 → indigo-950 → slate-900

/* Golden Accents */
Primary: amber-400, amber-500
Secondary: yellow-400, yellow-500
Tertiary: orange-400, orange-500

/* Text Colors */
Headings: Amber gradient
Body: gray-300
Subtle: gray-400
```

### Typography
- **Headings**: Tailwind default font with bold weight
- **Body**: Sans-serif system fonts
- **Sizes**: Responsive scaling (text-xl to text-7xl)

### Spacing
- **Navbar Height**: 80px (h-20)
- **Section Padding**: 48px - 96px (py-12 to py-24)
- **Card Gaps**: 32px (gap-8)

## 📱 Features in Detail

### 1. Home Page (`index.html`)
- Dynamic typing animation for hero text
- Search bar with location-based filtering
- Featured properties grid (6 properties)
- Feature highlights section
- Animated gradient orbs background

### 2. Listings Page (`listings.html`)
- Complete property catalog (200 properties)
- Advanced filter panel:
  - Location dropdown (10+ cities)
  - Price range (₹20L - ₹5Cr+)
  - Sort options (price, location)
- Pagination (9 properties per page)
- Property count display
- Search and clear functionality

### 3. Property Details Page (`property.html`)
- Large property image
- Full property description
- Price in Indian currency format
- Location information
- Contact inquiry button
- Related actions

### 4. Contact Page (`contact.html`)
- Contact information display:
  - Email: vardhan24d@gmail.com
  - Phone: +91-9508081252
  - Address: Chandigarh University, Zakir D, Punjab - 140413
- Contact form with validation
- Phone number formatting
- Success/error message display

### 5. Orion AI Assistant
- Floating chat button (bottom-right)
- Golden cottage icon with pulsing animation
- Chat window with message history
- AI responses for common queries:
  - Property information
  - Service details
  - Contact information
  - Area expertise

## 🔧 Configuration

### Application Properties
```properties
# Server Configuration
server.port=8080

# H2 Database Configuration
spring.datasource.url=jdbc:h2:mem:urbannest
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA Configuration
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=none

# H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# SQL Initialization
spring.sql.init.mode=always
```

### Database Configuration
- **Type**: H2 In-Memory Database
- **URL**: `jdbc:h2:mem:urbannest`
- **Console**: http://localhost:8080/h2-console
- **Schema**: Auto-created from `schema.sql`
- **Data**: Loaded from `data.sql` (200 properties)

## 🎭 Performance Optimizations

- ✅ Zero unnecessary code
- ✅ Minified CSS via Tailwind CDN
- ✅ Optimized image loading
- ✅ Efficient DOM manipulation
- ✅ Lazy loading for properties
- ✅ Client-side filtering and sorting
- ✅ Pagination to reduce load
- ✅ CSS animations using GPU acceleration

## 🐛 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Opera | 76+ | ✅ Full |

## 📱 Responsive Breakpoints

```css
/* Mobile First */
Default: 320px - 767px

/* Tablet */
md: 768px+

/* Desktop */
lg: 1024px+

/* Large Desktop */
xl: 1280px+

/* Extra Large */
2xl: 1536px+
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow existing code style
- Write meaningful commit messages
- Update documentation as needed
- Test thoroughly before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Harsh Vardhan**
- Email: vardhan24d@gmail.com
- Phone: +91-9508081252
- Location: Chandigarh University, Punjab - 140413
- GitHub: [@harsh24d](https://github.com/harsh24d)

## 🙏 Acknowledgments

- Spring Boot team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- H2 Database for the in-memory database
- All contributors and users of Urban Nest

## 📞 Support

For support, email vardhan24d@gmail.com or open an issue on GitHub.

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Property upload functionality for agents
- [ ] Advanced search with more filters (bedrooms, amenities)
- [ ] Favorites/Wishlist feature
- [ ] Property comparison tool
- [ ] Map integration for property locations
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Property reviews and ratings
- [ ] Virtual property tours
- [ ] Payment gateway integration
- [ ] Real-time chat with agents

## 📊 Project Stats

- **Total Properties**: 200
- **Cities Covered**: 10+
- **API Endpoints**: 3
- **Pages**: 4
- **JavaScript Files**: 5
- **Lines of Code**: ~3,300
- **Zero Bugs**: ✅ Production Ready

---

<div align="center">
  
**Built with ❤️ by Harsh Vardhan**

⭐ Star this repository if you find it helpful!

[Report Bug](https://github.com/harsh24d/urbannest/issues) · [Request Feature](https://github.com/harsh24d/urbannest/issues)

</div>
