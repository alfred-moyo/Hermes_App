// Check-in functionality for drivers
let attendanceData = {};

// Initialize attendance data
document.addEventListener('DOMContentLoaded', function() {
    const checkinItems = document.querySelectorAll('.checkin-item');
    
    checkinItems.forEach(item => {
        const passengerId = item.getAttribute('data-passenger-id');
        const isPresent = item.classList.contains('present');
        attendanceData[passengerId] = isPresent ? 'present' : 'absent';
    });
    
    updateCounters();
});

// Mark attendance
function markAttendance(passengerId, status) {
    const checkinItem = document.querySelector(`[data-passenger-id="${passengerId}"]`);
    const buttons = checkinItem.querySelectorAll('.toggle-btn');
    
    // Update button states
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if ((status === 'present' && btn.classList.contains('present')) ||
            (status === 'absent' && btn.classList.contains('absent'))) {
            btn.classList.add('active');
        }
    });
    
    // Update item styling
    checkinItem.classList.remove('present', 'absent');
    checkinItem.classList.add(status);
    
    // Update attendance data
    attendanceData[passengerId] = status;
    
    // Update counters
    updateCounters();
    
    // Provide haptic feedback on mobile
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }
}

// Update present/absent counters
function updateCounters() {
    let presentCount = 0;
    let absentCount = 0;
    
    Object.values(attendanceData).forEach(status => {
        if (status === 'present') {
            presentCount++;
        } else {
            absentCount++;
        }
    });
    
    const presentElement = document.getElementById('presentCount');
    const absentElement = document.getElementById('absentCount');
    
    if (presentElement) {
        presentElement.textContent = presentCount;
    }
    if (absentElement) {
        absentElement.textContent = absentCount;
    }
}

// Submit attendance to management
function submitAttendance() {
    const presentCount = Object.values(attendanceData).filter(s => s === 'present').length;
    const absentCount = Object.values(attendanceData).filter(s => s === 'absent').length;
    const totalCount = Object.keys(attendanceData).length;
    
    const message = `Submit attendance report?\n\nPresent: ${presentCount}\nAbsent: ${absentCount}\nTotal: ${totalCount}`;
    
    if (confirm(message)) {
        // Show loading state
        const submitBtn = event.target;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Mock API call - in production, send to backend
        setTimeout(() => {
            console.log('Attendance submitted:', attendanceData);
            alert('Attendance report submitted successfully to management!');
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Could redirect to dashboard
            // window.location.href = 'driver-dashboard.html';
        }, 1500);
    }
}

// Quick actions
function callPassenger(phone) {
    window.location.href = `tel:${phone}`;
}

function markAllPresent() {
    const checkinItems = document.querySelectorAll('.checkin-item');
    checkinItems.forEach(item => {
        const passengerId = item.getAttribute('data-passenger-id');
        markAttendance(passengerId, 'present');
    });
}

function markAllAbsent() {
    if (confirm('Are you sure you want to mark all passengers as absent?')) {
        const checkinItems = document.querySelectorAll('.checkin-item');
        checkinItems.forEach(item => {
            const passengerId = item.getAttribute('data-passenger-id');
            markAttendance(passengerId, 'absent');
        });
    }
}
