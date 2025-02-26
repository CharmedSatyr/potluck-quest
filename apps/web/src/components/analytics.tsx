import Script from "next/script";

const { NODE_ENV, ANALYTICS_ID, ANALYTICS_URL } = process.env;

const Analytics = () =>
	NODE_ENV === "production" ? (
		<Script src={ANALYTICS_URL} data-website-id={ANALYTICS_ID} />
	) : null;

export default Analytics;
