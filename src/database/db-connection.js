import { connect } from "mongoose";

const connectToMongo = async () => {
  try {
    const connectionInstance = await connect(`${process.env.MONGODB_URI}`);
    console.log(
      `MongoDB connected successfully on host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection failed", error);
    process.exit(1);
  }
};
export default connectToMongo;
