import { Request, Response } from "express";
import LeaderboardService from "../services/leaderBoard.service";

class LeaderboardController {
	/** ✅ Get leaderboard */
	public async getLeaderboard(req: Request, res: Response) {
		const result = await LeaderboardService.getLeaderboard();

		res.status(200).json(result);
	}
}

export default new LeaderboardController();
