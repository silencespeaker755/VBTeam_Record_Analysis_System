import User from "../models/User";
import Article from "../models/Post/Article";
import Video from "../models/Post/Video";
import Event from "../models/Event";
import Record from "../models/Match/Record";

class NotificationService {
  static async getNotifications({ userId }) {
    const user = await User.findById(userId);
    if (!user) throw "User not exits!";

    const notifications = [];

    const articles = await Article.find({
      uploadTime: { $gte: user.lastLogin },
    });
    notifications.concat(
      articles.map((article) => {
        return {
          type: "article",
          id: article._id,
          uploader: article.uploader,
          uploadTime: article.uploadTime,
        };
      })
    );

    const videos = await Video.find({
      uploadTime: { $gte: user.lastLogin },
    });
    notifications.concat(
      videos.map((video) => {
        return {
          type: "video",
          id: video._id,
          uploader: video.uploader,
          uploadTime: video.uploadTime,
        };
      })
    );

    const events = await Event.find({
      createTime: { $gte: user.lastLogin },
    });
    notifications.concat(
      events.map((event) => {
        return {
          type: "event",
          id: event._id,
          uploader: event.creator,
          uploadTime: event.createTime,
        };
      })
    );

    const records = await Record.find({
      createTime: { $gte: user.lastLogin },
    });
    notifications.concat(
      records.map((record) => {
        return {
          type: "record",
          id: record._id,
          uploader: record.creator,
          uploadTime: record.createTime,
        };
      })
    );

    return notifications;
  }
}

export default NotificationService;
