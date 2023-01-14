import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { rus, eng, geo } from "../languages/pages/contact";
import { useSelector, useDispatch } from "react-redux";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";

const Contact = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
        <h2>{language.title}</h2>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            marginTop: "1vw",
          }}
        >
          <Input type="text" placeholder={language.name} />
          <Input type="text" placeholder={language.email} />
          <Textarea type="text" placeholder={language.text} />
          <Button type="submit">{language.button}</Button>
        </form>
        <div style={{ marginTop: "15px" }}>{language.socmedia}</div>
        <div style={{ marginTop: "10px", display: "flex", gap: "15px" }}>
          <a href="https://www.facebook.com/elangeorgia" target="_blank">
            <SiFacebook className="icon" color="#4267B2" />
          </a>
          <a href="https://www.instagram.com/elan_georgia/" target="_blank">
            <SiInstagram className="icon" color="#C13584" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCdYCDx5TGCPKybWe8AQOT9A"
            target="_blank"
          >
            <SiYoutube className="icon" color="#FF0000" />
          </a>
        </div>
      </Wrapper>
    </Container>
  );
};

export default Contact;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5vw;

  @media only screen and (max-width: 600px) {
    margin-top: 25vw;
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
    padding-bottom: 5vw;
  }

  .icon {
    font-size: 1.2vw;

    @media only screen and (max-width: 600px) {
      font-size: 4.5vw;
    }
  }
`;

const Input = styled.input`
  border: none;
  height: 2vw;
  width: 25vw;
  border-radius: 0.2vw;
  text-align: center;

  @media only screen and (max-width: 600px) {
    width: 70vw;
    height: 7vw;
    border-radius: 1.5vw;
    gap: 1.5vw;
    padding: 1.5vw;
    font-size: 16px;
  }

  :focus {
    outline: none;
  }
`;

const Textarea = styled.textarea`
  border: none;
  height: 13vw;
  width: 25vw;
  border-radius: 0.2vw;
  text-align: center;

  @media only screen and (max-width: 600px) {
    width: 70vw;
    height: 50vw;
    padding: 1.5vw;
    border-radius: 1.5vw;
  }

  :focus {
    outline: none;
  }
`;

const Button = styled.button`
  border: none;
  height: 2.5vw;
  width: 25vw;
  border-radius: 0.2vw;
  text-align: center;
  background: green;
  color: white;
  cursor: pointer;

  @media only screen and (max-width: 600px) {
    font-size: 3vw;
    letter-spacing: 0.2vw;
    width: 40vw;
    height: 8vw;
    border-radius: 10vw;
    margin-top: 3vw;
  }

  :hover {
    filter: brightness(1.1);
  }

  :focus {
    outline: none;
  }
`;
