document.querySelector("form").addEventListener("submit", (e) => {
	e.preventDefault();
	let isValid = true;

	const fields = [
		{ id: "first-name", errorId: "first-name-error"},
		{ id: "last-name", errorId: "last-name-error"},
		{ id: "message", errorId: "message-error"},
	];

	fields.forEach(field => {
		if (!validateInput(field.id, field.errorId)) {
			isValid = false;
		}
	})

	if (!validateEmail("email")) isValid = false;
	if (!validateRadio("general-enquiry", "support-request", "query-type-error")) isValid = false;
	if (!validateCheckbox("consent", "consent-error")) isValid = false;

	if(isValid) {
		const successMessage = document.getElementById("success-message");
		successMessage.style.display = "block";
	}
});

document.addEventListener("DOMContentLoaded", function() {
	document.querySelectorAll("input, textarea").forEach((input) => {
		input.addEventListener("input", () => {
			const errorId = `${input.id}-error`;
			if(document.getElementById(errorId)){
				validateInput(input.id, errorId)
			}
		})
	})
	document.getElementById("email").addEventListener("input", () => validateEmail("email"));
});

function validateInput(inputId, errorId) {
	const input = document.getElementById(inputId);
	const error = document.getElementById(errorId);
	const isValid = input.value.trim() !== "";

	toggleAriaInvalid(input, isValid);
	error.classList.toggle("visible", !isValid);

	return isValid;
}

function validateEmail(inputId) {
	const emailInput = document.getElementById(inputId);
	const emailRequiredError = document.getElementById("email-required-error");
	const emailValidError = document.getElementById("email-valid-error");
	
	if (!emailInput.value.trim()) {
		toggleAriaInvalid(emailInput, false);
		emailRequiredError.classList.add("visible");
		emailValidError.classList.remove("visible");
		return false;
	} 

	if (!emailInput.validity.valid) {
		toggleAriaInvalid(emailInput, false);
		emailRequiredError.classList.remove("visible");
		emailValidError.classList.add("visible");
		return false;
	} 

	toggleAriaInvalid(emailInput, true);
	emailRequiredError.classList.remove("visible");
	emailValidError.classList.remove("visible");
	return true
}

function validateRadio(id1, id2, errorId) {
	const generalEnquiryInput = document.getElementById(id1);
	const supportRequestInput = document.getElementById(id2);
	const queryTypeError = document.getElementById(errorId);
	const isValid = generalEnquiryInput.checked || supportRequestInput.checked;

	queryTypeError.classList.toggle("visible", !isValid);

	return isValid;
}

document.addEventListener("DOMContentLoaded", function() {
	const radio1 = document.getElementById("general-enquiry");
	const radio2 = document.getElementById("support-request");

	[radio1, radio2].forEach((radio) => {
		radio.addEventListener("change", () => validateRadio("general-enquiry", "support-request", "query-type-error"));
	})
})

function validateCheckbox(inputId, errorId){
	const consentInput = document.getElementById(inputId);
	const consentError = document.getElementById(errorId);
	const isValid = consentInput.checked;

	toggleAriaInvalid(consentInput, isValid);
	consentError.classList.toggle("visible", !isValid);

	return isValid;
}

function toggleAriaInvalid(input, isValid) {
	if(isValid) {
		input.removeAttribute("aria-invalid")
	} else {
		input.setAttribute("aria-invalid", "true")
	}
}