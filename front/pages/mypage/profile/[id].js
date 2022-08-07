import React, { useEffect, useState } from "react";
import ProfileImage from "../../../components/ProfileImage";
import { useSelector } from "react-redux";
import { loadMyInfo } from "../../../actions/user";
import ProfileForm from "../../../components/ProfileForm";
import wrapper from "../../../store/configureStore";
import Head from "next/head";
import axios from "axios";

const Profile = () => {
  const [imageData, setImageData] = useState("");
  const { me } = useSelector((state) => state.user);

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
    // console.log("이미지", imageData);
  }, []);

  return (
    <>
      <ProfileImage imagedata={imageData?.src} setImageData={setImageData} />
      <ProfileForm me={me} />
    </>
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
