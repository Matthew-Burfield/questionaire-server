const endpoint =
  process.env.NODE_ENV === "production"
    ? "https://burfield-questionaire-server.now.sh"
    : "http://localhost:4000";

const origin =
  process.env.NODE_ENV === "production"
    ? "https://burfield-questionaire.now.sh"
    : "http://localhost:3000";

module.exports = {
  endpoint,
  origin
};
