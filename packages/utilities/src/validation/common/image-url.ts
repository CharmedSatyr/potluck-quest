import { z } from "zod";

export const imageUrl = z
	.string()
	.trim()
	.url()
	.regex(/\.(jpeg|jpg|png|gif|webp)$/i)
	.optional();
