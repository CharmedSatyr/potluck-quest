import envConfig from "~/constants/env-config";
import siteMetadata from "~/data/site-metadata";

const buildCurrentUrl = (
	pathName: string,
	env: string = envConfig.NODE_ENV,
	port: string = envConfig.PORT
): string => {
	const urlBase =
		env === "development" ? `http://localhost:${port}` : siteMetadata.siteUrl;

	return urlBase.concat(pathName);
};

export default buildCurrentUrl;
