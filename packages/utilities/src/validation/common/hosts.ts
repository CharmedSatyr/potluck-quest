import { z } from "zod";
import { HOSTS_LENGTH } from "~/constants/index.js";

export const hosts = z.string().trim().max(HOSTS_LENGTH);
