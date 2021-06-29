import bcrypt from "bcrypt";
import moment from "moment";
import tz from "moment-timezone";
import sendVerification from "../utils";
import User from "../models/User";
import Mail from "../models/Mail";

class UserService {
  static async signUp({ name, email, password }) {
    let user = await User.findOne({ email });
    if (user) throw "Email has been used!";

    user = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      isAdmin: false,
      birthday: "",
      number: "",
      position: "",
      about: "",
      auth: false,
    });
    await user.save();

    const emailRes = await sendVerification(user.email);

    console.log(`Email: ${emailRes}`);

    return user;
  }

  static async logIn({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw "User not exists!";
    else if (!bcrypt.compareSync(password, user.password))
      throw "Password incorrect!";
    else return user;
  }

  static async getUser({ userId }) {
    let userList;
    if (userId) {
      userList = await User.findById(userId);
      if (!userList) throw "User not exist!";
    } else {
      userList = await User.find({});
    }

    return userList;
  }

  static async updateUser(data) {
    const { userId } = data;
    if (!userId) throw "UserId is required!";
    const user = await User.findById(userId);
    if (!user) throw "User doesn't exist";
    Object.keys(data).forEach((key) => {
      if (key !== "userId") user[key] = data[key];
    });
    await user.save();
    return user;
  }

  static async updateAdmin(data) {
    const { userId, adminId } = data;
    if (!userId) throw "UserId is required!";
    if (!adminId) throw "AdminId is required!";
    const user = await User.findById(userId);
    if (!user) throw "User doesn't exist";
    user.isAdmin = true;
    await user.save();
    return user;
  }

  static async authentication(data) {
    const { email, verifyCode } = data;
    const mail = await Mail.findOne({ receiver: email });

    if (!mail) throw "Mail doesn't exist!";
    const expireDate = mail.expire;
    const user = await User.findOne({ email });

    if (moment(expireDate).tz("Asia/Taipei").isSameOrBefore(moment())) {
      await mail.deleteOne();
      const emailRes = await sendVerification(user.email);
      console.log(`Email: ${emailRes}`);
      throw "Verification is expired! Please Enter New Verification Code";
    }
    if (mail.verification === verifyCode) {
      user.auth = true;
      await mail.deleteOne();
      await user.save();
      return true;
    }
    return false;
  }
}

export default UserService;
