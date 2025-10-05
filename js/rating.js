// Rating functionality for passengers
let selectedRating = 0;
let aspectRatings = {
    punctuality: 0,
    safety: 0,
    professionalism: 0,
    cleanliness: 0
};

document.addEventListener('DOMContentLoaded', function() {
    const ratingForm = document.getElementById('ratingForm');
    
    if (ratingForm) {
        ratingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate rating
            if (selectedRating === 0) {
                alert('Please select a star rating');
                return;
            }
            
            // Validate aspect ratings
            const missingAspects = Object.entries(aspectRatings)
                .filter(([key, value]) => value === 0)
                .map(([key]) => key);
            
            if (missingAspects.length > 0) {
                alert('Please rate all aspects before submitting');
                return;
            }
            
            // Get feedback text
            const feedback = document.getElementById('feedback').value;
            
            // Prepare rating data
            const ratingData = {
                overallRating: selectedRating,
                aspectRatings: aspectRatings,
                feedback: feedback,
                driverId: 'driver-123', // In production, get from context
                tripId: 'trip-456', // In production, get from context
                timestamp: new Date().toISOString()
            };
            
            // Show loading state
            const submitBtn = ratingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            // Mock API call
            setTimeout(() => {
                console.log('Rating submitted:', ratingData);
                
                // Show success message
                alert('Thank you for your feedback! Your rating has been submitted.');
                
                // Reset form
                ratingForm.reset();
                resetStarRating();
                resetAspectRatings();
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Optionally redirect to dashboard
                // window.location.href = 'passenger-dashboard.html';
            }, 1500);
        });
    }
});

// Set star rating
function setRating(rating) {
    selectedRating = rating;
    
    // Update hidden input
    document.getElementById('ratingValue').value = rating;
    
    // Update star display
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    
    // Update rating text
    const ratingTexts = {
        1: 'Poor - Needs significant improvement',
        2: 'Below Average - Several issues',
        3: 'Average - Acceptable service',
        4: 'Good - Satisfied with service',
        5: 'Excellent - Outstanding service!'
    };
    
    const ratingText = document.getElementById('ratingText');
    if (ratingText) {
        ratingText.textContent = ratingTexts[rating];
        ratingText.style.color = rating >= 4 ? 'var(--success-color)' : 
                                 rating === 3 ? 'var(--warning-color)' : 
                                 'var(--danger-color)';
    }
    
    // Haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }
}

// Select aspect rating
function selectAspect(button, aspect, rating) {
    // Update aspect rating
    aspectRatings[aspect] = rating;
    
    // Update button states in the group
    const group = button.parentElement;
    const buttons = group.querySelectorAll('.btn');
    
    buttons.forEach((btn, index) => {
        if (index < rating) {
            btn.classList.remove('btn-outline');
            btn.classList.add('btn-primary');
        } else {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-outline');
        }
    });
    
    // Haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }
}

// Reset star rating
function resetStarRating() {
    selectedRating = 0;
    document.getElementById('ratingValue').value = '';
    
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => star.classList.remove('active'));
    
    const ratingText = document.getElementById('ratingText');
    if (ratingText) {
        ratingText.textContent = 'Tap a star to rate';
        ratingText.style.color = 'var(--text-secondary)';
    }
}

// Reset aspect ratings
function resetAspectRatings() {
    aspectRatings = {
        punctuality: 0,
        safety: 0,
        professionalism: 0,
        cleanliness: 0
    };
    
    // Reset all aspect buttons
    document.querySelectorAll('.form-group .btn-group').forEach(group => {
        group.querySelectorAll('.btn').forEach(btn => {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-outline');
        });
    });
}

// Quick rating buttons (for predefined ratings)
function quickRate(rating) {
    setRating(rating);
    
    // Auto-fill all aspects with the same rating
    Object.keys(aspectRatings).forEach((aspect, index) => {
        const group = document.querySelectorAll('.form-group .btn-group')[index];
        if (group) {
            const button = group.querySelectorAll('.btn')[rating - 1];
            if (button) {
                selectAspect(button, aspect, rating);
            }
        }
    });
    
    // Scroll to feedback section
    const feedbackSection = document.getElementById('feedback');
    if (feedbackSection) {
        feedbackSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        feedbackSection.focus();
    }
}
