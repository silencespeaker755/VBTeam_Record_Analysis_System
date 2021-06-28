import bcrypt from "bcrypt";
import User from "../models/User";

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
    });
    await user.save();
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
}

export default UserService;
