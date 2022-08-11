const prod = process.env.NODE_ENV === "production";
module.exports = {
  backendUrl: prod ? "https://api.fori.com" : "http://localhost:3060",
  // imageUrl: "http://localhost:3060/image",
  imageUrl: prod ? null : "http://localhost:3060/images",
};
