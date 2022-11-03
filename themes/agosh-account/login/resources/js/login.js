const applyHasValueClass = (inputElement) => {
	const hasValue = !!inputElement.value.trim();
	if (hasValue) {
		inputElement.classList.add("has-value");
	} else {
		inputElement.classList.remove("has-value");
	}
};

window.addEventListener("load", () => {
	const inputs = document.querySelectorAll("input");

	Array.from(inputs).forEach((input) => {
		// initially apply the class
		applyHasValueClass(input);
		input.addEventListener("blur", (e) => applyHasValueClass(e.target));
	});
});
