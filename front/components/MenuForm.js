import React, { useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { logout } from "../actions/user";

const MenuForm = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onPostPush = useCallback(() => {
    Router.replace("/jobhunt");
  }, [Router]);
  const onResumPush = useCallback(() => {
    Router.push(`/mypage/resume/${me?.id}`);
  }, [Router]);
  const onProfilePush = useCallback(() => {
    Router.push(`/mypage/profile/${me?.id}`);
  }, [Router]);
  const onLoginPush = useCallback(() => {
    Router.push("/log/login");
  }, [Router]);
  const onLogout = useCallback(() => {
    dispatch(logout());
    // Router.push("/");
    Router.replace("/");
  }, [dispatch]);

  return (
    <MainDiv>
      <MenuDiv>
        <div onClick={onPostPush}>JobHunt</div>
        {me && <div onClick={onResumPush}>이력서</div>}
        {me && <div onClick={onProfilePush}>프로필</div>}
        {!me && <div onClick={onLoginPush}>로그인</div>}
        {me && <div onClick={onLogout}>로그아웃</div>}
      </MenuDiv>
    </MainDiv>
  );
};

export default MenuForm;

const MenuDiv = styled.div`
  margin-left: 7.29vw;
  width: 41.67vw;
  display: flex;
  justify-content: center;
  div {
    margin-left: 2.08vw;
    display: flex;
    line-height: 2.34vw;
    cursor: pointer;
    :hover {
      /* background: #e4cd7c; */
      color: #d7a150;
    }
  }
`;

const MainDiv = styled.div`
  margin-right: 1.04vw;
  width: 100%;
  width: 99.1146vw;
  height: 2.34vw;
  display: flex;
  justify-content: center;
  border-bottom: 0.05vw solid #ece7e7;

  /* background: #eeeeee; */
  /* flex-direction: column; */
`;
