const prod = process.env.NODE_ENV === "development";
module.exports = {
  // backendUrl: "http://api.semifoli.site/",
  // backendUrl: "http://localhost:80/",
  backendUrl: prod ? "http://localhost:3060/" : "http://api.semifoli.site/",
  frontUrl: prod ? "http://localhost:3000/" : "http://semifoli.site/",
  // imageUrl: "http://localhost:3060/image",
  // imageUrl: prod ? null : "http://api.semifoli.site/images",
  // imageUrl: prod ? null : "http://localhost:3060/images",
};
