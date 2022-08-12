const prod = process.env.NODE_ENV === "production";
module.exports = {
  // backendUrl: "http://api.semifoli.site/",
  // backendUrl: "http://localhost:80/",
  backendUrl: prod ? "http://api.semifoli.site/" : "http://localhost:3060/",
  // imageUrl: "http://localhost:3060/image",
  // imageUrl: prod ? null : "http://api.semifoli.site/images",
  // imageUrl: prod ? null : "http://localhost:3060/images",
};
