import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import searchbutton from "../public/images/searchbutton.png";

const SearchForm = () => {
  const [search, setSearch] = useState("");
  const onInputChange = (e) => {
    setSearch(e.target.value);
  };

  const onButtonHandler = () => {
    Router.push(`/jobhunt?search=${search}`);
  };

  return (
    <SearchMainDiv>
      {/* <div>
        <div></div>
      </div> */}
      <div>
        <input
          value={search}
          onChange={onInputChange}
          type="text"
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
  /* padding-top: 40px; */
  margin-top: 40px;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #79d2cd; */

  div {
    width: 100%;
    height: 150px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #21aea6;
  }

  input {
    padding: 5px;
    width: 330px;
    height: 35px;

    background: #ffffff;
    border: 0px;
    border-radius: 10px 0px 0px 10px;
  }

  button {
    width: 49px;
    height: 45px;

    background: #eaeaea;
    border: 0px;
    border-radius: 0px 10px 10px 0px;
  }
`;
