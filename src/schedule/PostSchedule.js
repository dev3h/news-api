import schedule from "node-schedule";
import db from "models";
import PostStatusEnum from "enums/PostStatusEnum";

import { internalServerError } from "helpers/generateError";

class PostSchedule {
  static async schedulePost(id) {
    try {
      const post = await db.Post.findOne({
        where: { id },
        raw: true,
      });
      if (!post) return res.status(404).json({ message: "Bài viết không tồn tại" });
      if (post.status !== PostStatusEnum.SCHEDULE) {
        return res
          .status(400)
          .json({ message: "Bài viết không phải là bài viết lên lịch" });
      }
      const { published_at } = post;
      const date = new Date(published_at);
      schedule.scheduleJob(date, async () => {
        console.log("Job run at", new Date());
        await db.Post.update({ status: PostStatusEnum.PUBLIC }, { where: { id } });
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default PostSchedule;
