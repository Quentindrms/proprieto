export class CoreService {
	protected BASE_URL: string;
	protected authToken: string | null;

	constructor(authToken: string | null = null) {
		(this.BASE_URL = "http://localhost:4000"), (this.authToken = authToken);
	}

	private async handleFetch(
		endpoint: string,
		init?: RequestInit,
	): Promise<Response> {
		const response = await fetch(`${this.BASE_URL}${endpoint}`, {
			...init,
			headers: {
				...init?.headers,
				Authorization: `Bearer ${this.authToken}`,
			},
		});
		if (!response.ok) {
			throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
		}
		return response;
	}

	private async handleJsonResponse<T = never>(response: Response): Promise<T> {
		try {
			const data = await response.json();
			return data as T;
		} catch (error) {
			console.trace(error);
			throw new Error("An error as occured while parsing JSON response");
		}
	}

	public async get<T = never>(endpoint: string) {
		const response = await this.handleFetch(endpoint, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});
		return this.handleJsonResponse(response);
	}

	public async post<T = never, K = unknown>(
		endpoint: string,
		body?: K,
	): Promise<T> {
		const response = await this.handleFetch(endpoint, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		return this.handleJsonResponse(response);
	}

	public async put<T = never, K = unknown>(
		endpoint: string,
		body?: K,
	): Promise<T> {
		const response = await this.handleFetch(endpoint, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		return this.handleJsonResponse(response);
	}

	public async delete<T = never>(endpoint: string): Promise<T> {
		const response = await this.handleFetch(endpoint, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
		});
		return this.handleJsonResponse(response);
	}

	public async patch<T = never, K = unknown>(
		endpoint: string,
		body?: K,
	): Promise<T> {
		const response = await this.handleFetch(endpoint, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		return this.handleJsonResponse(response);
	}
}
