const ENV = process.env.NODE_ENV.toLowerCase() as "production" | "development";

// TODO: define production URL for the backend API
const config = {
	API_URL: {
		development: "http://localhost:3001/api",
		production: "PRODUCTION_API_URL"
	}[ENV]
}

export default config;