import React, { useState, useEffect, useCallback, useRef } from "react";
import Router, { useRouter } from "next/router";
import styled from "styled-components";
import StackCard from "./UI/StackCard";
import { useDispatch, useSelector } from "react-redux";
import { addStack, loadStack, removeStack } from "../actions/post";
import { frontUrl } from "../config/config";
import Link from "next/link";

const StackForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const [userStack, setUserStack] = useState("");
  const [render, setRender] = useState(false);
  const { mainStacks, singleStack, addStackLoading, removeStackLoading } =
    useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    singleStack;
  });

  useEffect(() => {
    console.log("싱글스택", singleStack);
    console.log("메인스택", mainStacks);
  });

  const onInputHandler = useCallback((e) => {
    setUserStack(e.target.value);
  });

  const onAddStack = useCallback(() => {
    if (userStack.length < 2) {
      alert("2글자이상 입력하세요");
      return;
    }
    setRender(mainStacks);
    dispatch(
      addStack({
        stack: userStack,
      })
    );
    alert("스택을 추가하였습니다.");
    setUserStack("");
  });

  return (
    <>
      <MainDiv>
        <InputButtonDiv>
          <input
            value={userStack}
            type="text"
            id="user_stack"
            name="user_stack"
            onChange={onInputHandler}
          />
          <Link href={`${frontUrl}mypage/resume/${me?.id}`} scroll={false}>
            <StackButton
              id="user_stack"
              name="user_stack"
              type="button"
              loading={addStackLoading}
              onClick={onAddStack}
            >
              기술 스택
            </StackButton>
          </Link>
        </InputButtonDiv>
        <StackCardDiv>
          {singleStack &&
            singleStack.map((stack) => (
              <StackCard key={stack.id} stack={stack} />
            ))}
        </StackCardDiv>
      </MainDiv>
    </>
  );
};

export default StackForm;

const InputButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const StackCardDiv = styled.div`
  width: 100%;
  height: 5.21vw;
  display: flex;
  justify-content: center;
  /* background: #d34b4b; */
`;

const StackButton = styled.button`
  width: 5.05vw;
  height: 2.03vw;
  background: #0a5ab9;
  border: none;
  border-radius: 0.78vw;
  :hover {
    background: #084995;
  }
  font-family: "Inter";
  /* font-style: normal; */
  /* font-weight: 400; */
  font-size: 0.78vw;
  color: #ffffff;
`;

const MainDiv = styled.div`
  width: 100%;
  height: 8.85vw;
  display: flex;
  flex-direction: column;
  input {
    :focus {
      outline: none;
    }
    width: 14.9vw;
    height: 2.03vw;
    border: none;
    /* background: #ffffff; */
    border-bottom: 0.05vw solid #d6d5d5;
  }
`;
