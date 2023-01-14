import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { setCart, removeItem } from "../redux/products";
import { useDispatch, useSelector } from "react-redux";
import { rus, geo, eng } from "../languages/components/productCard";
import { BsFillCartCheckFill, BsFillCartDashFill } from "react-icons/bs";

export const ProductCard = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.storeProducts.cart);
  const title = props.name;
  const price = props.price;
  const qnt = 1;

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
      <Link
        to={`/product/${props.name}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Wrapper>
          <Img src={props.img} alt={props.name} />
          <Title>{props.name}</Title>
          <Price>
            {" "}
            {props.price} {language.gel}
          </Price>
        </Wrapper>
      </Link>
      <BottomSection>
        <BottomSectionContainer>
          {cartItems?.find((item) => item.title === props.name) ? (
            <Button onClick={() => dispatch(removeItem(title))}>
              <BsFillCartCheckFill className="button" />
            </Button>
          ) : (
            <Button
              add={true}
              onClick={() => dispatch(setCart({ title, price, qnt }))}
            >
              <BsFillCartCheckFill className="button" />
            </Button>
          )}
          <Link
            to={`/product/${props.name}`}
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <Button id="info">{language.info}</Button>
          </Link>
        </BottomSectionContainer>
      </BottomSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 621px) {
    width: 40vw;
  }
`;

const Wrapper = styled.div`
  width: 15vw;
  height: 20vw;
  border-radius: 0.5vw;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  overflow: hidden;
  gap: 0.25vw;

  @media only screen and (max-width: 621px) {
    width: 40vw;
    box-sizing: border-box;
    text-align: center;
    padding: 0 2vw;
    white-space: nowrap;
    overflow: hidden;
    height: 60vw;
    gap: 1vw;
    border-radius: 1vw;
  }
`;

const Img = styled.img`
  width: 13vw;
  object-fit: skretch;

  @media only screen and (max-width: 621px) {
    width: 40vw;
  }
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 0.9vw;
  margin-bottom: 0.5vw;

  @media only screen and (max-width: 621px) {
    font-size: 2.8vw;
  }
`;

const Price = styled.div`
  font-weight: bold;
  font-size: 0.9vw;
  color: green;

  @media only screen and (max-width: 621px) {
    font-size: 2.8vw;
  }
`;

const BottomSection = styled.div`
  height: 0;
  width: 100%;
  z-index: 220;
`;

const BottomSectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95%;
  position: relative;
  left: 2.5%;
  bottom: 2.5vw;
  overflow: hidden;
  border-radius: 0.5vw;
  gap: 0.5vw;

  @media only screen and (max-width: 621px) {
    width: 100%;
    gap: 0;
    left: 0;
    bottom: 6.5vw;
  }

  #info {
    background: #f9f9f9;
    color: orange;
  }
`;

const Button = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  background: #f3f3f3;
  padding: 0.3vw 0;
  cursor: pointer;
  font-weight: bold;
  color: ${(props) => (props.add ? "#ccc" : "#31a65e")};
  display: flex;
  align-items: center;
  justify-content: center;

  .button {
    font-size: 1.2vw;
    color: ${(props) => (props.add ? "#ccc" : "#31a65e")};

    @media only screen and (max-width: 621px) {
      font-size: 3.6vw;
    }
  }

  @media only screen and (max-width: 621px) {
    height: 6vw;
    font-size: 2.7vw;
  }
`;
