import { z } from "zod";

export const imageUrl = z
	.string()
	.trim()
	.url()
	.refine((url) => {
		try {
			const parsedUrl = new URL(url);

			// Check if the path ends with a valid image extension
			const pathValid = /\.(jpeg|jpg|png|gif|webp)$/i.test(parsedUrl.pathname);

			// Check if a valid image format appears in the query string
			const queryValid = [...parsedUrl.searchParams.values()].some((value) =>
				/(jpeg|jpg|png|gif|webp)/i.test(value)
			);

			return pathValid || queryValid;
		} catch {
			return false;
		}
	})
	.optional();
