const phone = document.getElementById('phone')
const form = document.getElementById('formid')
const improvement = document.getElementById('future-improvement')
const radioButtons = document.querySelectorAll('input[name="nav-radio"]');

function requiredImprovement (input) {
    improvement.required = input;
}

radioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', () => {
        if (radioButton.value === 'no') {
            requiredImprovement(true); // Improvement suggestion is required
            improvement.focus();

        } else {
            requiredImprovement(false); // Improvement suggestion is optional
        }

    });
});

form.addEventListener('submit', (e) => {
    if (phone.value.length == 10) {} 
    else {
        e.preventDefault();
        alert('Phone number must have 10 digits')
        phone.focus();
        phone.scrollIntoView({ behavior: 'smooth' });
    }
    
})