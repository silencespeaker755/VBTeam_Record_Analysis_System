import Article from "../models/Article";
import Video from "../models/Video";

class PracticeService {
  static async getPosts() {
    const videos = await Video.find({});
    const articles = await Article.find({});
    return [...videos, ...articles].sort((a, b) =>
      a.uploadTime < b.uploadTime ? 1 : -1
    );
  }

  static async uploadPost({ post }) {
    if (post.url) {
      // video
      const video = new Video({
        url: post.url,
        title: post.title,
        description: post.description,
        uploader: post.uploader,
        uploadTime: post.uploadTime,
      });
      await video.save();
      return video._id;
    }

    // article
    const article = new Article({
      title: post.title,
      content: post.content,
      uploader: post.uploader,
      uploadTime: post.uploadTime,
    });

    await article.save();
    return article._id;
  }
}

export default PracticeService;
