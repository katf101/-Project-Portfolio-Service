module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User", // Mysql에는 users 테이블 생성
    {
      // id 가 기본적으로 들어있다.
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, // false면 필수
        unique: true, // 고유값
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      modelName: "User",
      tableName: "users",
      charset: "utf8",
      collate: "utf8_general_ci", // 한글 저장
      sequelize,
    }
  );
  // 관계 작성
  User.associate = (db) => {
    db.User.hasOne(db.Post); // 유저 1 : 게시글 1
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" }); // 유저 N : 게시글 N // 좋아요
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "followingId",
    }); // 유저 N : 유저 N // 팔로워
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "followerId",
    }); // 유저 N : 유저 N // 팔로잉
  };
  return User;
};
