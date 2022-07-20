module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post", // Mysql에는 posts 테이블 생성
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false, // false면 필수
      },
      // RetweetId
    },
    {
      charset: "utf8mb4", // 이모티콘
      collate: "utf8mb4_general_ci", // 이모티콘 저장
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // 게시글은 사람한태 속해있다. // post.addUser, post.getUser, post.setUser
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }); // 게시글 N : 해쉬태그 N // post.addHashtags
    db.Post.hasMany(db.Comment); // 게시글 1 : 댓글 N // post.addComments, post.getComments
    db.Post.hasMany(db.Image); // 게시글 1 : 이미지 N // post.addImages, post.getImages
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); // 게시글 N : 유저 N // 좋아요 , // post.addLikers, post.removeLikers
    db.Post.belongsTo(db.Post, { as: "Retweet" }); // 게시글 1 : 게시글 1 // 리트윗 // post.addRetweet
  };
  return Post;
};
