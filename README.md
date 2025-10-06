# Employee Transportation Management System

A comprehensive web application for managing employee transportation with three distinct user roles: Management, Driver, and Passenger.

## 🚀 Features

### Management Access
- **Dashboard**: Overview of all drivers, routes, and attendance statistics
- **Driver Assignment**: Assign drivers to routes and allocate passengers from multiple companies
- **Reports & Analytics**: View attendance reports, driver performance ratings, and on-time statistics

### Driver Access
- **Dashboard**: View today's assignments and trip history
- **Route Management**: View detailed passenger lists with pickup locations and times
- **Check-In System**: Mark passengers as present/absent with an intuitive toggle interface
- **Submit Reports**: Send finalized attendance lists to management

### Passenger Access
- **Dashboard**: View assigned driver information and trip details
- **Real-Time Tracking**: Track driver's live location with GPS integration (placeholder)
- **Rating System**: Rate drivers on multiple aspects (punctuality, safety, professionalism, cleanliness)
- **Trip History**: View past trips and submitted ratings

## 📁 Project Structure

```
/
├── index.html              # Main login page
├── css/
│   └── styles.css         # Single unified stylesheet for entire application
├── js/
│   ├── auth.js            # Authentication and login handling
│   ├── navigation.js      # Mobile navigation and menu toggle
│   ├── assignment.js      # Driver assignment functionality
│   ├── reports.js         # Reports filtering and management
│   ├── checkin.js         # Driver check-in system
│   ├── tracking.js        # Real-time GPS tracking (passenger)
│   └── rating.js          # Rating and feedback system
└── pages/
    ├── login.html                  # Alternative login page
    ├── management-dashboard.html   # Management overview
    ├── management-assign.html      # Assign drivers & passengers
    ├── management-reports.html     # Attendance & performance reports
    ├── driver-dashboard.html       # Driver home page
    ├── driver-route.html           # Route details & passenger list
    ├── driver-checkin.html         # Passenger check-in interface
    ├── passenger-dashboard.html    # Passenger home page
    ├── passenger-track.html        # Real-time driver tracking
    └── passenger-rate.html         # Rate driver service
```

## 🎨 Design Features

### Mobile-First Responsive Design
- Optimized for mobile devices (drivers and passengers primarily use phones)
- Touch-friendly buttons (minimum 44px height for accessibility)
- Responsive breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

### Single Unified CSS
- One `styles.css` file for entire application
- CSS custom properties (variables) for easy theming
- Role-based color coding:
  - Management: Purple (`#8b5cf6`)
  - Driver: Orange (`#f59e0b`)
  - Passenger: Cyan (`#06b6d4`)

### Accessibility
- WCAG compliant color contrasts
- Keyboard navigation support
- Screen reader friendly labels
- Focus-visible indicators
- Reduced motion support

## 🚦 Getting Started

### Demo Accounts

**Management:**
- Email: `manager@example.com`
- Password: `demo123`
- Role: Management

**Driver:**
- Email: `driver@example.com`
- Password: `demo123`
- Role: Driver

**Passenger:**
- Email: `passenger@example.com`
- Password: `demo123`
- Role: Passenger

### Running Locally

1. Clone or download this repository
2. Open `index.html` in a web browser
3. Use one of the demo accounts to log in
4. Explore the different role interfaces

**Note:** This is a frontend-only demo with mock data. No backend server is required for testing.

## 🔧 Technical Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties, flexbox, and grid
- **Vanilla JavaScript**: No frameworks required
- **Session Storage**: Client-side user state management

## 🗺️ Integration Notes

### GPS Tracking
The real-time tracking feature includes placeholders for map integration. To implement:

1. Choose a mapping service:
   - Google Maps API
   - Mapbox
   - Leaflet with OpenStreetMap
   
2. Add the library script to `passenger-track.html`

3. Update `js/tracking.js` with actual map initialization:
```javascript
function initializeMap() {
    // Example for Google Maps
    const map = new google.maps.Map(document.getElementById('map'), {
        center: driverLocation,
        zoom: 14
    });
    // Add markers, routes, etc.
}
```

### Backend Integration

To connect to a backend API:

1. **Authentication** (`js/auth.js`):
   - Replace mock login with API call
   - Implement JWT or session-based auth

2. **Driver Assignments** (`js/assignment.js`):
   - POST assignments to backend
   - Fetch existing assignments

3. **Check-In System** (`js/checkin.js`):
   - Submit attendance data to API
   - Real-time sync with management dashboard

4. **Tracking** (`js/tracking.js`):
   - WebSocket connection for live GPS updates
   - Or polling endpoint for driver location

5. **Ratings** (`js/rating.js`):
   - POST ratings and feedback
   - Calculate driver averages

### Recommended Backend Endpoints

```
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/assignments
POST   /api/assignments
PUT    /api/assignments/:id
DELETE /api/assignments/:id
GET    /api/attendance
POST   /api/attendance/submit
GET    /api/drivers/:id/location
POST   /api/ratings
GET    /api/reports
```

## 📱 Features by Page

### Management Pages

#### Dashboard (`management-dashboard.html`)
- Statistics cards (total drivers, active routes, passengers, attendance rate)
- Active drivers list with real-time status
- Recent attendance reports table

#### Assign (`management-assign.html`)
- Driver selection dropdown
- Route assignment
- Multi-passenger selection with "select all" option
- Date and time scheduling
- Current assignments view with edit/remove actions

#### Reports (`management-reports.html`)
- Advanced filtering (driver, route, date range)
- Summary statistics
- Detailed attendance table with percentages
- Driver performance ratings with reviews
- Export and print functionality

### Driver Pages

#### Dashboard (`driver-dashboard.html`)
- Today's assignment alert
- Quick stats (passengers, check-in status, rating, stops)
- Quick action buttons
- Recent trip history
- Passenger feedback display

#### Route (`driver-route.html`)
- Route summary (time, stops, duration)
- Map placeholder for route visualization
- Ordered passenger list with:
  - Pickup locations
  - Company information
  - Scheduled times
  - Status indicators

#### Check-In (`driver-checkin.html`)
- Present/Absent counter
- Large touch-friendly toggle buttons
- Passenger details with contact info
- Submit attendance button
- Border color changes based on status

### Passenger Pages

#### Dashboard (`passenger-dashboard.html`)
- Driver information card with rating
- Vehicle and contact details
- Quick actions (track, call, rate)
- Pickup details
- Trip history
- Recent notifications

#### Track (`passenger-track.html`)
- Driver status banner with ETA
- Live location map placeholder
- Trip progress with stops
- Contact driver buttons
- Share location functionality

#### Rate (`passenger-rate.html`)
- Star rating system (1-5 stars)
- Aspect ratings (punctuality, safety, professionalism, cleanliness)
- Written feedback textarea
- Previous ratings history
- Rating guidelines

## 🎯 Key JavaScript Functions

### Authentication (`auth.js`)
```javascript
redirectToRoleDashboard(role)  // Redirect based on user role
checkAuth()                     // Verify user is logged in
logout()                        // Clear session and logout
```

### Check-In (`checkin.js`)
```javascript
markAttendance(passengerId, status)  // Mark present/absent
updateCounters()                     // Update statistics
submitAttendance()                   // Send to management
```

### Rating (`rating.js`)
```javascript
setRating(rating)                    // Set star rating
selectAspect(button, aspect, rating) // Rate specific aspects
resetStarRating()                    // Clear rating
```

### Tracking (`tracking.js`)
```javascript
startLiveTracking()     // Begin location updates
updateDriverLocation()  // Fetch new GPS coordinates
shareLocation()         // Share passenger location
```

## 🔒 Security Considerations

For production deployment:

1. **Authentication**: Implement proper JWT or OAuth authentication
2. **HTTPS**: Always use HTTPS in production
3. **Input Validation**: Sanitize all user inputs on backend
4. **Rate Limiting**: Implement API rate limiting
5. **Session Management**: Use secure session tokens
6. **SQL Injection**: Use parameterized queries
7. **XSS Protection**: Sanitize HTML output
8. **CORS**: Configure appropriate CORS policies

## 📊 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile Safari (iOS): Latest 2 versions
- Chrome Mobile (Android): Latest 2 versions

## 🚀 Deployment

### Static Hosting (Current Setup)
Can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any static web hosting

### Full Stack Deployment
When connected to backend:
1. Deploy frontend to CDN
2. Deploy backend API separately
3. Configure CORS and environment variables
4. Set up database (PostgreSQL, MongoDB, etc.)
5. Implement caching strategy (Redis)

## 📝 Customization

### Changing Colors
Edit CSS custom properties in `css/styles.css`:
```css
:root {
  --primary-color: #2563eb;  /* Main brand color */
  --management-color: #8b5cf6;
  --driver-color: #f59e0b;
  --passenger-color: #06b6d4;
}
```

### Adding New Pages
1. Create HTML file in `/pages/`
2. Include common header and navigation
3. Link to `../css/styles.css`
4. Add navigation link to relevant role pages
5. Include necessary JavaScript files

### Modifying Forms
All forms use consistent classes:
- `.form-group`: Form field container
- `.form-label`: Field labels
- `.form-input`: Text inputs
- `.form-select`: Dropdowns
- `.form-textarea`: Text areas

## 🐛 Known Limitations

1. **Mock Data**: All data is hardcoded or generated client-side
2. **No Persistence**: Data doesn't persist between sessions
3. **No Real GPS**: Tracking page shows placeholder map
4. **Single User**: No multi-user support (shared session storage)
5. **No Notifications**: Push notifications not implemented
6. **No File Upload**: No driver documents or photo upload

## 🔮 Future Enhancements

- [ ] Push notifications for passengers and drivers
- [ ] Real-time chat between passengers and drivers
- [ ] Multi-language support (i18n)
- [ ] Dark mode theme
- [ ] Offline mode with service workers
- [ ] Driver document management
- [ ] Vehicle maintenance tracking
- [ ] Expense reporting
- [ ] Advanced analytics dashboard
- [ ] Export data to Excel/PDF
- [ ] QR code check-in
- [ ] Geofencing for automatic check-in

## 📄 License

This project is provided as-is for demonstration purposes. Feel free to use and modify for your own projects.

## 🤝 Contributing

This is a demonstration project. For production use:
1. Add comprehensive backend API
2. Implement real database
3. Add proper authentication and authorization
4. Integrate real-time GPS tracking
5. Add automated testing
6. Set up CI/CD pipeline

## 📧 Support

For questions or issues with this demo, please refer to the code comments and documentation within each file.

---

**Built with ❤️ for efficient employee transportation management**
