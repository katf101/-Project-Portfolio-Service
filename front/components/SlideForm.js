import React from "react";
import styled from "styled-components";
import wanted from "../public/images/wanted.png";
import roket from "../public/images/roket.png";
import wanted2 from "../public/images/wanted2.png";
import sliderdiv from "../public/images/sliderdiv.png";
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
              <Image src={wanted2} />
            </div>
            <div>
              <Image src={wanted} />
            </div>
            <div>
              <Image src={roket} />
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
    width: 2.6vw;
    height: 25.83vw;
    left: 0vw;
    cursor: pointer;
    z-index: 1;
  }

  .slick-next {
    /* background: #d9d9d9; */
    width: 2.6vw;
    height: 25.83vw;
    right: -0.05vw;
    cursor: pointer;
    z-index: 1;
  }
`;

const SlideDiv = styled.div`
  width: 41.67vw;
  height: 26.04vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%); ;
`;
const MainDiv = styled.div`
  width: 41.67vw;
  height: 26.04vw;
  display: flex;
  flex-direction: column;
  /* border: 1px solid #21aea6; */
  /* background: #8d54ba; */
`;
