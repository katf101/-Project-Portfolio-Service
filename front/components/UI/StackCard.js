import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { removeStack } from "../../actions/post";
import Router from "next/router";

const StackCard = ({ stack }) => {
  const { removeStackLoading } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    stack;
  });

  const onRemoveStack = useCallback(() => {
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    dispatch(
      removeStack({
        stackId: stack.id,
      })
    );
    alert("스택을 삭제하였습니다.");
    Router.replace(`/mypage/resume/${me.id}`).then(() =>
      window.scrollTo(scrollX, scrollY)
    );
  }, [stack.id]);

  return (
    <Maindiv>
      <button
        htmltype="button"
        // type="button"
        type="primary"
        onClick={onRemoveStack}
        loading={removeStackLoading}
      >
        {stack.stack}
      </button>
    </Maindiv>
  );
};

export default StackCard;

const Maindiv = styled.div`
  margin-top: 0.52vw;
  margin-right: 0.26vw;
  padding-left: 0.52vw;
  padding-right: 0.52vw;
  width: auto;
  height: 28px;
  background: #db7e57;
  border-radius: 0.78vw;
  :hover {
    cursor: pointer;
  }
  button {
    width: auto;
    height: auto;
    border: none;
    color: #ffffff;
    background: none;
    :hover {
      cursor: pointer;
    }
  }
`;
