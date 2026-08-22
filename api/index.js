import dotenv from "dotenv"; // Load Environment Variables
import connectToMongo from "../database/db-connection.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

// Single entry point for every platform:
// - Render / local: this file runs `node api/index.js` directly, so we
//   connect up front (fail fast if Mongo is unreachable) and start a
//   persistent server with app.listen().
// - Vercel: this file is only ever imported for its default export. Vercel
//   sets process.env.VERCEL automatically, so app.listen() never runs —
//   its Node runtime treats the exported Express app as the request
//   handler itself, and the DB connects lazily via the middleware in
//   app.js instead.
if (!process.env.VERCEL) {
  const startServer = async () => {
    try {
      await connectToMongo();
      app.listen(process.env.PORT, () =>
        console.log("Taskify ToDo server is running on port:", process.env.PORT)
      );
    } catch (error) {
      console.error("Error starting the server", error);
      process.exit(1);
    }
  };

  startServer();
}

export default app;
