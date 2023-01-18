import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";
import { HiShoppingBag } from "react-icons/hi";
import { CgMenuRight } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo2 from "../assets/smallLogo.png";
import logo from "../assets/logo.png";
import { setOpenCart, setOpenMenu } from "../redux/main";
import { Menu } from "../components/menu";
import { Cart } from "../components/cart";
import Flag from "react-world-flags";
import { setLanguage } from "../redux/main";
import { SendTBCRequest } from "../components/TBCpayment";

export const Header = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const openMenu = useSelector((state) => state.storeMain.menu);
  const openCart = useSelector((state) => state.storeMain.cart);

  const cartItems = useSelector((state) => state.storeProducts.cart);

  // define language
  const currentLang = useSelector((state) => state.storeMain.language);

  // define location
  let locationPath;
  let locationPathButton;

  if (window.location.pathname == "/shop") {
    locationPath = () => navigate("/cart");
    locationPathButton = "კალათა";
  } else if (window.location.pathname == "/cart") {
    locationPath = () => navigate("/checkout");
    locationPathButton = "გაფორმება";
  } else if (window.location.pathname == "/checkout") {
    locationPath = () => navigate("/confirm");
    // locationPath = () => SendTBCRequest(1);
    locationPathButton = "ყიდვა";
  } else {
    locationPath = () => navigate("/shop");
    locationPathButton = "მაღაზია";
  }

  //define route
  let route;
  if (
    window.location.pathname == "/login" ||
    window.location.pathname == "/signup"
  ) {
    route = false;
  } else {
    route = true;
  }

  return (
    <>
      <Menu />
      {/* <Cart /> */}
      <div
        style={{
          width: "100%",
          height: "auto",
          zIndex: 230,
        }}
      >
        <AnimationLine />
        <Container loading={props.loading}>
          <Icons>
            <div>
              <IconLink
                href="https://www.facebook.com/elangeorgia"
                target="_blank"
              >
                <SiFacebook className="icon" color="#4267B2" />
              </IconLink>
              <IconLink
                href="https://www.instagram.com/elan_georgia/"
                target="_blank"
              >
                <SiInstagram className="icon" color="#C13584" />
              </IconLink>
              <IconLink
                href="https://www.youtube.com/channel/UCdYCDx5TGCPKybWe8AQOT9A"
                target="_blank"
              >
                <SiYoutube className="icon" color="#FF0000" />
              </IconLink>
            </div>
          </Icons>
          <MainLogoContainer>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              <MainLogoImg src={logo} alt="logo" />
            </Link>
          </MainLogoContainer>
          <RightSection>
            <Link to="/user" style={{ color: "inherit" }}>
              <CartIcon>
                <FaUserCircle className="userIcon" />
              </CartIcon>
            </Link>
            <CartIcon onClick={() => navigate("/cart")}>
              <div style={{ height: 0 }}>
                <div className="qnt">
                  {cartItems?.length > 0 ? cartItems?.length : 0}
                </div>
              </div>
              <HiShoppingBag className="cartIcon" />
            </CartIcon>
            <CartIcon onClick={() => dispatch(setOpenMenu("0vw"))}>
              <CgMenuRight className="menuIcon" />
            </CartIcon>
          </RightSection>
        </Container>
        {route && (
          <MobileFooterHeader>
            <MobileIcons>
              <div>
                <IconLink
                  href="https://www.facebook.com/elangeorgia"
                  target="_blank"
                >
                  <SiFacebook className="icon" color="#4267B2" />
                </IconLink>
              </div>
              <div>
                <IconLink
                  href="https://www.instagram.com/elan_georgia/"
                  target="_blank"
                >
                  <SiInstagram className="icon" color="#C13584" />
                </IconLink>
              </div>
              <div>
                <IconLink
                  href="https://www.youtube.com/channel/UCdYCDx5TGCPKybWe8AQOT9A"
                  target="_blank"
                >
                  <SiYoutube className="icon" color="#FF0000" />
                </IconLink>
              </div>
            </MobileIcons>
            <ButtonAnimation>
              <StartButton>
                <div
                  onClick={locationPath}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "inherit",
                    textDecoration: "none",
                    gap: "1vw",
                  }}
                >
                  {window.location.pathname != "/cart" &&
                    window.location.pathname != "/checkout" &&
                    cartItems?.length > 0 && <Badge>{cartItems?.length}</Badge>}
                  <RiShoppingBag2Fill className="startIcon" />

                  <span>{locationPathButton}</span>
                </div>
              </StartButton>
            </ButtonAnimation>
            <Languages>
              <div onClick={() => dispatch(setLanguage("geo"))}>
                <Flag
                  code="geo"
                  className="lang"
                  style={
                    currentLang === "geo"
                      ? {
                          filter: "brightness(1.2)",
                        }
                      : { filter: "brightness(0.6)" }
                  }
                />
              </div>
              <div onClick={() => dispatch(setLanguage("eng"))}>
                <Flag
                  code="Usa"
                  className="lang"
                  style={
                    currentLang === "eng"
                      ? {
                          filter: "brightness(1.2)",
                        }
                      : { filter: "brightness(0.6)" }
                  }
                />
              </div>
              <div onClick={() => dispatch(setLanguage("rus"))}>
                <Flag
                  code="Rus"
                  className="lang"
                  style={
                    currentLang === "rus"
                      ? {
                          filter: "brightness(1.2)",
                        }
                      : { filter: "brightness(0.6)" }
                  }
                />
              </div>
            </Languages>
          </MobileFooterHeader>
        )}
      </div>
    </>
  );
};

const Container = styled.div`
  // opacity: ${(props) => (props.loading ? 0 : 1)};
  width: 100%;
  height: 4vw;
  box-shadow: 0px 0.1vw 0.3vw rgba(2, 2, 2, 0.1);
  display: flex;
  align-items: center;
  z-index: 997;
  padding: 0.5vw 0;
  position: fixed;
  top: 0.2vw;
  left: 0;
  background: #fff;
  transition: ease-in-out 300ms;

  @media only screen and (max-width: 621px) {
    box-shadow: 0px 0.3vw 0.9vw rgba(2, 2, 2, 0.1);
    height: 18vw;
    top: 1vw;
  }
`;

const Icons = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  position: relative;
  left: 3vw;
  z-index: 997;

  & > div {
    display: flex;
    gap: 0.5vw;
  }
  @media only screen and (max-width: 621px) {
    display: none;
  }
`;

const IconLink = styled.a`
  .icon {
    font-size: 1.15vw;
    color: ${(props) => props.theme.icon};

    @media only screen and (max-width: 621px) {
      font-size: 3vw;
    }
  }
`;

const MainLogoContainer = styled.div`
  // width: 100%;
  // height: 0;
  display: flex;
  justify-content: center;
  // position: relative;
  // top: 2vw;
  z-index: 998;
  // margin-bottom: 5vw;

  @media only screen and (max-width: 621px) {
    // top: 6vw;
  }
`;

const MainLogoImg = styled.img`
  width: 6vw;
  @media only screen and (max-width: 621px) {
    width: 20vw;
    margin-left: 7vw;
  }
`;

const LogoImg = styled.img`
  width: 20vw;
  @media only screen and (max-width: 621px) {
    width: 50vw;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  right: 3vw;
  gap: 0.5vw;
  z-index: 997;

  @media only screen and (max-width: 621px) {
    right: 6vw;
    gap: 2vw;
  }
`;

const CartIcon = styled.div`
  .userIcon {
    font-size: 1.3vw;
    cursor: pointer;

    @media only screen and (max-width: 621px) {
      font-size: 6vw;
    }
  }
  .cartIcon {
    font-size: 1.4vw;
    cursor: pointer;

    @media only screen and (max-width: 621px) {
      display: none;
    }
  }
  .menuIcon {
    font-size: 1.7vw;
    cursor: pointer;
    margin-left: 2vw;

    @media only screen and (max-width: 621px) {
      font-size: 7vw;
      margin-left: 0;
    }
  }

  .qnt {
    width: 0.8vw;
    height: 0.8vw;
    background: red;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.6vw;
    color: white;
    position: relative;
    left: 0.8vw;
    cursor: pointer;

    @media only screen and (max-width: 621px) {
      display: none;
    }
  }
`;

const MobileFooterHeader = styled.div`
  display: none;

  @media only screen and (max-width: 621px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position fixed;
    bottom: 0;
    left: 0;
    height: 13vw;
    width: 100%;
    z-index: 1000;
    background: #fff;
    box-shadow: 0px -0.3vw 0.9vw rgba(2, 2, 2, 0.1);

    & > div {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3vw;
    }
  }
`;

const MobileIcons = styled.div`
  display: flex;

  & div {
    width: 7vw;
    height: 7vw;
    overflow: hidden;
    background: rgba(254, 70, 184, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10vw;
  }

  .icon {
    color: ${(props) => props.theme.icon};
    font-size: 4vw;
    position: relative;
    top: 0.5vw;
    left: 0.1vw;
  }
`;

const ButtonAnimation = styled.div`
  background: linear-gradient(90deg, pink, blue, red);
  z-index: 10;
  height: 9vw;
  border-radius: 10vw;
  overflow: hidden;

  background: linear-gradient(270deg, #96ffe0, #96deff, #ff96e8, #ffcf96);
  background-size: 800% 800%;

  .startIcon {
    color: white;
    font-size: 3.2vw;
    position: relative;
  }

  & span {
    color: white;
    font-size: 3vw;
    margin-bottom: 0.1vw;
  }

  -webkit-animation: AnimationName 8s ease infinite;
  -moz-animation: AnimationName 8s ease infinite;
  animation: AnimationName 8s ease infinite;

  @-webkit-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-moz-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
const StartButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 92%;
  height: 7vw;
  background: #41b88c;
  border-radius: 10vw;

  font-size: 3vw;

  &:hover {
    filter: brightness(1.1);
  }
`;

const Languages = styled.div`
  border-radius: 1vw 0 0 1vw;
  border-radius: 0.5vw;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  & div {
    width: 7vw;
    height: 7vw;
    overflow: hidden;
    background: rgba(254, 70, 184, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10vw;
  }

  .lang {
    cursor: pointer;
    width: 4vw;
    height: 4vw;
  }
`;

const AnimationLine = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.2vw;
  z-index: 1000;
  background: linear-gradient(270deg, #ffffff, rgba(254, 70, 184), #fff);
  background-size: 600% 600%;

  -webkit-animation: AnimationName 10s ease infinite;
  -moz-animation: AnimationName 10s ease infinite;
  animation: AnimationName 10s ease infinite;

  @-webkit-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-moz-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @media only screen and (max-width: 621px) {
    height: 1vw;
  }
`;

const Badge = styled.div`
  width: 3.5vw;
  height: 3.5vw;
  border-radius: 50%;
  background: red;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5vw;
`;
