import { schedule } from "node-cron";
import { productModel } from "../models";

class SaleCronJob {
	/** Automatically Reset Sale Stock */
	public async resetSale() {
		await productModel.updateMany({}, { stock: 200 });
		console.log("Flash Sale has been reset for this month.");
	}

	/** Schedule Sale Reset (Runs Every Month) */
	public scheduleSaleReset() {
		schedule("0 0 1 * *", async () => {
			await this.resetSale();
		});
		console.log("Flash Sale reset job scheduled.");
	}
}

export const SaleJob = new SaleCronJob();

export default SaleJob;
