import dotenv from "dotenv"; // Load Environment Variables
import connectToMongo from "./database/db-connection.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

const startServer = async () => {
  try {
    await connectToMongo();
    app.listen(process.env.PORT, () =>
      console.log("Taskify ToDo server is running on port:", process.env.PORT)
    );
  } catch (error) {
    console.error("Error starting the server", error);
  }
};

startServer();
