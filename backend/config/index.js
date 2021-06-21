import dotenv from "dotenv-defaults";

dotenv.config();

export default {
  port: process.env.PORT,
  mongoURL: process.env.MONGO_URL,
};
