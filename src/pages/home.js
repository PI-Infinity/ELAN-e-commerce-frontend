import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import shop from "../assets/shop.jpg";
import book from "../assets/book.jpg";
import events from "../assets/events.jpg";
import artists from "../assets/artists.jpg";
import { BestSellers } from "../components/bestSellers";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { rus, eng, geo } from "../languages/pages/home";
import logo from "../assets/logo.png";
import { LoaderAnimation } from "../components/loader";

const Home = () => {
  const [loading, setLoading] = React.useState(true);
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

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  setTimeout(() => {
    setLoading(false);
  }, 500);

  return (
    <>
      {loading && <LoaderAnimation />}
      <Container loading={loading}>
        {loading ? (
          <div
            style={{
              height: "90vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                alignItems: "center",
                // overflow: "hidden",
              }}
            >
              <MainContent>
                <Card>
                  <Title>
                    <span>{language.shop}</span>
                  </Title>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}
                  >
                    <Link to="/shop">
                      <img
                        src={shop}
                        alt="shop"
                        style={{ objectFit: "cover", width: "100%" }}
                      />
                    </Link>
                  </div>
                </Card>
                <Card>
                  <Title>
                    <span>{language.events}</span>
                  </Title>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}
                  >
                    <Link to="/events">
                      <img
                        src={events}
                        alt="events"
                        style={{ objectFit: "cover", width: "100%" }}
                      />
                    </Link>
                  </div>
                </Card>
                <Card>
                  <Title>
                    <span>{language.book}</span>
                  </Title>
                  <Link to="/book">
                    <img
                      src={book}
                      alt="shop"
                      style={{
                        objectFit: "cover",
                        width: "105%",
                        height: "105%",
                      }}
                    />
                  </Link>
                </Card>
                <Card>
                  <Title>
                    <span>{language.artists}</span>
                  </Title>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}
                  >
                    <Link to="/artists">
                      <img
                        src={artists}
                        alt="shop"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </Link>
                  </div>
                </Card>
              </MainContent>
              <ButtonAnimation>
                <StartButton>
                  <Link
                    to="/shop"
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    <RiShoppingBag2Fill
                      style={{
                        color: "white",
                        fontSize: "1.5vw",
                        position: "relative",
                        right: "2vw",
                      }}
                    />
                    <span
                      style={{
                        color: "white",
                        fontSize: "1vw",
                        marginBottom: "0.1vw",
                      }}
                    >
                      {language.start}
                    </span>
                  </Link>
                </StartButton>
              </ButtonAnimation>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Home;

const Container = styled.div`
  height: 100%;
  opacity: ${(props) => (props.loading === true ? "0" : "1")};
  min-height: 100vh;
  padding-top: 5vw;
  transition: ease-in-out 300ms;

  @media only screen and (max-width: 621px) {
    padding-bottom: 5vw;
  }
`;

const MainContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 5.5vw;
  width: 94vw;
  z-index: 10;

  @media only screen and (max-width: 621px) {
    flex-direction: column;
    margin-top: 22vw;
    gap: 7vw;
  }

  & > div {
    width: 20vw;
    height: 20vw;
    border-radius: 0.5vw;
    overflow: hidden;
    box-shadow: 0.57vw -0.57vw 0 #ffaddf;
    cursor: pointer;
    border: 2px solid white;

    @media only screen and (max-width: 621px) {
      width: 80vw;
      height: 80vw;
      border-radius: 1vw;
      box-shadow: 2vw -2vw 0 #ffaddf;
    }
  }
`;
const MainContentMobileSlider = styled.div`
  display: none;

  @media only screen and (max-width: 621px) {
    display: flex;
    padding: 3vw 0;
  }

  & > div {
    display: none;

    @media only screen and (max-width: 621px) {
      width: 80vw;
      height: 60vw;
      border-radius: 1.5vw;
      background: red;
      display: flex;
    }
  }
`;

const TopSellers = styled.div`
  margin-top: 3vw;
  height: 15vw;
  width: 100vw;
  background: rgba(255, 255, 255, 0.3);
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  transition: ease-in 150ms;
  z-index: 10;

  &:hover {
    filter: brightness(1.1);
  }
`;
const ButtonAnimation = styled.div`
  background: linear-gradient(90deg, pink, blue, red);
  padding: 0.3vw;
  z-index: 10;
  margin-top: 6vw;
  border-radius: 0.3vw;
  overflow: hidden;

  background: linear-gradient(270deg, #96ffe0, #96deff, #ff96e8, #ffcf96);
  background-size: 800% 800%;

  @media only screen and (max-width: 621px) {
    display: none;
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
  width: 15vw;
  height: 3vw;
  background: #25a45c;
  border-radius: 0.3vw;

  &:hover {
    filter: brightness(1.1);
  }
`;

const Title = styled.div`
  height: 0;
  position: relative;
  top: 1.5vw;
  right: 1vw;

  & > span {
    background: rgba(255, 255, 255, 0.7);
    padding: 0.4vw 1vw 0.5vw 1vw;
    font-weight: bold;
    font-style: italic;
    border-radius: 0.2vw;

    @media only screen and (max-width: 621px) {
      padding: 1vw 3vw 1vw 3vw;
      font-size: 3.5vw;
      border-radius: 1vw;
    }
  }

  @media only screen and (max-width: 621px) {
    top: 4vw;
    right: 3vw;
  }
`;

const BackgraundAnimation = styled.div`
  position: absolute;
  left: 22.5vw;
  height: 5vw;
  width: 5vw;
  border-radius: 120vw;
  position: absolute;
  top: 1vw;
  margin-top: 3vw;
  background: linear-gradient(270deg, #ffffff, #d2f9ff, #ffffff);
  background-size: 600% 600%;

  @media only screen and (max-width: 621px) {
    height: 15vw;
    width: 15vw;
    left: 66vw;
    top: 3vw;
  }

  -webkit-animation: AnimationName 6s ease infinite;
  -moz-animation: AnimationName 6s ease infinite;
  animation: AnimationName 6s ease infinite;

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
