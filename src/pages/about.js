import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { rus, eng, geo } from "../languages/pages/about";
import { useSelector, useDispatch } from "react-redux";

const About = () => {
  // define language
  let language;
  const lang = useSelector((state) => state.storeMain.language);
  if (lang == "eng") {
    language = eng;
  } else if (lang == "geo") {
    language = geo;
  } else {
    language = rus;
  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <Wrapper>{language.about}</Wrapper>
    </Container>
  );
};

export default About;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2vw;
  min-height: 90vh;

  @media only screen and (max-width: 600px) {
    margin-top: 20vw;
  }
`;

const Wrapper = styled.div`
  width: 60vw;
  height: 37vw;
  border-radius: 0.5vw;
  background: #e7f5ff;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 1vw;
  margin-top: 2vw;

  @media only screen and (max-width: 600px) {
    width: 85vw;
    height: auto;
    border-radius: 1vw;
    gap: 3vw;
    padding: 3vw 3vw 5vw 3vw;
  }

  .icon {
    font-size: 1.2vw;

    @media only screen and (max-width: 600px) {
      font-size: 4.5vw;
    }
  }
`;
