import User from "../models/User";
import Article from "../models/Article";
import Video from "../models/Video";

class PostService {
  static async getPosts() {
    const videos = await Video.find({});
    const articles = await Article.find({});
    return [...videos, ...articles].sort((a, b) =>
      a.uploadTime < b.uploadTime ? 1 : -1
    );
  }

  static async uploadPost({ post, userId }) {
    const user = await User.findById(userId);
    if (!user) throw "User not found!";

    if (post.url) {
      // video
      const video = new Video({
        url: post.url,
        title: post.title,
        description: post.description,
        uploader: user,
        uploadTime: post.uploadTime,
      });
      await video.save();
      return video._id;
    }

    // article
    const article = new Article({
      title: post.title,
      content: post.content,
      uploader: user,
      uploadTime: post.uploadTime,
    });

    await article.save();
    return article._id;
  }

  static async deletePost({ postId, userId }) {
    const user = await User.findById(userId);
    if (!user) throw "User not found!";

    let post = await Video.findById(postId);
    if (!post) post = await Article.findById(postId);

    if (!post) throw "Post not found!";
    else if (String(post.uploader) !== userId)
      throw "You are not the uploader!";

    const deletedPost = await post.deleteOne();
    return deletedPost;
  }

  static async updatePost({ post, userId }) {
    const user = await User.findById(userId);
    if (!user) throw "User not found!";

    let updatePost = await Video.findById(post._id);
    if (!updatePost) updatePost = await Article.findById(post._id);

    if (!updatePost) throw "Post not found!";
    else if (String(updatePost.uploader) !== userId)
      throw "You are not the uploader!";

    if (updatePost.url) {
      updatePost.url = post.url;
      updatePost.title = post.title;
      updatePost.description = post.description;
    } else {
      updatePost.title = post.title;
      updatePost.content = post.content;
    }

    await updatePost.save();

    return updatePost;
  }
}

export default PostService;
