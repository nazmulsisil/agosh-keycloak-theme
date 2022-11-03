window.addEventListener("load", () => {
	const inputs = document.querySelectorAll("input");
	console.log({ inputs });
	Array.from(inputs).forEach((input) => {
		input.addEventListener("blur", (e) => {
			const hasValue = !!e.target.value.trim();

			if (hasValue) {
				e.target.classList.add("has-value");
			} else {
				e.target.classList.remove("has-value");
			}
		});
	});
});
