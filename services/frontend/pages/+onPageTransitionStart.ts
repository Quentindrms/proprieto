// https://vike.dev/onPageTransitionStart

import type { PageContextClient } from "vike/types";

export async function onPageTransitionStart(
	pageContext: Partial<PageContextClient>,
) {
	("Page transition start");
	"pageContext.isBackwardNavigation", pageContext.isBackwardNavigation;
	document.body.classList.add("page-transition");
}
