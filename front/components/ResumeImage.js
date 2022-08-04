import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, uploadImage, addImage } from "../actions/post";
import postSlice from "../reducers/post";
import basic from "../public/images/basic.png";

import { imageUrl } from "../config/config";
import styled from "styled-components";
import UserImage from "../public/images/UserImage.png";
import Image from "next/image";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ResumeImage = ({ imagedata }) => {
  const { imagePaths, addImageLoading, addImageDone, addImageError } =
    useSelector((state) => state.post);
  const [action, setAction] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [test, setTest] = useState("false");
  // const imagedata = imagedata;
  //   const { me } = useSelector((state) => state.user);
  // const { id } = useSelector((state) => state.user.me);

  const dispatch = useDispatch();

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  // useEffect(() => {
  //   setTest(PreviewImg);
  // }, [PreviewImg]);

  useEffect(() => {
    console.log("이펙트", imagePaths);
  }, [imagePaths, test]);

  const onChangeImages = useCallback((e) => {
    setTest(PreviewImg);
    console.log("image", e.target.files);
    const isFile = e.target.files;
    const imageFormData = new FormData(); // FormData를 사용하면 back 에서 muler로 처리 가능
    [].forEach.call(e.target.files, (image) => {
      imageFormData.append("image", image);
    });
    console.log("이미지 확인", imageFormData);

    dispatch(uploadImage(imageFormData));
    return isFile;
  }, []);

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch(postSlice.actions.removeImage(index));
    },
    []
  );

  useEffect(() => {
    if (action) {
      if (addImageDone) {
        message.success("이력서가 등록되었습니다.").then();
      }
      if (addImageError) {
        console.log("에러");
        // message.error(JSON.stringify(addPostError, null, 4)).then();
      }
      action.setSubmitting(false);
      action.resetForm();
      setAction(null);
    }
  }, [addImageDone, addImageError]);

  const onSubmit = (e) => {
    // e.preventdefault();

    console.log("서브밋 이미지 패스", imagePaths);
    const formData = new FormData();
    formData.append("image", imagePaths[0]);
    // imagePaths.forEach((image) => {
    //   formData.append("image", image);
    // });
    // console.log("폼데이터", formData);
    dispatch(addImage(formData));
  };
  const onToggle = () => {
    setToggle(!toggle);
  };

  return (
    <form
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onSubmit={onSubmit}
    >
      <ImageDiv>
        <MiddleDiv>
          {imagePaths.length === 0 ? (
            imagedata ? (
              <Image
                src={`http://localhost:3060/${imagedata}`}
                width={150}
                height={150}
              />
            ) : (
              <Image src={basic} />
            )
          ) : (
            <Image
              src={`http://localhost:3060/${imagedata}`}
              width={150}
              height={150}
            />
          )}
          {/* <Image src={basic} /> */}
          {/* {!imagePaths[0] && <Image src={basic} />} */}
          {imagePaths.map((v, i) => (
            <div key={v} style={{ display: "inline-block" }}>
              <PreviewImg
                src={`http://localhost:3060/${v}`}
                style={{ width: "150px", height: "150px" }}
                alt={v}
              />
              <div>
                <button onClick={onRemoveImage(i)}>제거</button>
              </div>
            </div>
          ))}
          <button style={{ display: "none" }} onClick={onClickImageUpload}>
            이미지 업로드
          </button>
          {/* <button type="primary" htmltype="submit" loading={addImageLoading}> */}
          {imagePaths[0] && (
            <button type="primary" htmltype="submit">
              올리기
            </button>
          )}
          <BottomDiv>
            <input
              type="file"
              id="image"
              name="image"
              multiple
              // hidden
              ref={imageInput}
              onChange={onChangeImages}
            />
            {!imagePaths[0] && (
              <label onClick={onToggle} className="image-button" for="image">
                edit
              </label>
            )}
          </BottomDiv>
        </MiddleDiv>
      </ImageDiv>
    </form>
  );
};

export default ResumeImage;

const PreviewImg = styled.img``;

const TestDiv = styled(Image)`
  background-image: url("../public/images/basic.png");
  background-image: url(basic);
  background-size: cover;
  background-position: center;
  width: 150px;
  height: 150px;
  border: 1px #000000 solid;
`;

const BottomDiv = styled.div`
  width: 500px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  label {
    width: 74px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border: 1px solid #8b8b8b;
    border-radius: 5px;
  }

  input {
    display: none;
    margin-left: 180px;
  }

  /* background: #8e2c2c; */
`;

const MiddleDiv = styled.div`
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background: #334eab; */
`;

const ImageDiv = styled.div`
  margin-top: 50px;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;

  /* background: #8e2c2c; */
`;
