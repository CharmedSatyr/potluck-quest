import { z } from "zod";

export const response = z.enum(["yes", "no"]);
