document.getElementById('sendbtn').addEventListener('click', function () {
    validateForm();
});

function clearErrors(form) {
    const errorElements = form.querySelectorAll('.error-message');
    errorElements.forEach(el => el.remove());

    const errorInputs = form.querySelectorAll('.error-input');
    errorInputs.forEach(input => input.classList.remove('error-input'));
}

function showError(input, message) {
    input.classList.add('error-input');
    const error = document.createElement('div');
    error.className = 'error-message';
    error.style.color = 'red';
    error.style.fontSize = '0.9em';
    error.textContent = message;

    if (input.classList.contains('radio-group') || input.tagName === 'LABEL') {
        input.insertAdjacentElement('afterend', error);
    } else {
        input.insertAdjacentElement('afterend', error);
    }
}

function validateForm() {
    const form = document.querySelector('form');
    clearErrors(form);

    function isLetterString(str) {
        if (!str) return false;
        for (let i = 0; i < str.length; i++) {
            const code = str.charCodeAt(i);
            if (!((code >= 65 && code <= 90) || (code >= 97 && code <= 122))) {
                return false;
            }
        }
        return true;
    }

    function isDigits(str) {
        if (!str) return false;
        for (let i = 0; i < str.length; i++) {
            const c = str.charCodeAt(i);
            if (!(c >= 48 && c <= 57)) {
                return false;
            }
        }
        return true;
    }

    function validateEmailSimple(email) {
        if (!email) return false;
        const atPos = email.indexOf('@');
        const dotPos = email.lastIndexOf('.');
        if (atPos < 1) return false;
        if (dotPos < atPos + 2) return false;
        if (dotPos >= email.length - 1) return false;
        return true;
    }

    let valid = true;

    const firstNameInput = form.elements["Firstname"];
    const lastNameInput = form.elements["lastname"];
    const emailInput = form.elements["Email"];
    const phoneInput = form.elements["number"];
    const dobInput = form.elements["dob"];
    const genderInputs = form.elements["gender"];
    const messageInput = form.querySelector('textarea');
    const termsInput = form.elements["terms"];

    const firstName = firstNameInput.value.trim();
    if (!firstName) {
        showError(firstNameInput, "First Name is required.");
        valid = false;
    } else if (!isLetterString(firstName)) {
        showError(firstNameInput, "First Name must contain only letters.");
        valid = false;
    }

    const lastName = lastNameInput.value.trim();
    if (!lastName) {
        showError(lastNameInput, "Last Name is required.");
        valid = false;
    } else if (!isLetterString(lastName)) {
        showError(lastNameInput, "Last Name must contain only letters.");
        valid = false;
    }

    const email = emailInput.value.trim();
    if (!email) {
        showError(emailInput, "Email is required.");
        valid = false;
    } else if (!validateEmailSimple(email)) {
        showError(emailInput, "Invalid Email address.");
        valid = false;
    }

    const phone = phoneInput.value.trim();
    if (!phone) {
        showError(phoneInput, "Phone Number is required.");
        valid = false;
    } else if (!isDigits(phone)) {
        showError(phoneInput, "Phone Number must contain only digits.");
        valid = false;
    }

    const dob = dobInput.value;
    if (!dob) {
        showError(dobInput, "DOB is required.");
        valid = false;
    } else {
        const d = new Date(dob);
        const now = new Date();
        if (d > now) {
            showError(dobInput, "DOB cannot be a future date.");
            valid = false;
        }
    }

    let genderChecked = false;
    let genderValue = '';
    for (let i = 0; i < genderInputs.length; i++) {
        if (genderInputs[i].checked) {
            genderChecked = true;
            genderValue = genderInputs[i].value;
            break;
        }
    }
    if (!genderChecked) {
        const radioGroupDiv = genderInputs[0].closest('.radio-group');
        showError(radioGroupDiv, "Please select a gender.");
        valid = false;
    }

    const message = messageInput.value.trim();
    if (!message) {
        showError(messageInput, "Message cannot be empty.");
        valid = false;
    }

    if (!termsInput.checked) {
        const termsLabel = termsInput.closest('label');
        showError(termsLabel, "You must agree to Terms & Conditions.");
        valid = false;
    }

    const formData = {
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender: genderValue,
        message,
        termsAccepted: termsInput.checked
    };

    console.log("Form Data Submitted:", formData);

    if (valid) {
        alert("Form is valid! Submitting...");
    }

    return valid;
}
