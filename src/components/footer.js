import React from "react";
import logo from "../assets/logo.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { rus, geo, eng } from "../languages/components/footer";
import { useSelector } from "react-redux";
import { SiVisa, SiMastercard } from "react-icons/si";

export const Footer = () => {
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
  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <Logo src={logo} alt="logo" />
        </Link>
        <Links>
          <Link
            to="/delivery"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item>{language.delivery}</Item>
          </Link>
          <Link
            to="/terms"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item>{language.termsAndRules}</Item>
          </Link>
          <Link
            to="/return"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item>{language.return}</Item>
          </Link>
          <Link
            to="/privacy"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item>{language.private}</Item>
          </Link>
        </Links>
        <PayCards>
          <SiVisa color="white" className="cardImg" />
          <SiMastercard color="orange" className="cardImg" />
        </PayCards>
      </Wrapper>
      <MostFooter>
        <span
          dangerouslySetInnerHTML={{ __html: "&copy;" }}
          style={{ marginRight: "0.5vw" }}
        />
        ELAN Georgia - Professional Line
      </MostFooter>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 12vw;
  background: #ffebf8;
  position: relative;
  top: 1.1vw;

  @media only screen and (max-width: 621px) {
    margin-bottom: 10vw;
    height: 55vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 3vw;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 9vw;

  @media only screen and (max-width: 621px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    height: 45vw;
    gap: 3vw;
  }
`;

const Logo = styled.img`
  width: 7vw;

  @media only screen and (max-width: 621px) {
    width: 18vw;
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5vw;

  @media only screen and (max-width: 621px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5vw;
  }
`;

const Item = styled.div`
  font-size: 0.8vw;
  background: #ffc6e9;
  border-radius: 0.2vw;
  padding: 0.5vw 0.3vw;
  width: 12vw;
  text-align: center;

  :hover {
    filter: brightness(1.1);
  }

  @media only screen and (max-width: 621px) {
    width: 36vw;
    font-size: 2.4vw;
    border-radius: 0.6vw;
    padding: 1.5vw 0.9vw;
  }
`;

const PayCards = styled.div`
  display: flex;
  gap: 1vw;
  align-items: center;

  .cardImg {
    font-size: 3vw;

    @media only screen and (max-width: 621px) {
      font-size: 9vw;
    }
  }
`;

const MostFooter = styled.div`
  background: blue;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3vw;
  padding-left: 3vw;
  color: #111;
  background: #cce9ff;

  @media only screen and (max-width: 621px) {
    height: 9vw;
    font-size: 3vw;
    letter-spacing: 0.15vw;
  }
`;
