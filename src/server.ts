import { initializeExpressServer } from "./app";
import Database from "./config/database";
import { PORT } from "./config/env";
import RedisClient from "./config/redis";
import saleJob from "./job/sale.job";

async function startServer() {
	await Database.connect();
	await RedisClient.connect();

	saleJob.scheduleSaleReset();

	const app = initializeExpressServer();

	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
}

startServer();
