import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { ClearCart, setCart, Increment, Decriment } from "../redux/products";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { rus, geo, eng } from "../languages/components/menu";
import { Link } from "react-router-dom";
import { setOpenMenu } from "../redux/main";

export const Menu = (props) => {
  const openMenu = useSelector((state) => state.storeMain.menu);
  // define mobile open views
  let mobileProps;
  if (openMenu === "-20vw") {
    mobileProps = "-75vw";
  } else if (openMenu === "1vw") {
    mobileProps = "3vw";
  }

  const navigate = useNavigate();
  const mainDispatch = useDispatch();

  const { currentUser, dispatch } = useContext(AuthContext);

  const logout = async () => {
    await dispatch({ type: "LOGOUT" });
    await mainDispatch(setOpenMenu("-20vw"));
    await navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

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
    <>
      {openMenu === "-20vw" ? null : (
        <Bg onClick={() => mainDispatch(setOpenMenu("-20vw"))}></Bg>
      )}
      <Container openMenu={openMenu} mobileProps={mobileProps}>
        <ItemList>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={() => mainDispatch(setOpenMenu("-20vw"))}
          >
            <Item>{language.home}</Item>
          </Link>
          <Link
            to="/user"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={() => mainDispatch(setOpenMenu("-20vw"))}
          >
            <Item>{language.myPage}</Item>
          </Link>
          <Link
            to="/shop"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={() => mainDispatch(setOpenMenu("-20vw"))}
          >
            <Item>{language.shop}</Item>
          </Link>
          <Link
            to="/education"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={() => mainDispatch(setOpenMenu("-20vw"))}
          >
            <Item>{language.education}</Item>
          </Link>
          <Link
            to="/artists"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={() => mainDispatch(setOpenMenu("-20vw"))}
          >
            <Item>{language.artists}</Item>
          </Link>
          <Link
            to="/contact"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={() => mainDispatch(setOpenMenu("-20vw"))}
          >
            <Item>{language.contact}</Item>
          </Link>
          <Link
            to="/about"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={() => mainDispatch(setOpenMenu("-20vw"))}
          >
            <Item>{language.about}</Item>
          </Link>
        </ItemList>
        {currentUser == undefined ? (
          <Item
            onClick={() => {
              mainDispatch(setOpenMenu("-20vw"));
              console.log("close");
              navigate("/login");
            }}
            style={{ marginTop: "3vw" }}
          >
            Log In
          </Item>
        ) : (
          <Item onClick={logout} style={{ marginTop: "3vw" }}>
            {language.logout}
          </Item>
        )}
      </Container>
    </>
  );
};

const Bg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(2, 2, 2, 0.2);
  filter: blur(5rem);
  cursor: pointer;
  z-index: 1001;
`;

const Container = styled.div`
  width: 15vw;
  height: 38vw;
  background: white;
  border-radius: 0.5vw;
  position: fixed;
  right: ${(props) => props.openMenu};
  top: 5.5vw;
  z-index: 1002;
  transition: ease-in 350ms;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 1vw 2vw 1vw;

  @media only screen and (max-width: 621px) {
    right: ${(props) => props.mobileProps};
    top: 17vw;
    width: 50vw;
    height: 100vw;
    border-radius: 1.5vw;
    gap: 3vw;
    padding: 3vw 3vw 6vw 3vw;
  }
`;

const ItemList = styled.div`
  margin-top: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5vw;

  @media only screen and (max-width: 621px) {
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
  cursor: pointer;

  @media only screen and (max-width: 621px) {
    font-size: 3vw;
    border-radius: 0.6vw;
    padding: 1.5vw 0.9vw;
    width: 40vw;
  }

  :hover {
    filter: brightness(1.1);
  }
`;
