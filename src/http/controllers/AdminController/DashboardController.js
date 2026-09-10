import { internalServerError } from "helpers/generateError";
import DashboardService from "http/services/AdminService/DashboardService";

class DashboardController {
  static async overview(req, res) {
    try {
      const response = await DashboardService.overview();
      return res.status(200).json(response);
    } catch (error) {
      internalServerError(error, res);
    }
  }
  static async categoryStat(req, res) {
    try {
      const response = await DashboardService.categoryStat();
      return res.status(200).json(response);
    } catch (error) {
      internalServerError(error, res);
    }
  }
  static async getRecentPost(req, res) {
    try {
      const limit = Number.parseInt(req.query.limit) || 5;
      const response = await DashboardService.recentPost(limit);
      return res.status(200).json({
        data: response
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }
  static async getAuthorstat(req, res) {
    try {
      const limit = Number.parseInt(req.query.limit) || 5;
      const response = await DashboardService.authorStat(limit);
      return res.status(200).json(response);
    } catch (error) {
      internalServerError(error, res);
    }
  }
  static async getPostsAnalytics(req, res) {
    try {
      const period = req.query.period || '7d';
      const response = await DashboardService.postsAnalytics(period);
      return res.status(200).json(response);
    } catch (error) {
      internalServerError(error, res);
    }
  }
}

export default DashboardController;
