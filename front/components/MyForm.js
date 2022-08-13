import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Router from "next/router";
import { logout } from "../actions/user";

const Myform = () => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.user.me);
  useEffect(() => {
    console.log("dd", me);
  }, [me]);

  const onProfilePush = useCallback(() => {
    Router.push(`/mypage/profile/${me && me.id}`);
  }, [me?.id]);
  const onResumPush = useCallback(() => {
    Router.push(`/mypage/resume/${me && me.id}`);
  }, [me?.id]);
  const onLoginPush = useCallback(() => {
    Router.push("/log/login");
  }, [Router]);
  const onLogout = useCallback(() => {
    dispatch(logout());
    Router.replace("/");
  }, [Router]);
  const onSignUpPush = useCallback(() => {
    Router.push("/log/signup");
  }, [Router]);

  return (
    <MainDiv>
      <UserInfoDiv>
        {me && <NameDiv>{me?.name}님 반갑습니다❕</NameDiv>}
        {me && (
          <EmailDiv>
            <div>{me?.email}</div>
            <div onClick={onLogout}>로그아웃</div>
          </EmailDiv>
        )}
      </UserInfoDiv>
      {me && <ProfileDiv onClick={onProfilePush}>프로필😺</ProfileDiv>}
      {me && <ResumeDiv onClick={onResumPush}>이력서 작성하기😸</ResumeDiv>}
      {!me && <div style={{ color: "#ffffff" }}>포트폴리오를 유저들과</div>}
      {!me && <div style={{ color: "#ffffff" }}>공유해 보아요😆</div>}
      {!me && <LoginDiv onClick={onLoginPush}>로그인</LoginDiv>}
      {!me && <SignupDiv onClick={onSignUpPush}>회원가입</SignupDiv>}
    </MainDiv>
  );
};

export default Myform;

const LoginDiv = styled.button`
  margin-top: 1.56vw;
  width: 10.42vw;
  height: 2.6vw;
  :hover {
    background: #95896c;
  }
  background: #ffffff;
  border: 0.05vw #95896c solid;
  border-radius: 0.26vw;
`;

const SignupDiv = styled.button`
  margin-top: 1.56vw;
  width: 10.42vw;
  height: 2.6vw;
  :hover {
    background: #95896c;
  }
  background: #ffffff;
  border: 0.05vw #95896c solid;
  border-radius: 0.26vw;
`;

const ResumeDiv = styled.button`
  margin-top: 1.56vw;
  width: 10.42vw;
  height: 5.21vw;
  :hover {
    background: #95896c;
  }
  background: #ffffff;
  border: 0.05vw #95896c solid;
  border-radius: 0.26vw;
`;

const ProfileDiv = styled.button`
  margin-top: 1.56vw;
  width: 10.42vw;
  height: 2.6vw;
  :hover {
    background: #95896c;
  }
  background: #ffffff;
  border: 0.05vw #95896c solid;
  border-radius: 0.26vw;
`;

const EmailDiv = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  /* background: #8d54ba; */
  div {
    :nth-child(1) {
      margin-top: 0.78vw;
      font-size: 1.04vw;
    }
    :nth-child(2) {
      margin-left: 1.04vw;
      margin-top: 1.3vw;
      font-size: 0.63vw;
      cursor: pointer;
    }
  }
  color: #5e5d65;
`;
const NameDiv = styled.div`
  font-size: 1.25vw;
  color: #ffffff;
`;

const UserInfoDiv = styled.div`
  margin-top: 1.56vw;
  width: 80%;
  height: 5.21vw;

  display: flex;
  flex-direction: column;

  /* background: #8d54ba; */
`;

const MainDiv = styled.div`
  position: sticky;
  top: 14.5vw;
  margin-left: 1.56vw;
  width: 19.79vw;
  height: 26.04vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.52vw;

  background: #3a3845;
`;
