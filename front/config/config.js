const prod = process.env.NODE_ENV === "production";
module.exports = {
  // backendUrl: "http://api.semifoli.site/",
  // backendUrl: prod ? "http://foli.com" : "http://15.164.220.119/",
  backendUrl: prod ? "http://api.fori.site/" : "http://localhost:3060/",
  // imageUrl: "http://localhost:3060/image",
  // imageUrl: prod ? null : "http://api.semifoli.site/images",
  // imageUrl: prod ? null : "http://localhost:3060/images",
};
