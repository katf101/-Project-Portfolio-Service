module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post", // Mysql에는 posts 테이블 생성
    {
      src: {
        type: DataTypes.STRING(200),
        allowNull: true, // false면 필수
      },
      introduce: {
        type: DataTypes.TEXT,
        allowNull: false, // false면 필수
      },
      position: {
        type: DataTypes.TEXT,
        allowNull: false, // false면 필수
      },
      job: {
        type: DataTypes.BOOLEAN,
        allowNull: true, // false면 필수
      },
      career: {
        type: DataTypes.TEXT,
        allowNull: false, // false면 필수
      },
      portfolio: {
        type: DataTypes.TEXT,
        allowNull: true, // false면 필수
      },
      github: {
        type: DataTypes.TEXT,
        allowNull: true, // false면 필수
      },
      blog: {
        type: DataTypes.TEXT,
        allowNull: true, // false면 필수
      },
    },
    {
      modelName: "Post",
      tableName: "posts",
      charset: "utf8mb4", // 이모티콘
      collate: "utf8mb4_general_ci", // 이모티콘 저장
    }
  );
  Post.associate = (db) => {
    db.Post.hasOne(db.User); // 게시글은 사람한태 속해있다. // post.addUser, post.getUser, post.setUser
    db.Post.belongsToMany(db.Stack, { through: "PostStack" }); // 게시글 N : 기술스택 N // post.addHashtags
    // db.Post.hasMany(db.Image); // 게시글 1 : 이미지 N // post.addImages, post.getImages
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); // 게시글 N : 유저 N // 좋아요 , // post.addLikers, post.removeLikers
  };
  return Post;
};
