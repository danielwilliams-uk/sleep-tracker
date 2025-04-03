import devBundle from "./devBundle";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import Template from "./../template";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import path from "path";

const app = express();
devBundle.compile(app);
// configure to serve static files from dist folder

const CURRENT_WORKING_DIR = process.cwd();
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

console.log(`CWD: ${CURRENT_WORKING_DIR}`);

// Serve the template at the root URL
app.get("/", (req, res) => {
  res.status(200).send(Template());
});

//Add middleware ( Added modules to configure Express)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use("/", userRoutes);
app.use("/", authRoutes);

// Auth error handling... Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === "Unauthorized Error") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;
