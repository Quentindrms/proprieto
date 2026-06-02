export interface TitleBoardHeader {
	label: string;
	slug: string;
}

export interface FluxBoardItem {
	id: string;
	name: string;
	category: string;
	issueDate: string;
	amount: number;
	type: "outcome" | "income";
	isPaid: boolean;
}
