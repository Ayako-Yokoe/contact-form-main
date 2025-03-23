document.querySelector("form").addEventListener("submit", (e) => {
	e.preventDefault();
	let isValid = true;

	// Validate Firstname
	const fnameInput = document.getElementById("first-name");
	const fnameError = document.getElementById("first-name-error");

	if (!fnameInput.value.trim()) {
		toggleAriaInvalid(fnameInput, false);
		fnameError.classList.add("visible");
		isValid = false;
	} else {
		toggleAriaInvalid(fnameInput, true);
		fnameError.classList.remove("visible");
	}

	// Validate Lastname
	const lnameInput = document.getElementById("last-name");
	const lnameError = document.getElementById("last-name-error");

	if (!lnameInput.value.trim()) {
		toggleAriaInvalid(lnameInput, false);
		lnameError.classList.add("visible");
		isValid = false;
	} else {
		toggleAriaInvalid(lnameInput, true);
		lnameError.classList.remove("visible");
	}

	// Validate Email
	const emailInput = document.getElementById("email");
	const emailRequiredError = document.getElementById("email-required-error");
	const emailValidError = document.getElementById("email-valid-error");
	
	if (!emailInput.value.trim()) {
		toggleAriaInvalid(emailInput, false);
		emailRequiredError.classList.add("visible");
		emailValidError.classList.remove("visible");
		isValid = false;
	} else if (!emailInput.validity.valid) {
		toggleAriaInvalid(emailInput, false);
		emailRequiredError.classList.remove("visible");
		emailValidError.classList.add("visible");
		isValid = false;
	} else {
		toggleAriaInvalid(emailInput, true);
		emailRequiredError.classList.remove("visible");
		emailValidError.classList.remove("visible");
	}

	// Validate Query Type
	const generalEnquiryInput = document.getElementById("general-enquiry");
	const supportRequestInput = document.getElementById("support-request");
	const queryTypeError = document.getElementById("query-type-error");

	if (!(generalEnquiryInput.checked || supportRequestInput.checked)) {
		queryTypeError.classList.add("visible");
		isValid = false;
	} else {
		queryTypeError.classList.remove("visible");
	}

	// Validate Message
	const messageInput = document.getElementById("message");
	const messageError = document.getElementById("message-error");

	if (!messageInput.value.trim()) {
		toggleAriaInvalid(messageInput, false);
		messageError.classList.add("visible");
		isValid = false;
	} else {
		toggleAriaInvalid(messageInput, true);
		messageError.classList.remove("visible");
	}

	// Validate Consent
	const consentInput = document.getElementById("consent");
	const consentError = document.getElementById("consent-error");

	if (!consentInput.checked) {
		toggleAriaInvalid(consentInput, false);
		consentError.classList.add("visible");
		isValid = false;
	} else {
		toggleAriaInvalid(consentInput, true);
		consentError.classList.remove("visible");
	}

	function toggleAriaInvalid(input, isValid) {
		if(isValid) {
			input.removeAttribute("aria-invalid")
		} else {
			input.setAttribute("aria-invalid", "true")
		}
	}

	// Show Success Message If Valid
	if(isValid) {
		const successMessage = document.getElementById("success-message");
		successMessage.style.display = "block";
	}

})