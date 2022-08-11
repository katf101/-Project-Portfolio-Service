import React, { useState, useRef } from "react";
import Router, { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import searchbutton from "../public/images/searchbutton.png";

const SearchForm = () => {
  const inputRef = useRef();

  const onButtonHandler = () => {
    Router.push(`/jobhunt?search=${inputRef.current.value}`);
    inputRef.current.value = "";
  };

  const onEnterInput = (e) => {
    if (e.key === "Enter") {
      onButtonHandler();
    }
  };

  return (
    <SearchMainDiv>
      <div>
        <input
          ref={inputRef}
          onKeyDown={onEnterInput}
          type="text"
          style={{ zIndex: "1" }}
          placeholder="원하는 포지션을 검색해주세요!"
        />
        <button onClick={onButtonHandler}>
          <Image src={searchbutton} />
        </button>
      </div>
    </SearchMainDiv>
  );
};

export default SearchForm;

const SearchMainDiv = styled.div`
  width: 100%;
  height: 7.81vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #79d2cd; */

  div {
    width: 28.65vw;
    height: 6.25vw;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;

    background: rgb(83, 107, 107);
    background: linear-gradient(
      239deg,
      rgba(83, 107, 107, 1) 0%,
      rgba(108, 181, 147, 1) 46%,
      rgba(196, 174, 124, 1) 99%
    );

    background: #3a3845;
  }

  input {
    padding: 5px;
    width: 23.44vw;
    height: 2.08vw;

    background: #ffffff;
    border: 0px;
    border-radius: 10px 0px 0px 10px;
  }

  button {
    width: 49px;
    height: 2.6vw;

    background: #eaeaea;
    border: 0px;
    border-radius: 0px 10px 10px 0px;
  }
`;
