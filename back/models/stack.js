module.exports = (sequelize, DataTypes) => {
  const Stack = sequelize.define(
    "stack",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false, // false면 필수
      },
    },
    {
      modelName: "Stack",
      tableName: "stacks",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Stack.associate = (db) => {
    db.Stack.belongsToMany(db.Post, { through: "PostStack" }); // 해쉬태그 N : 게시글 N
  };
  return Stack;
};
