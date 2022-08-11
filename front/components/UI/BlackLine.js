import React, { useCallback } from "react";
import Router from "next/router";
import styled from "styled-components";
import { useSelector } from "react-redux";

const BlackLine = () => {
  const { me } = useSelector((state) => state.user);
  const onResumPush = useCallback(() => {
    Router.push(`/mypage/resume/${me?.id}`);
  }, [Router]);
  return (
    <>
      {me && (
        <LineDiv onClick={onResumPush}>
          이력서를 작성하고 유저들과 공유해 보아요🔥
        </LineDiv>
      )}
      {!me && <LineDiv>로그인 후 이력서를 작성하세요!</LineDiv>}
    </>
  );
};

export default BlackLine;

const LineDiv = styled.div`
  position: absolute;
  left: 0vw;
  top: 9.9vw;
  /* top: 144px; */
  /* margin-top: 187px; */
  width: 99.06vw;
  /* width: 1920px; */
  height: 2.08vw;
  line-height: 2.08vw;
  display: flex;
  justify-content: center;
  color: #ffffff;
  background: #414f54;
  /* position: absolute; */
  /* top: 9.64vw; */
  /* top: 9.6vw; */

  cursor: pointer;

  background: #3a3845;
  border: 0.05vw solid #3a3845;
`;
