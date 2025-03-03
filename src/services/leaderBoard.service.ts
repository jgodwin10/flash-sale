import { purchaseModel } from "../models";

class LeaderboardClass {
	public async getLeaderboard() {
		return purchaseModel.find().populate("userId", "name email").sort({ purchaseTime: 1 }).lean();
	}
}

export const LeaderboardService = new LeaderboardClass();

export default LeaderboardService;
