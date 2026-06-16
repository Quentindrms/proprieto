export function slugify(name: string): string {
	return name
		.normalize()
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-") // remplace un ou plusieurs espaces consécutifs par un seul tiret
		.replace(/-+/g, "-");
}
