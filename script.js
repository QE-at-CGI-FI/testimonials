// Load testimonials from localStorage
function loadTestimonials() {
    return JSON.parse(localStorage.getItem('testimonials')) || [];
}

// Save testimonials to localStorage
function saveTestimonials(testimonials) {
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
}

// Display testimonials
function displayTestimonials() {
    const testimonials = loadTestimonials();
    const list = document.getElementById('testimonialsList');
    const testimonialsContainer = list.querySelector('h2').nextElementSibling || document.createElement('div');
    
    // Clear existing testimonials
    while (testimonialsContainer.firstChild) {
        testimonialsContainer.removeChild(testimonialsContainer.firstChild);
    }
    
    if (testimonials.length === 0) {
        testimonialsContainer.innerHTML = '<p>No testimonials yet. Be the first to share!</p>';
    } else {
        testimonials.forEach(testimonial => {
            const item = document.createElement('div');
            item.className = `testimonial-item rating-${testimonial.rating}`;
            
            const rating = document.createElement('div');
            rating.className = 'testimonial-rating';
            rating.textContent = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
            
            const text = document.createElement('div');
            text.className = 'testimonial-text';
            text.textContent = testimonial.testimonial;
            
            item.appendChild(rating);
            item.appendChild(text);
            testimonialsContainer.appendChild(item);
        });
    }
    
    if (!list.contains(testimonialsContainer)) {
        list.appendChild(testimonialsContainer);
    }
}

// Handle form submission
document.getElementById('testimonialForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const rating = document.querySelector('input[name="rating"]:checked');
    const testimonial = document.getElementById('testimonial').value.trim();
    
    if (!rating) {
        alert('Please select a rating.');
        return;
    }
    
    if (!testimonial) {
        alert('Please enter a testimonial.');
        return;
    }
    
    const newTestimonial = {
        rating: parseInt(rating.value),
        testimonial: testimonial
    };
    
    const testimonials = loadTestimonials();
    testimonials.push(newTestimonial);
    saveTestimonials(testimonials);
    
    // Clear form
    rating.checked = false;
    document.getElementById('testimonial').value = '';
    
    // Update display
    displayTestimonials();
});

// Export testimonials to JSON file
document.getElementById('exportBtn').addEventListener('click', function() {
    const testimonials = loadTestimonials();
    const dataStr = JSON.stringify(testimonials, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'testimonials.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Testimonials exported successfully!');
});

// Import testimonials from JSON file
document.getElementById('importBtn').addEventListener('click', function() {
    document.getElementById('importFile').click();
});

document.getElementById('importFile').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const testimonials = JSON.parse(e.target.result);
            if (Array.isArray(testimonials)) {
                saveTestimonials(testimonials);
                displayTestimonials();
                alert('Testimonials imported successfully!');
            } else {
                alert('Invalid file format. Please select a valid testimonials JSON file.');
            }
        } catch (error) {
            alert('Error reading file. Please ensure it\'s a valid JSON file.');
        }
    };
    reader.readAsText(file);
    
    // Clear the input
    e.target.value = '';
});

// Clear all testimonials
document.getElementById('clearBtn').addEventListener('click', function() {
    if (confirm('Are you sure you want to delete all testimonials? This action cannot be undone.')) {
        localStorage.removeItem('testimonials');
        displayTestimonials();
        alert('All testimonials have been cleared.');
    }
});

// Test function to verify behavior when no testimonials exist
function testSampleDataPersistence() {
    console.log('Running test: No testimonials show message when empty');
    
    // Clear localStorage to start fresh
    localStorage.removeItem('testimonials');
    
    // Load testimonials - should be empty
    let testimonials = loadTestimonials();
    console.log('Initial testimonials count:', testimonials.length);
    console.assert(testimonials.length === 0, 'Should have 0 testimonials initially');
    
    // Add a new testimonial
    const newTestimonial = {
        rating: 5,
        testimonial: 'This is a real testimonial added by user.'
    };
    testimonials.push(newTestimonial);
    saveTestimonials(testimonials);
    
    // Load again and check - should have the real one
    testimonials = loadTestimonials();
    console.log('After adding real testimonial count:', testimonials.length);
    console.assert(testimonials.length === 1, 'Should have 1 real testimonial');
    console.assert(testimonials[0].testimonial === 'This is a real testimonial added by user.', 'Should have the real testimonial');
    
    console.log('Test passed: Real testimonials are stored and displayed');
    
    // Clean up
    localStorage.removeItem('testimonials');
}

// Make test function available globally for console testing
window.testSampleDataPersistence = testSampleDataPersistence;

// Initialize
document.addEventListener('DOMContentLoaded', displayTestimonials);