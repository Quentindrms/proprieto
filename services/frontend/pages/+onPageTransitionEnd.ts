export async function onPageTransitionEnd() {
	("Page transition end");
	document.body.classList.remove("page-transition");
}
