import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import styled from "styled-components";
import StackCard from "./UI/StackCard";
import { useDispatch, useSelector } from "react-redux";
import { addStack, loadStack } from "../actions/post";
import Link from "next/link";

const StackForm = () => {
  const router = useRouter();
  const { id } = router.query;
  //   const [renderStack, setRenderStack] = useState(singleStack);
  const dispatch = useDispatch();
  const [userStack, setUserStack] = useState("");
  const [render, setRender] = useState(mainStacks);
  const {
    mainStacks,
    singleStack,
    addStackLoading,
    addStackDone,
    addStackError,
  } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("렌더될까", addStackDone);
    console.log("렌더될까2", mainStacks);
    console.log("렌더될까3", render);
    console.log("스택폼", singleStack);
    if (addStackDone) {
      console.log("스택이 추가되었습니다.");
      // message.success("게시글이 수정되었습니다.").then();
    }
    if (addStackError) {
      console.log("스택이 추가 실패");
      // message.error(JSON.stringify(updatePostError, null, 4)).then();
    }
  }, [addStackDone, addStackError, singleStack, loadStack, mainStacks, render]);

  const onInputHandler = (e) => {
    setUserStack(e.target.value);
  };

  const onAddStack = () => {
    setRender(mainStacks);
    dispatch(
      addStack({
        stack: userStack,
      })
    );
    setUserStack("");
  };

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
          <Link
            href={`http://localhost:3000/mypage/resume/${me?.id}`}
            scroll={false}
          >
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
  height: 100px;

  display: flex;
  /* background: #d34b4b; */
`;

const StackButton = styled.button`
  width: 97px;
  height: 39px;

  background: #0a5ab9;
  border: none;
  border-radius: 15px;
  :hover {
    background: #084995;
  }

  font-family: "Inter";
  /* font-style: normal; */
  /* font-weight: 400; */
  font-size: 15px;

  color: #ffffff;
`;

const MainDiv = styled.div`
  width: 100%;
  height: 170px;
  display: flex;
  flex-direction: column;

  input {
    :focus {
      outline: none;
    }
    width: 286px;
    height: 39px;
    border: none;
    /* background: #ffffff; */
    border-bottom: 1px solid #d6d5d5;
  }
`;