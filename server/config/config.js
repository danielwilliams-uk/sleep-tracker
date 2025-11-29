// Minimal config for devBundle and server
const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3002,
  mongoUri:
    process.env.MONGODB_URI || "mongodb://localhost:27017/sleep-tracker",
};

export default config;
