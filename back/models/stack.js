module.exports = (sequelize, DataTypes) => {
  const Stack = sequelize.define(
    "stack",
    {
      stack: {
        type: DataTypes.STRING(20),
        allowNull: true, // false면 필수
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
    db.Stack.belongsTo(db.User); // 해쉬태그 N : 유저 1
  };
  return Stack;
};
