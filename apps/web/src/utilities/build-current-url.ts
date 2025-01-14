// TODO: import envConfig from "~/constants/env-config";
import siteMetadata from "~/data/site-metadata";

const buildCurrentUrl = (
	pathName: string,
	env: string = process.env.NODE_ENV,
	port: string | undefined = process.env.PORT
): string => {
	const urlBase =
		env === "development" ? `http://localhost:${port}` : siteMetadata.siteUrl;

	return urlBase.concat(pathName);
};

export default buildCurrentUrl;
