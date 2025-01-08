import app from "~/app";
import config from "~/config";

const PORT = config.PORT;

app.listen(PORT, () => {
	console.log(`[server]: Starting server on port ${PORT}`);
});
