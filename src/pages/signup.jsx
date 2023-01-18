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
  const [phone, setPhone] = useState();
  const [city, setCity] = useState("TBILISI");
  const [adress, setAdress] = useState();
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
            firstname: firstname,
            lastname: lastname,
            ["adress"]: { city: city, adress: adress },
            email: user.email,
            phone: phone,
            registerDate: serverTimestamp(),
            loginDate: serverTimestamp(),
          });
          await navigate("/");
          setTimeout(() => {
            window.location.reload();
          }, 100);
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
            required
          />
          <NamesInput
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </Names>
        <Input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Phone Number"
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <Select
          type="text"
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
          required
        >
          <option selected>TBILISI</option>
          <option>BATUMI</option>
          <option>KUTAISI</option>
          <option>ZUGDIDI</option>
          <option>POTI</option>
          <option>TSALENDJIKHA</option>
          <option>RUSTAVI</option>
          <option>AKHALTSIKHE</option>
          <option>SAMTREDIA</option>
          <option>OZURGETI</option>
          <option>ZESTAPONI</option>
          <option>MESTIA</option>
          <option>TELAVI</option>
          <option>MTSKHETA</option>
          <option>GORI</option>
          <option>BORJOMI</option>
          <option>KOBULETI</option>
          <option>SENAKI</option>
          <option>ABASHA</option>
          <option>MARTVILI</option>
          <option>SAGAREJO</option>
          <option>MARNEULI</option>
        </Select>
        <Input
          type="text"
          placeholder="Adress"
          onChange={(e) => setAdress(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmpassword(e.target.value)}
          requred
        />
        <Button type="submit" onClick={register}>
          რეგისტრაცია
        </Button>

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
  margin-top: 3.5vw;
  padding-top: 3vw;
  gap: 2.5vw;

  @media only screen and (max-width: 600px) {
    margin-top: 20vw;
    padding: 5vw;
    gap: 8vw;
  }
`;
const Title = styled.h4`
  font-size: 1.5vw;
  letter-spacing: 0.05vw;

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
const Names = styled.div`
  width: 25vw;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
const NamesInput = styled.input`
  font-size: 1vw;
  width: 12vw;
  height: 2.5vw;
  border: 1px solid #ccc;
  background: white;
  border-radius: 5vw;
  padding: 0;
  text-align: center;
  color: #222;

  @media only screen and (max-width: 600px) {
    width: 30vw;
    height: 7vw;
    border-radius: 1.5vw;
    gap: 4vw;
    padding: 1.5vw;

    font-size: 16px;
  }

  &:focus {
    outline: none;
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
const Select = styled.select`
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
    width: 100%;
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

const LoginText = styled.p`
  text-decoration: none;
  font-size: 0.9vw;
  font-weight: bold;
  ${Mobile({ fontSize: "3vw" })}
`;
