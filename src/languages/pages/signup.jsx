import React, { useState, useContext } from "react";
import { Mobile, MobileSmall } from "../responsive";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore";

export default function Signup() {
  const { currentUser } = useContext(AuthContext);

  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const register = async (e) => {
    e.preventDefault();

    if (password === confirmpassword) {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
          firstname,
          lastname
        ).then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          await dispatch({ type: "LOGIN", payload: user });
          // create user database
          await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            email: user.email,
            status: "free",
            loginDate: serverTimestamp(),
          });
          const info = collection(db, `users/${user.uid}/userinfo`);
          await setDoc(doc(info, "info"), {
            firstname: firstname,
            lastname: lastname,
            password: password,
            id: user.uid,
            registerDate: serverTimestamp(),
          });
          navigate("/");
          // setTimeout(() => {
          //   window.location.reload();
          // }, 500);
        });
      } catch (error) {
        console.log(error.message);
      }
    } else return setErrorMsg("Password doesn't match");
  };

  return (
    <Container>
      <Title>Sign Up</Title>
      <Form onSubmit={register}>
        <Names>
          <NamesInput
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstname(e.target.value)}
          />
          <NamesInput
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastname(e.target.value)}
          />
        </Names>
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
        <Input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
        <button type="submit" onClick={register} title="Register" />

        <span style={{ color: "red" }}>{errorMsg}</span>
      </Form>
      <LoginText>
        Allready have a Account?{" "}
        <Link
          to="/login"
          id="login"
          style={{ color: "orange", textDecoration: "none" }}
        >
          Log In
        </Link>
      </LoginText>
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

  // ${Mobile({ fontSize: "5vw", letterSpacing: "0.1vw" })}
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.7vw;
  // ${Mobile({ gap: "1.5vw", marginTop: "2vw" })}
`;
const Names = styled.div`
  width: 25vw;
  display: flex;
  justify-content: space-between;
  // ${Mobile({ width: "70vw" })}
`;
const NamesInput = styled.input`
  width: 12.2vw;
  height: 3vw;
  border: none;
  border-radius: 0.2vw;
  padding: 0;
  text-align: center;
  font-size: 1vw;

  ${Mobile({
    width: "34.2vw",
    height: "8vw",
    borderRadius: "0.5vw",
    fontSize: "16px",
  })}

  &:focus {
    outline: none;
  }
`;

const Input = styled.input`
  font-size: 1vw;
  width: 25vw;
  height: 3vw;
  border: none;
  border-radius: 0.2vw;
  padding: 0;
  text-align: center;
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

const LoginText = styled.p`
  text-decoration: none;
  font-size: 0.9vw;
  font-weight: bold;
  ${Mobile({ fontSize: "3vw" })}
`;
