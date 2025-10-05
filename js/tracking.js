// Real-time driver tracking functionality
let trackingInterval = null;
let driverLocation = { lat: 37.7749, lng: -122.4194 }; // Mock initial location

document.addEventListener('DOMContentLoaded', function() {
    // Start live tracking
    startLiveTracking();
    
    // Update ETA periodically
    updateETA();
});

// Start live tracking updates
function startLiveTracking() {
    // Update location every 30 seconds (in production, use WebSocket or polling)
    trackingInterval = setInterval(() => {
        updateDriverLocation();
        updateETA();
    }, 30000);
}

// Update driver location (mock)
function updateDriverLocation() {
    // In production, fetch real GPS coordinates from backend
    driverLocation.lat += (Math.random() - 0.5) * 0.001;
    driverLocation.lng += (Math.random() - 0.5) * 0.001;
    
    console.log('Driver location updated:', driverLocation);
    
    // Update map (in production, update actual map markers)
    // updateMapMarker(driverLocation);
}

// Update ETA
function updateETA() {
    // Mock ETA calculation
    const etaMinutes = Math.floor(Math.random() * 5) + 3;
    const etaElement = document.querySelector('.driver-detail-value');
    
    if (etaElement && etaElement.textContent.includes('minute')) {
        etaElement.textContent = `${etaMinutes} minutes`;
    }
}

// Share user location with driver
function shareLocation() {
    if (navigator.geolocation) {
        const btn = event.target;
        btn.textContent = 'Getting location...';
        btn.disabled = true;
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    accuracy: position.coords.accuracy
                };
                
                console.log('User location:', userLocation);
                
                // In production, send to backend to share with driver
                setTimeout(() => {
                    alert('Location shared successfully with your driver!');
                    btn.textContent = '✓ Location Shared';
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        btn.textContent = '📍 Share My Location with Driver';
                        btn.disabled = false;
                    }, 3000);
                }, 1000);
            },
            (error) => {
                console.error('Geolocation error:', error);
                alert('Unable to get your location. Please check your browser permissions.');
                btn.textContent = '📍 Share My Location with Driver';
                btn.disabled = false;
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

// Send message to driver
function sendMessage() {
    const message = prompt('Enter your message to the driver:');
    if (message && message.trim()) {
        console.log('Sending message:', message);
        alert('Message sent to driver!');
        // In production, send via backend API
    }
}

// Call driver
function callDriver(phone) {
    window.location.href = `tel:${phone}`;
}

// Emergency contact
function emergencyContact() {
    if (confirm('Do you need emergency assistance? This will alert management and emergency services.')) {
        // In production, trigger emergency protocol
        console.log('EMERGENCY: Passenger requested assistance');
        alert('Emergency services have been notified. Help is on the way.');
    }
}

// Initialize map (placeholder for actual map integration)
function initializeMap() {
    // In production, initialize Google Maps, Mapbox, or similar
    console.log('Map initialized with driver location:', driverLocation);
}

// Update map marker
function updateMapMarker(location) {
    // In production, update marker position on map
    console.log('Updating map marker to:', location);
}

// Clean up when leaving page
window.addEventListener('beforeunload', function() {
    if (trackingInterval) {
        clearInterval(trackingInterval);
    }
});
