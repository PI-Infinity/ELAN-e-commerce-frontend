import React, { useContext, useState } from "react";
import styled from "styled-components";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom/";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom/";
import { AuthContext } from "../context/AuthContext";
import { doc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, DetectLanguage, auth } from "../firebase";

export default function Login() {
  //signin with email and password
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        await dispatch({ type: "LOGIN", payload: user });
        const docRef = doc(db, "users", user?.uid);
        await updateDoc(docRef, {
          loginDate: serverTimestamp(),
        });
        await navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 100);
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <Container>
      <Title>Log In</Title>
      <Form onSubmit={handleLogin}>
        <Input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" onClick={handleLogin}>
          შესვლა
        </Button>

        <ForgottPass>Forgott Password?</ForgottPass>
        {error && (
          <span style={{ color: "red" }}>Wrong email or password!</span>
        )}
      </Form>
      <SignupText>
        Don't have a Account?{" "}
        <Link
          to="/signup"
          id="signup"
          style={{ color: "orange", textDecoration: "none" }}
        >
          Register
        </Link>
      </SignupText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin-top: 6.5vw;
  padding-top: 3vw;
  gap: 2.5vw;

  @media only screen and (max-width: 600px) {
    margin-top: 30vw;
    padding: 10vw;
    gap: 8vw;
  }
`;
const Title = styled.h4`
  font-size: 1.5vw;
  letter-spacing: 0.05vw;
  color: ${(props) => props.theme.font};

  @media only screen and (max-width: 600px) {
    font-size: 5vw;
    letter-spacing: 0.1vw;
  }
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.7vw;

  @media only screen and (max-width: 600px) {
    gap 3vw;
  }
`;
const Input = styled.input`
  font-size: 1vw;
  width: 25vw;
  height: 2.5vw;
  border: 1px solid #ccc;
  background: white;
  border-radius: 5vw;
  padding: 0;
  text-align: center;
  color: #222;

  @media only screen and (max-width: 600px) {
    width: 70vw;
    height: 7vw;
    border-radius: 1.5vw;
    gap: 1.5vw;
    padding: 1.5vw;

    font-size: 16px;
  }

  &:focus {
    outline: none;
  }
`;

const Button = styled.div`
  font-size: 0.8vw;
  width: 12vw;
  height: 2vw;
  border-radius: 5vw;
  border: 1px solid #ccc;
  background: #31a65e;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1vw;
  padding-bottom: 0.1vw;
  cursor: pointer;

  @media only screen and (max-width: 600px) {
    font-size: 3vw;
    letter-spacing: 0.2vw;
    width: 40vw;
    height: 8vw;
    border-radius: 10vw;
  }

  :hover {
    filter: brightness(1.1);
  }
`;

const ForgottPass = styled.p`
  padding: 0;
  margin: 0;
  letter-spacing: 0.05vw;
  color: ${(props) => props.theme.font};
  font-size: 0.9vw;

  @media only screen and (max-width: 600px) {
    font-size: 3.3vw;
    letter-spacing: 0.2vw;
  }
`;
const GoogleBtn = styled.button`
  width: 25vw;
  height: 3vw;
  border-radius: 0.2vw;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5vw;
  background: ${(props) => props.theme.filterBg};
  color: ${(props) => props.theme.buttonFont};

  &:hover {
    filter: brightness(0.9);
  }
`;
const SignupText = styled.p`
  text-decoration: none;
  color: ${(props) => props.theme.font};
  font-size: 0.9vw;
  font-weight: bold;

  @media only screen and (max-width: 600px) {
    font-size: 3vw;
    letter-spacing: 0.2vw;
  }
`;
