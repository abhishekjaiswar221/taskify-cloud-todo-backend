import { connect } from "mongoose";
// import { DB_NAME } from "../constants.js";

const connectToMongo = async () => {
  try {
    const connectionInstance = await connect(
      `${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority&appName=${process.env.APP_NAME}`
    );
    console.log(
      `MongoDB Connected Successfully !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB Connection Failed", error);
    process.exit(1);
  }
};
export default connectToMongo;
