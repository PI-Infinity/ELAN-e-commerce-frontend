import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";
import { HiShoppingBag } from "react-icons/hi";
import { CgMenuRight } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png";
import { setOpenCart, setOpenMenu } from "../redux/main";
import { Menu } from "../components/menu";
import { Cart } from "../components/cart";

export const Header = () => {
  const dispatch = useDispatch();
  const openMenu = useSelector((state) => state.storeMain.menu);
  const openCart = useSelector((state) => state.storeMain.cart);
  // animate logo on scroll
  // const [transformLogo, setTransformLogo] = useState(0);

  // const handleScroll = () => {
  //   const position = window.pageYOffset;
  //   if (position > 50 && position < 200) {
  //     setTransformLogo(position);
  //   } else if (position < 20) {
  //     setTransformLogo(0);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll, { passive: true });

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const cartItems = useSelector((state) => state.storeProducts.cart);

  if (openMenu !== "-35vw" || openCart !== "-35vw") {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  // if (openCart === "-35vw") {
  //   document.body.style.overflow = "auto";
  // } else {
  //   document.body.style.overflow = "hidden";
  // }
  return (
    <>
      <Menu />
      <Cart />
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "auto",
          top: 0,
          left: 0,
          zIndex: 1000,
          // overflowX: "hidden",
        }}
      >
        <AnimationLine />
        <Container>
          <Icons>
            <div>
              <SiFacebook className="icon" />
              <SiInstagram className="icon" />
              <SiYoutube className="icon" />
            </div>
          </Icons>
          <Logo>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              <img
                style={{
                  width: "7vw",
                  position: "relative",
                  left: "0.1vw",
                  top: "0.1vw",
                }}
                src={logo}
                alt="logo"
              />
            </Link>
          </Logo>
          {/* <LogoTransform>
          <LogoImage transformLogo={transformLogo} src={logo} alt="logo" />
        </LogoTransform> */}
          <RightSection>
            <div>
              <FaUserCircle
                className="cartIcon"
                style={{ fontSize: "1.3vw", marginRight: "0.5vw" }}
              />
            </div>
            <div onClick={() => dispatch(setOpenCart("1vw"))}>
              <div style={{ height: 0 }}>
                <div className="qnt">{cartItems?.length}</div>
              </div>
              <HiShoppingBag className="cartIcon" />
            </div>
            <div onClick={() => dispatch(setOpenMenu("1vw"))}>
              <CgMenuRight
                className="cartIcon"
                style={{ marginLeft: "2vw", fontSize: "1.5vw" }}
              />
            </div>
          </RightSection>
        </Container>
        <MobileFooter>
          <div>
            <SiFacebook className="icon" />
            <SiInstagram className="icon" />
            <SiYoutube className="icon" />
          </div>
          <div>Languages</div>
        </MobileFooter>
      </div>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 3vw;
  // background: #f7f7f7;
  // box-shadow: 0px 1px 2px rgba(148, 160, 175, 0.6);
  display: flex;
  align-items: center;
  z-index: 230;
  padding: 0.5vw 0;

  @media only screen and (max-width: 621px) {
    height: 14vw;
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

  & > div {
    display: flex;
    gap: 0.7vw;

    @media only screen and (max-width: 621px) {
      display: none;
    }
  }

  .icon {
    font-size: 1.1vw;
    color: ${(props) => props.theme.icon};
  }
`;
const Logo = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 2vw;
`;

// const LogoTransform = styled.div`
//   position: absolute;
//   transition: ease-in-out 450ms;
//   left: 2vw;
//   top: 42vw;
//   height: 100%;
// `;

// const LogoImage = styled.img`
//   width: ${(props) => props.transformLogo / 12}%;
// `;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  right: 3vw;

  @media only screen and (max-width: 621px) {
    right: 6vw;
  }

  .cartIcon {
    font-size: 1.4vw;
    cursor: pointer;
    @media only screen and (max-width: 621px) {
      font-size: 6vw;
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
      width: 2.8vw;
      height: 2.8vw;
      font-size: 3.6vw;
      left: 3vw;
    }
  }
`;

const MobileFooter = styled.div`
  display: none;

  @media only screen and (max-width: 621px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position fixed;
    bottom: 0;
    left: 0;
    height: 10vw;
    width: 100%;
    // box-shadow: 0px -2px 2px rgba(255, 255, 255, 0.6);

    & > div {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3vw;

        & > .icon {
            @media only screen and (max-width: 621px) {
                font-size: 5vw;
              }
        }
    }
  }
`;

const AnimationLine = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.2vw;
  z-index: 20;
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
