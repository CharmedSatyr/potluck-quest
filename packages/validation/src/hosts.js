import { HOSTS_LENGTH } from "@potluck/constants";
import { z } from "zod";

export const hosts = z.string().trim().max(HOSTS_LENGTH);
