export function register() {
	const port = process.env.PORT ?? '3000';
	const logLevel = process.env.LOG_LEVEL ?? 'info';
	console.info(`INFO: Server started (env=${process.env.NODE_ENV}, port=${port}, logLevel=${logLevel})`);
}
