import mongoose from "mongoose";

// Cache the connection promise so repeated calls (e.g. across serverless
// invocations on a warm Vercel instance) reuse the same connection instead
// of opening a new one every time.
let connectionPromise = null;

const connectToMongo = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    // Assigned synchronously (before the await below settles) so that a
    // second call arriving while this one is still connecting reuses the
    // same in-flight promise instead of opening another connection.
    connectionPromise = (async () => {
      try {
        const instance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(
          `MongoDB connected successfully on host: ${instance.connection.host}`
        );
        return instance.connection;
      } catch (error) {
        connectionPromise = null; // allow a retry on the next call
        throw error;
      }
    })();
  }

  return connectionPromise;
};

export default connectToMongo;
