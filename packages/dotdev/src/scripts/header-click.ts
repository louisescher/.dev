const headingElements = document.querySelectorAll<HTMLElement>("article h2, article h3, article h4, article h5");

headingElements.forEach((el) => {
	el.tabIndex = 0;
	const cb = () => window.location.hash = el.id;
	el.addEventListener("click", cb);
	el.addEventListener("keydown", (e) => {
		if (e.key === "Enter") cb();
	});
});
