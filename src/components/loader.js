import React from "react";
import styled from "styled-components";
import Loader from "react-js-loader";

export const LoaderAnimation = () => {
  return (
    <LoaderContainer>
      <Loader
        type="rectangular-ping"
        bgColor={"#FFADDF"}
        color={"#FFFFFF"}
        size={120}
      />
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 621px) {
    top: 40vh;
    font-size: 5vw;
  }
`;
