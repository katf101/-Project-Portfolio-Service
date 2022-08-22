import React, { useEffect, useState } from "react";
import ProfileImage from "../../../components/ProfileImage";
import { useSelector } from "react-redux";
import { loadMyInfo } from "../../../actions/user";
// import ProfileForm from "../../../components/ProfileForm";
import wrapper from "../../../store/configureStore";
import axios from "axios";
import styled from "styled-components";

const Profile = () => {
  const [imageData, setImageData] = useState("");
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("me", me);
  });

  async function getImage() {
    try {
      const { data } = await axios.get(`/image?info=${me.id}`);
      return setImageData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getImage();
    console.log("이미지", imageData);
  }, []);

  return (
    <Maindiv style={{ marginTop: "150px" }}>
      <ProfileImage imagedata={imageData?.src} setImageData={setImageData} />
      <NameDiv>
        <div>{me.name}</div>
      </NameDiv>
      <EmailDiv>
        <div>{me.email}</div>
      </EmailDiv>
      {/* <ProfileForm me={me} /> */}
    </Maindiv>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    // 쿠키가 브라우저에 있는경우만 넣어서 실행
    // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    // await context.store.dispatch(loadPost({ postId }));
    await context.store.dispatch(loadMyInfo());

    return {
      props: {},
    };
  }
);

export default Profile;

const EmailDiv = styled.div`
  margin-bottom: 0.78vw;
  width: 10.42vw;
  height: 2.08vw;
  background: #ffffff;
  border: 0.52vw solid #3a3845;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NameDiv = styled.div`
  margin-bottom: 0.78vw;
  width: 10.42vw;
  height: 2.08vw;
  background: #ffffff;
  border: 0.52vw solid #3a3845;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Maindiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
