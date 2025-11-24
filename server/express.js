import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import path from "path";

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import sleepRoutes from "./routes/sleepdata.routes";

const app = express();

// Serve static assets from /dist
const CURRENT_WORKING_DIR = process.cwd();
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

// Middleware modules
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

// API routes
app.use("/api", sleepRoutes);
app.use("/api", userRoutes);
app.use("/api", authRoutes);

// Serve static index.html for all other routes (single page app)
app.get("*", (req, res) => {
  res.sendFile(path.join(CURRENT_WORKING_DIR, "dist", "index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Error handling for unauthorized access
app.use((err, req, res, next) => {
  if (err.name === "Unauthorized Error") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.error(err);
  }
});

export default app;
