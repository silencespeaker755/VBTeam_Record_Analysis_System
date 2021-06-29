import User from "../models/User";

class NotificationService {
  static async getNotifications({ userId }) {
    const user = await User.findById(userId);
    if (!user) throw "User not exists!";

    return user.notifications;
  }

  static async deleteNotifications({ userId }) {
    const user = await User.findById(userId);
    if (!user) throw "User not exists!";

    user.notifications = [];
    await user.save();
    return user;
  }

  static async addNotifications({ notification, uploaderId }) {
    const users = await User.find({});

    let done = 0;
    const result = new Promise((resolve, reject) =>
      users.forEach(async (user) => {
        console.log("userId: ", user._id);
        if (String(user._id) !== uploaderId) {
          console.log("!!!!", uploaderId);
          user.notifications.push(notification);
          await user.save();
          done += 1;
          if (done === users.length - 1) resolve();
        }
      })
    );

    result.then(() => {
      return notification;
    });
  }
}

export default NotificationService;
