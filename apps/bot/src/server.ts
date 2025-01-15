import app from "~/app";
import "~/client";
import envConfig from "~/constants/env-config";

const PORT = envConfig.PORT;

app.listen(PORT, () => {
	console.log(`[server]: Starting server on port ${PORT}`);
});
