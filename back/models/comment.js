module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment", // Mysql에는 posts 테이블 생성
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false, // false면 필수
      },
    },
    {
      charset: "utf8mb4", // 이모티콘
      collate: "utf8mb4_general_ci", // 이모티콘 저장
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User); // 댓글은 사람한태 속해있다.
    db.Comment.belongsTo(db.Post); // 댓글은 게시글에 속해있다.
  };
  return Comment;
};
