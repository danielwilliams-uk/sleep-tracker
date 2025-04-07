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
import sleepRoutes from "./routes/sleepdata.routes";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import MainRouter from "./../client/MainRouter";
import { StaticRouter } from "react-router-dom";
import theme from "./../client/theme";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "./../client/createEmotionCache";
import { ThemeProvider } from "@mui/material/styles";

const app = express();
devBundle.compile(app);
// configure to serve static files from dist folder
const CURRENT_WORKING_DIR = process.cwd();
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

// Replace ServerStyleSheets logic with Emotion's ssr (stuff in older template deprecated for ssr)
// Breaking changes from migrating to @mui. See docs: https://mui.com/x/migration/migration-pickers-lab/
app.get("*", (req, res) => {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  const context = {};
  const markup = ReactDOMServer.renderToString(
    <CacheProvider value={cache}>
      <StaticRouter location={req.url} context={context}>
        <ThemeProvider theme={theme}>
          <MainRouter />
        </ThemeProvider>
      </StaticRouter>
    </CacheProvider>
  );

  if (context.url) {
    return res.redirect(303, context.url);
  }

  const emotionChunks = extractCriticalToChunks(markup);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  res.status(200).send(
    Template({
      markup,
      css: emotionCss,
    })
  );
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
app.use("/", sleepRoutes);

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
