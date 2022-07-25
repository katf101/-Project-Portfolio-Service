module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      src: {
        type: DataTypes.STRING(200),
        allowNull: true, // false면 필수
      },
    },
    {
      modelName: "Image",
      tableName: "images",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Image.associate = (db) => {
    db.Image.hasOne(db.User); // 이미지는 유저에 속해있다.
  };
  return Image;
};
