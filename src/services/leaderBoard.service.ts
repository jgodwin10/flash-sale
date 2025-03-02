import Purchase from "../models/purchase.model";

class LeaderboardClass {
	public async getLeaderboard() {
		return Purchase.find().populate("userId", "name email").sort({ purchaseTime: 1 }).lean();
	}
}

export const LeaderboardService = new LeaderboardClass();

export default LeaderboardService;
