export type Client = {
	id: string;
	name: string;
	firstName: string;
	email: string;
	address: string;
	phone: string;
	clients: {
		id: string;
		status: string;
		directoriesId: string;
	}[];
};
