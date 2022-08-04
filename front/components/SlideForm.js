import React from "react";
import styled from "styled-components";
import wanted from "../public/images/wanted.png";
import roket from "../public/images/roket.png";
import wanted2 from "../public/images/wanted2.png";
import Slider from "react-slick";
import Image from "next/image";

const SlideForm = () => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: true,
    infinite: true,
    autoplay: true, //자동 재생 할 것인지
    autoplaySpeed: 3500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <MainDiv>
      <SlideDiv>
        <div>
          <StyledSlide {...settings}>
            <div>
              <Image src={wanted} />
            </div>
            <div>
              <Image src={roket} />
            </div>
            <div>
              <Image src={wanted2} />
            </div>
          </StyledSlide>
        </div>
      </SlideDiv>
    </MainDiv>
  );
};

export default SlideForm;

const StyledSlide = styled(Slider)`
  .slick-prev {
    /* background: #d9d9d9; */
    width: 50px;
    height: 496px;
    left: 0px;
    cursor: pointer;
    z-index: 1000;
  }

  .slick-next {
    /* background: #d9d9d9; */
    width: 50px;
    height: 496px;
    left: 950px;
    cursor: pointer;
    z-index: 100;
  }
`;

const SlideDiv = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: #d9d9d9;
`;
const MainDiv = styled.div`
  width: 1000px;
  height: 500px;
  display: flex;
  flex-direction: column;
  /* border: 1px solid #21aea6; */
  /* background: #8d54ba; */
`;
