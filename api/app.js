import express, { json } from "express";
import cors from "cors";
import connectToMongo from "../database/db-connection.js";
import authRoute from "../routes/auth.js";
import notesRoute from "../routes/notes.js";

//Express Server
const app = express();

//Middleware
app.use(json());

//CORS
app.use(cors()); // Keep this line before all the routes

// Ensures a DB connection exists before handling any request. Cheap no-op
// once connected (connectToMongo checks readyState first) — on Render/local
// the connection is already up by the time requests arrive (see index.js),
// so this just passes through; on Vercel there's no startup phase, so this
// is where the (cached, per warm instance) connection actually happens.
app.use(async (req, res, next) => {
  try {
    await connectToMongo();
    next();
  } catch (error) {
    console.error("MongoDB connection failed", error);
    res.status(500).json({ msg: "Database connection failed" });
  }
});

//Routes
app.get("/", (_, res) => {
  res.status(200).json({
    msg: `Hello I am Express Server from Render.com`,
  });
});
app.use("/api/auth", authRoute);
app.use("/api/notes", notesRoute);

export { app };
