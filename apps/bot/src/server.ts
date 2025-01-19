import app from "~/app.js";
import "~/client.js";
import envConfig from "~/constants/env-config.js";

const PORT = envConfig.PORT;

app.listen(PORT, () => {
	console.log(`[server]: Starting server on port ${PORT}`);
});
