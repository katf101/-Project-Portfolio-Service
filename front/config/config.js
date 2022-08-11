const prod = process.env.NODE_ENV === "production";
module.exports = {
  backendUrl: "http://15.164.220.119/",
  // backendUrl: prod ? "http://foli.com" : "http://15.164.220.119/",
  // backendUrl: prod ? "https://api.fori.com" : "http://localhost:3060",
  // imageUrl: "http://localhost:3060/image",
  imageUrl: prod ? null : "http://15.164.220.119//images",
  // imageUrl: prod ? null : "http://localhost:3060/images",
};
