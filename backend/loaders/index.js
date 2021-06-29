import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import swaggerLoader from "./swagger";
import passportLoader from "./passport";

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  console.log("MongoDB Initialized");

  await passportLoader({ app: expressApp });
  console.log("Passport Initialized");

  await expressLoader({ app: expressApp });
  console.log("Express Initialized");

  await swaggerLoader({ app: expressApp });
  console.log("Swagger Initialized");
};
