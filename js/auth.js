// Authentication handling
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('userRole').value;
            
            // Simple validation
            if (!email || !password || !role) {
                alert('Please fill in all fields');
                return;
            }
            
            // Mock authentication - in production, this would call a backend API
            const users = {
                'manager@example.com': 'management',
                'driver@example.com': 'driver',
                'passenger@example.com': 'passenger'
            };
            
            // Check if email exists and role matches
            if (users[email] && users[email] === role && password === 'demo123') {
                // Store user info in session storage
                sessionStorage.setItem('userEmail', email);
                sessionStorage.setItem('userRole', role);
                sessionStorage.setItem('isLoggedIn', 'true');
                
                // Redirect based on role
                redirectToRoleDashboard(role);
            } else {
                alert('Invalid credentials. Please use the demo accounts provided.');
            }
        });
    }
});

function redirectToRoleDashboard(role) {
    const dashboards = {
        'management': 'pages/management-dashboard.html',
        'driver': 'pages/driver-dashboard.html',
        'passenger': 'pages/passenger-dashboard.html'
    };
    
    const dashboard = dashboards[role];
    if (dashboard) {
        // Check if we're in root or pages directory
        if (window.location.pathname.includes('/pages/')) {
            window.location.href = dashboard.replace('pages/', '');
        } else {
            window.location.href = dashboard;
        }
    }
}

// Check if user is logged in (for protected pages)
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const currentPage = window.location.pathname;
    
    // If not logged in and trying to access protected page
    if (!isLoggedIn && currentPage.includes('/pages/')) {
        window.location.href = '../index.html';
    }
}

// Logout function
function logout() {
    sessionStorage.clear();
    window.location.href = '../index.html';
}
