const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development"; // 환경변수로 NODE_ENV, 기본값 'development'
const config = require("../config/config")[env]; // 즉 config 폴더의 config.json 안의 development 값들을 가져옴
const db = {};

// 시퀄라이즈가 노드랑 mysql을 연결해줌
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
