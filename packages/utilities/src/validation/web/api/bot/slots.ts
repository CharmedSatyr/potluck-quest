import { z } from "zod";
import { code } from "~/validation/common/code.js";

export const getSchema = z.strictObject({ code });
