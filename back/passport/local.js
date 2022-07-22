const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local"); // 구조분해 시 명칭을 바꾸는 방법
const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({
            where: { email },
          });
          // passport 에서는 응답을 보내지 않음
          if (!user) {
            return done(null, false, { reason: "존재하지 않는 사용자입니다!" }); // done(서버에러, 성공, 클라이언트 에러)
          }
          const result = await bcrypt.compare(password, user.password); //compare는 비동기 함수
          if (result) {
            return done(null, user);
          }
          return done(null, false, { reason: "비밀번호가 틀렸습니다." });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
