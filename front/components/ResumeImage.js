import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, uploadImage, addImage } from "../actions/post";
import postSlice from "../reducers/post";

import { imageUrl } from "../config/config";
import styled from "styled-components";
import UserImage from "../public/images/UserImage.png";
import Image from "next/image";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ResumeImage = () => {
  const { imagePaths, addImageLoading, addImageDone, addImageError } =
    useSelector((state) => state.post);

  const [action, setAction] = useState(null);

  //   const { me } = useSelector((state) => state.user);
  // const { id } = useSelector((state) => state.user.me);

  const dispatch = useDispatch();

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  useEffect(() => {
    console.log("이펙트", imagePaths);
  }, [imagePaths]);

  const onChangeImages = useCallback((e) => {
    console.log("image", e.target.files);
    const imageFormData = new FormData(); // FormData를 사용하면 back 에서 muler로 처리 가능
    [].forEach.call(e.target.files, (image) => {
      imageFormData.append("image", image);
    });
    console.log("이미지 확인", imageFormData);

    dispatch(uploadImage(imageFormData));
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

  return (
    <form
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onSubmit={onSubmit}
    >
      <ImageDiv>
        <input
          type="file"
          id="image"
          name="image"
          multiple
          // hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <button onClick={onClickImageUpload}>이미지 업로드</button>
        {/* <button type="primary" htmltype="submit" loading={addImageLoading}> */}
        <button type="primary" htmltype="submit">
          올리기
        </button>
        <div>
          {imagePaths.map((v, i) => (
            <div key={v} style={{ display: "inline-block" }}>
              <img
                src={`http://localhost:3060/${v}`}
                style={{ width: "200px" }}
                alt={v}
              />
              <div>
                <button onClick={onRemoveImage(i)}>제거</button>
              </div>
            </div>
          ))}
        </div>
      </ImageDiv>
    </form>
  );
};

export default ResumeImage;

const ImageDiv = styled.div`
  width: 100%;
  height: 200px;
  /* background: #8e2c2c; */
  display: flex;
  justify-content: center;
  align-items: center;
`;
