import db from "models";
import generateSlug from "helpers/generateSlug";

class PostObservers {
  static async saved(post_id, tags = []) {
    const listTags = await db.Tag.findAll();
    const tagIds = listTags.map((tag) => tag.id);

    if (tags.length > 0) {
      const same_tags = tags.filter((tag) => tagIds.includes(+tag));
      const diff_tags = tags.filter((tag) => !tagIds.includes(+tag));
      if (diff_tags.length > 0) {
        const new_tags = diff_tags.map((tag) => {
          return {
            name: tag,
            slug: generateSlug(tag),
            created_by: 1,
            updated_by: 1,
          };
        });
        const created_tags = await db.Tag.bulkCreate(new_tags);
        // nếu có tags mới được tạo
        if (created_tags.length > 0) {
          const created_tags_ids = created_tags.map((tag) => tag.id);
          const merged_tags = [...created_tags_ids, ...same_tags];
          const post_tags = merged_tags.map((tag_id) => {
            return {
              post_id,
              tag_id: +tag_id,
            };
          });
          await db.PostTag.bulkCreate(post_tags);
        }
      } else {
        // kiểm tra xem PostTag của post_id đã tồn tại tag_id nào chưa, nếu chưa có thì tạo mới, còn có rồi thì bỏ qua
        // const post_tags = tags.map((tag_id) => {
        //   return {
        //     post_id,
        //     tag_id: +tag_id,
        //   };
        // });
        // await db.PostTag.bulkCreate(post_tags);
        const post_tags = await db.PostTag.findAll({
          where: {
            post_id,
          },
        });
        const post_tags_ids = post_tags.map((post_tag) => post_tag.tag_id);
        const diff_tags = tags.filter((tag_id) => !post_tags_ids.includes(+tag_id));
        if (diff_tags.length > 0) {
          const post_tags = diff_tags.map((tag_id) => {
            return {
              post_id,
              tag_id: +tag_id,
            };
          });
          await db.PostTag.bulkCreate(post_tags);
        }
      }
    } else {
      await db.PostTag.destroy({
        where: {
          post_id,
        },
      });
    }
  }
}

export default PostObservers;
