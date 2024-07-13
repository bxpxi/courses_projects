document.getElementById('check-btn').addEventListener('click', validatePhoneNumber);
document.getElementById('clear-btn').addEventListener('click', clearResults);

function validatePhoneNumber() {
    const input = document.getElementById('user-input').value.trim();
    const resultsDiv = document.getElementById('results-div');

    if (!input) {
        alert('Please provide a phone number');
        return;
    }

    const validNumber = isValidUSPhoneNumber(input);

    if (validNumber) {
        resultsDiv.textContent = `Valid US number: ${input}`;
    } else {
        resultsDiv.textContent = `Invalid US number: ${input}`;
    }
}

function clearResults() {
    document.getElementById('results-div').textContent = '';
}

function isValidUSPhoneNumber(phoneNumber) {
    const regex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-]?)\d{3}([\s-]?)\d{4}$/;
    return regex.test(phoneNumber);
}
