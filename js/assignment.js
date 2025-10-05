// Assignment form handling
document.addEventListener('DOMContentLoaded', function() {
    const assignmentForm = document.getElementById('assignmentForm');
    const selectAllCheckbox = document.getElementById('selectAll');
    const passengerCheckboxes = document.querySelectorAll('input[name="passenger"]');
    
    // Select all passengers functionality
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            passengerCheckboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
            });
        });
    }
    
    // Update select all checkbox when individual checkboxes change
    passengerCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const allChecked = Array.from(passengerCheckboxes).every(cb => cb.checked);
            const someChecked = Array.from(passengerCheckboxes).some(cb => cb.checked);
            
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = allChecked;
                selectAllCheckbox.indeterminate = someChecked && !allChecked;
            }
        });
    });
    
    // Form submission
    if (assignmentForm) {
        assignmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const driver = document.getElementById('driverSelect').value;
            const route = document.getElementById('routeSelect').value;
            const date = document.getElementById('scheduleDate').value;
            const time = document.getElementById('pickupTime').value;
            
            // Get selected passengers
            const selectedPassengers = Array.from(passengerCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            
            // Validation
            if (!driver || !route || !date || !time) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (selectedPassengers.length === 0) {
                alert('Please select at least one passenger');
                return;
            }
            
            // Mock API call - in production, send to backend
            console.log('Assignment Created:', {
                driver,
                route,
                date,
                time,
                passengers: selectedPassengers
            });
            
            // Show success message
            alert(`Successfully assigned ${selectedPassengers.length} passenger(s) to the driver!`);
            
            // Reset form
            assignmentForm.reset();
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = false;
            }
        });
    }
});

// Edit assignment functionality
function editAssignment(assignmentId) {
    // In production, fetch assignment data and populate form
    alert('Edit functionality would load assignment data into the form. Assignment ID: ' + assignmentId);
}

// Remove assignment functionality
function removeAssignment(assignmentId) {
    if (confirm('Are you sure you want to remove this assignment?')) {
        // In production, call API to remove assignment
        alert('Assignment removed successfully!');
        // Reload page or remove element from DOM
    }
}
