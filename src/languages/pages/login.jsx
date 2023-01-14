import React, { useContext, useState } from "react";
import { Mobile, MobileSmall } from "../responsive";
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
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, DetectLanguage, auth } from "../firebase";

export default function Login() {
  //signin with email and password
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  console.log(dispatch);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
        // window.location.reload();
      })
      .catch((error) => {
        setError(true);
      });
  };

  //signin with google
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    try {
      signInWithPopup(auth, googleProvider).then(async (userCredential) => {
        const user = userCredential.user;
        await dispatch({ type: "LOGIN", payload: user });
        await setDoc(doc(db, "users", user.uid), {
          id: user.uid,
          email: user.email,
          status: "free",
          loginDate: serverTimestamp(),
        });
        navigate("/");
        // setTimeout(() => {
        //   window.location.reload();
        // }, 500);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  //signin with Facebook
  // const facebookProvider = new FacebookAuthProvider();

  // const signInWithFacebook = () => {
  //   signInWithPopup(auth, facebookProvider)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       dispatch({ type: "LOGIN", payload: user });
  //       window.location.reload();
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

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
        <button type="submit" onClick={handleLogin} title="Login" />

        <ForgottPass>Forgott Password?</ForgottPass>
        {error && (
          <span style={{ color: "red" }}>Wrong email or password!</span>
        )}
      </Form>
      <GoogleBtn onClick={signInWithGoogle}>
        <FcGoogle /> Log In with Google
      </GoogleBtn>
      {/* <GoogleBtn onClick={signInWithFacebook}>
        <FaFacebookF /> Log In with Facebook
      </GoogleBtn> */}
      <SignupText>
        Don't have a Account?{" "}
        <Link
          to="/signup"
          id="signup"
          style={{ color: "orange", textDecoration: "none" }}
        >
          Sign Up
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
  margin-top: 4.5vw;
  padding-top: 3vw;
  gap: 2.5vw;
  ${Mobile({
    marginTop: "15.5vw",
    paddingTop: "15.5vw",
    gap: "4.5vw",
    position: "fixed",
    left: "0",
    right: "0",
  })}
`;
const Title = styled.h4`
  font-size: 1.7vw;
  letter-spacing: 0.05vw;
  color: ${(props) => props.theme.font};
  ${Mobile({ fontSize: "5vw", letterSpacing: "0.1vw" })}
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.7vw;
  ${Mobile({ gap: "1.5vw", marginTop: "2vw" })}
`;
const Input = styled.input`
  font-size: 1vw;
  width: 25vw;
  height: 3vw;
  border: none;
  border-radius: 0.2vw;
  padding: 0;
  text-align: center;
  color: ${(props) => props.theme.filterFont};
  border: ${(props) => props.theme.borderBottom};
  ${Mobile({
    fontSize: "16px",
    width: "70vw",
    height: "8vw",
    borderRadius: "0.5vw",
  })}

  &:focus {
    outline: none;
  }
`;

const ForgottPass = styled.p`
  padding: 0;
  margin: 0;
  letter-spacing: 0.05vw;
  color: ${(props) => props.theme.font};
  font-size: 0.9vw;
  ${Mobile({
    fontSize: "3vw",
    margin: "2vw 0 0 0",
  })}
`;
const GoogleBtn = styled.button`
  border: none;
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
  ${Mobile({
    fontSize: "3vw",
    width: "70vw",
    height: "8vw",
    borderRadius: "0.5vw",
    letterSpacing: "0.2vw",
  })}

  &:hover {
    filter: brightness(0.9);
  }
`;
const SignupText = styled.p`
  text-decoration: none;
  color: ${(props) => props.theme.font};
  font-size: 0.9vw;
  font-weight: bold;
  ${Mobile({ fontSize: "3vw" })}
`;
