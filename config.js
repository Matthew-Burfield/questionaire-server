const endpoint =
  process.env.NODE_ENV === "production"
    ? "https://burfield-questionaire-server.now.sh"
    : "http://localhost:4000";

const origin = (process.env.NODE_ENV = "production"
  ? "https://burfield-questionaire.now.sh"
  : "http://localhost:3000");

const cors = { cors: { credentials: true, origin } };

module.exports = {
  cors,
  endpoint
};
