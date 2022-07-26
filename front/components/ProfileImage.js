import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPost,
  uploadImage,
  addImage,
  removeCurrentImage,
} from "../actions/post";
import postSlice from "../reducers/post";
import basic from "../public/images/basic.png";
import Router, { useRouter } from "next/router";

import styled from "styled-components";
import Image from "next/image";
import { backendUrl } from "../config/config";

const ProfileImage = ({ imagedata, setImageData }) => {
  const route = useRouter();
  const dispatch = useDispatch();
  const { imagePaths, addImageDone, addImageError } = useSelector(
    (state) => state.post
  );
  const me = useSelector((state) => state.user.me);
  const [action, setAction] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [test, setTest] = useState("false");
  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  useEffect(() => {
    setTest(PreviewImg);
  }, [PreviewImg]);

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

  const onSubmit = useCallback(
    (e) => {
      console.log("서브밋 이미지 패스", imagePaths);
      const formData = new FormData();
      formData.append("image", imagePaths[0]);
      dispatch(addImage(formData));
    },
    [imagePaths]
  );

  const onToggle = useCallback(() => {
    setToggle(!toggle);
  }, [toggle]);
  const myLoader = ({ src }) => {
    return `${imagedata}`; // aws s3
    // return `${backendUrl}${imagedata}`; // dev
  };

  const onRemoveCurrentImage = useCallback(() => {
    dispatch(removeCurrentImage({ UserId: route.query.id }));
    setImageData(null);
  }, [route.query.id]);

  return (
    <MainDiv>
      <form
        style={{ margin: "10px 0 20px" }}
        encType="multipart/form-data"
        onSubmit={onSubmit}
      >
        <div style={{ height: "100px" }} />
        <ImageDiv>
          <MiddleDiv>
            {imagePaths.length === 0 ? (
              imagedata ? (
                <Image
                  loader={myLoader}
                  src={`${imagedata}`} // aws s3
                  // src={`${backendUrl}${imagedata}`} // dev
                  width={150}
                  height={150}
                />
              ) : (
                <Image
                  src={basic}
                  width={150}
                  height={150}
                  style={{ zIndex: "0" }}
                />
              )
            ) : (
              <Image
                loader={myLoader}
                src={`${imagedata}`} // aws s3
                // src={`${backendUrl}${imagedata}`} // dev
                width={150}
                height={150}
              />
            )}
            {/* <Image src={basic} /> */}
            {/* {!imagePaths[0] && <Image src={basic} />} */}

            <button style={{ display: "none" }} onClick={onClickImageUpload}>
              이미지 업로드
            </button>
            {/* <button type="primary" htmltype="submit" loading={addImageLoading}> */}
            {imagePaths.map((v, i) => (
              <div key={v} style={{ display: "inline-block" }}>
                <Image
                  // <PreviewImg
                  loader={({ src }) => `${v}`}
                  src={`${v}`}
                  width={150}
                  height={150}
                  // src={`${backendUrl}/${v}`} // dev
                  // alt={v}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CloseImageButton onClick={onRemoveImage(i)}>
                    Close
                  </CloseImageButton>
                </div>
              </div>
            ))}
            <div style={{ marginTop: "20px" }}>
              {imagePaths[0] && (
                <AddImageButton type="primary" htmltype="button">
                  Upload
                </AddImageButton>
              )}
            </div>
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
              {!imagedata ? (
                imagePaths.length === 1 ? (
                  ""
                ) : (
                  <label
                    onClick={onToggle}
                    className="image-button"
                    for="image"
                  >
                    edit
                  </label>
                )
              ) : (
                <RemoveImageButton type="button" onClick={onRemoveCurrentImage}>
                  remove
                </RemoveImageButton>
              )}
            </BottomDiv>
          </MiddleDiv>
        </ImageDiv>
      </form>
    </MainDiv>
  );
};

export default ProfileImage;

const RemoveImageButton = styled.button`
  margin-top: 0.78vw;
  width: 3.85vw;
  height: 0.94vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 0.05vw solid #8b8b8b;
  border-radius: 0.26vw;
  :hover {
    background: #eeeeee;
  }
  cursor: pointer;
`;
const CloseImageButton = styled.button`
  margin-top: 0.78vw;
  width: 3.85vw;
  height: 0.94vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 0.05vw solid #8b8b8b;
  border-radius: 0.26vw;
  :hover {
    background: #eeeeee;
  }
  cursor: pointer;
`;

const AddImageButton = styled.button`
  width: 3.85vw;
  height: 0.94vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 0.05vw solid #8b8b8b;
  border-radius: 0.26vw;
  :hover {
    background: #eeeeee;
  }
  cursor: pointer;
`;

const MainDiv = styled.div`
  width: auto;
  height: 26.04vw;
`;

const PreviewImg = styled(Image)``;

const BottomDiv = styled.div`
  width: 26.04vw;
  height: 2.6vw;

  display: flex;
  justify-content: center;
  align-items: center;

  label {
    width: 3.85vw;
    height: 1.98vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border: 0.05vw solid #8b8b8b;
    border-radius: 0.26vw;
    :hover {
      background: #eeeeee;
    }
    cursor: pointer;
  }

  input {
    display: none;
    margin-left: 9.38vw;
  }

  /* background: #8e2c2c; */
`;

const MiddleDiv = styled.div`
  width: 26.04vw;
  height: 15.63vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background: #334eab; */
`;

const ImageDiv = styled.div`
  margin-top: 2.6vw;
  width: 100%;
  height: 13.02vw;
  display: flex;
  justify-content: center;
  align-items: center;

  /* background: #8e2c2c; */
`;
