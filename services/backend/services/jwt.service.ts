import * as jose from "jose";

export class JwtService {
	private readonly jwtSecret: Uint8Array;

	constructor() {
		const jwtSecret = process.env.JWT_SECRET;
		if (!jwtSecret) {
			throw new Error("JWT_SECRET is not set (256 bits)");
		}
		this.jwtSecret = jose.base64url.decode(jwtSecret);
	}

	protected async createJWT(userId: string): Promise<string> {
		return await new jose.EncryptJWT({ userId })
			.setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
			.setIssuedAt()
			.setExpirationTime("30d")
			.encrypt(this.jwtSecret);
	}

	protected async verifyJWT(token: string): Promise<{ userId: string }> {
		const { payload } = await jose.jwtDecrypt(token, this.jwtSecret);
		return payload as { userId: string };
	}
}
