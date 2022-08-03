import { symbol } from "prop-types";
import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Router from "next/router";
import { logout } from "../actions/user";

const Myform = () => {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch(logout());
    // Router.push("/");
    Router.replace("/");
  }, [dispatch]);

  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("dd", me);
  }, [me]);

  const onResumPush = () => {
    Router.push(`/mypage/resume/${me?.id}`);
  };

  return (
    <MainDiv>
      <UserInfoDiv>
        {me && <NameDiv>{me?.name}님 반갑습니다!</NameDiv>}
        {me && (
          <EmailDiv>
            <div>{me?.email}</div>
            <div onClick={onLogout}>로그아웃</div>
          </EmailDiv>
        )}
      </UserInfoDiv>
      {me && <ProfileDiv>프로필</ProfileDiv>}
      {me && <ResumeDiv onClick={onResumPush}>이력서 작성하기</ResumeDiv>}
    </MainDiv>
  );
};

export default Myform;

const ResumeDiv = styled.button`
  margin-top: 30px;
  width: 200px;
  height: 100px;
  :hover {
    background: #21aea6;
  }
  background: #6ae6df;
  border: 0;
  border-radius: 5px;
`;

const ProfileDiv = styled.button`
  margin-top: 30px;
  width: 200px;
  height: 50px;
  :hover {
    background: #21aea6;
  }
  background: #6ae6df;
  border: 0;
  border-radius: 5px;
`;

const EmailDiv = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  /* background: #8d54ba; */
  div {
    :nth-child(1) {
      margin-top: 15px;
      font-size: 20px;
    }
    :nth-child(2) {
      margin-left: 20px;
      margin-top: 25px;
      font-size: 12px;
      cursor: pointer;
    }
  }
  color: #cdc7c7;
`;
const NameDiv = styled.div`
  font-size: 24px;
`;

const UserInfoDiv = styled.div`
  margin-top: 30px;
  width: 80%;
  height: 100px;

  display: flex;
  flex-direction: column;

  /* background: #8d54ba; */
`;

const MainDiv = styled.div`
  margin-left: 30px;
  width: 20%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  /* align-items: center; */
  /* border: 1px solid #21aea6; */
  background: #e6f8fe;
`;
