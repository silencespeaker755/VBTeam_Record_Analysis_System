import dotenv from "dotenv-defaults";

dotenv.config();

export default {
  port: process.env.PORT,
  mongoURL: process.env.MONGO_URL,
  FacebookGroupId: process.env.FacebookGroupId,
  FacebookAppId: process.env.FacebookAppId,
  FacebookAppSecret: process.env.FacebookAppSecret,
};
