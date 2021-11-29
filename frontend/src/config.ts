const ENV = process.env.NODE_ENV.toLowerCase() as "production" | "development";

// TODO: define development and production URLs for the backend API
const config = {
	API_URL: {
		development: "DEVELOPMENT_API_URL",
		production: "PRODUCTION_API_URL"
	}[ENV]
}

export default config;