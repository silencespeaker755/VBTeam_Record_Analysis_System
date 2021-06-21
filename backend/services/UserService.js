import User from "../models/User";
import bcrypt from "bcrypt";

class UserService {
  static async signUp({ name, email, password }) {
    let user = await User.findOne({ email });
    if (user) throw "Email has been used!";

    user = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      isAdmin: false,
    });
    user.save();
    return user;
  }

  static async logIn({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw "User not exists!";
    else if (!bcrypt.compareSync(password, user.password))
      throw "Password incorrect!";
    else return user;
  }
}

export default UserService;
