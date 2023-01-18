import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { rus, eng, geo } from "../languages/pages/returnPolice";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../firebase";
import { collection, setDoc, doc, serverTimestamp } from "firebase/firestore";
import uuid from "react-uuid";

const ReturnPolice = () => {
  // React.useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const [sent, setSent] = React.useState(false);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [text, setText] = React.useState("");

  // add order to firebase
  function sendMessage() {
    var time = serverTimestamp();
    var id = `${email}:${uuid()}`;
    setDoc(doc(db, "notifications", `${id}`), {
      name: name,
      email: email,
      phone: phone,
      text: text,
      date: time,
      type: "returns",
    });
    setSent(true);
  }

  //
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
        <p>{language.return}</p>
        {sent ? (
          <>
            <h3>Message Sent Succesfuly!</h3>
            <Button onClick={() => setSent(false)}>ახალი წერილი</Button>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              marginTop: "1vw",
            }}
          >
            <Input
              type="text"
              placeholder="სახელი, გვარი"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="ელ ფოსტა"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="text"
              placeholder="მობილურის ნომერი"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Textarea
              type="text"
              placeholder="პროდუქციის შესახებ"
              onChange={(e) => setText(e.target.value)}
            />
            <Button onClick={sendMessage}>გაგზავნა</Button>
          </div>
        )}
      </Wrapper>
    </Container>
  );
};

export default ReturnPolice;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2vw;
  margin-top: 3vw;
  margin-bottom: 3vw;
  min-height: 100vh;
  @media only screen and (max-width: 600px) {
    margin-top: 20vw;
  }
`;

const Wrapper = styled.div`
  width: 60vw;
  border-radius: 0.5vw;
  background: #e7f5ff;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 3vw;
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
  height: 7vw;
  width: 25vw;
  border-radius: 0.2vw;
  text-align: center;
  padding-top: 1vw;

  @media only screen and (max-width: 600px) {
    width: 70vw;
    height: 50vw;
    padding: 1.5vw;
    border-radius: 1.5vw;
    padding-top: 3vw;
    font-size: 16px;
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
