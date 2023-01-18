import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { ClearCart, Increment, Decriment } from "../redux/products";
import { setOpenCart } from "../redux/main";
import { MdRemove } from "react-icons/md";
import { removeItem } from "../redux/products";
import { eng, geo, rus } from "../languages/components/cart";
import { useNavigate } from "react-router-dom";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import useWindowDimensions from "../functions/dimensions";
import MaterialButton from "@mui/material/Button";

export const Cart = (props) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { height, width } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.storeProducts.cart);

  const openCart = useSelector((state) => state.storeMain.cart);

  // define mobile open views
  let mobileProps;
  if (openCart === "-40vw") {
    mobileProps = "-95vw";
  } else if (openCart === "1vw") {
    mobileProps = "3vw";
  }

  // define sum
  const DefineSum = () => {
    let sum = [];
    const result = cartItems?.map((item) => {
      return sum.push(item?.quantity * item?.price);
    });
    const initialValue = 0;
    const sumWithInitial = sum.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      initialValue
    );
    return sumWithInitial;
  };

  const sum = DefineSum();

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

  const clearStorage = () => {
    localStorage.removeItem("cart:elan-ecommerce");
    dispatch(ClearCart());
  };

  console.log(cartItems);

  return (
    <>
      <Container openCart={openCart} mobileProps={mobileProps} height={height}>
        <div>
          <Buttons empty={cartItems?.length > 0 ? false : true}>
            <Button clear={true} onClick={() => navigate(-1)}>
              <BsBoxArrowInLeft className="backIcon" />
            </Button>
            <Button clear={true} onClick={clearStorage}>
              <span className="clear">{language.clear}</span>
            </Button>
          </Buttons>
          {cartItems?.length > 0 ? (
            <ItemList>
              {cartItems?.map((item, index, list) => {
                return (
                  <ItemContainer key={index}>
                    <ItemTitle>
                      <span>{item.name}</span>
                    </ItemTitle>
                    <ItemCounter>
                      <IncrDecr onClick={() => dispatch(Decriment(item?.name))}>
                        <span style={{ fontWeight: "bold", color: "red" }}>
                          -
                        </span>
                      </IncrDecr>
                      <span style={{ padding: "0 0.5vw" }}>
                        {item?.quantity}
                        {language.pcs}
                      </span>
                      <IncrDecr onClick={() => dispatch(Increment(item?.name))}>
                        <span style={{ fontWeight: "bold", color: "green" }}>
                          +
                        </span>
                      </IncrDecr>
                    </ItemCounter>
                    <ItemPrice>
                      <span>
                        {item?.price} {language.gel}{" "}
                      </span>
                    </ItemPrice>
                    <TotalPrice>
                      <span>
                        {item?.price * item?.quantity} {language.gel}{" "}
                      </span>
                    </TotalPrice>

                    <ItemRemover
                      onClick={() => dispatch(removeItem(item?.name))}
                    >
                      <MdRemove style={{ color: "red" }} />
                    </ItemRemover>
                  </ItemContainer>
                );
              })}
            </ItemList>
          ) : (
            <Empty>
              <h3 style={{ color: "#e5e5e5", padding: 0, margin: 0 }}>
                {language.empty}
              </h3>
            </Empty>
          )}
        </div>
        {/* <BottomSection> */}
        <Total>
          <b>
            {language.sum}: {sum} {language.gel}
          </b>
        </Total>
        <NextButton
          onClick={() => navigate("/checkout")}
          className="desktopCheckout"
        >
          გაგრძელება
        </NextButton>
        {/* </BottomSection> */}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 40vw;
  min-height: 59vh;
  height: auto;
  background: white;
  border-radius: 0.5vw;
  transition: ease-in-out 350ms;
  z-index: 996;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 0 1vw;
  margin: auto;
  margin-top: 7vw;

  @media only screen and (max-width: 621px) {
    width: 100vw;
    height: ${(props) => props.height};
    top: 18vw;
    position: fixed;
    box-sizing: border-box;
    overflow: hidden;
    padding-top: 3vw;
    margin-top: 0;
  }

  .desktopCheckout {
    @media only screen and (max-width: 621px) {
      display: none;
    }
  }
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25vw;
  overflow-x: scroll;
  height: auto;
  min-height: 15vw;
  align-items: center;
  margin-bottom: 50px;

  @media only screen and (max-width: 621px) {
    gap: 3vw;
    margin-top: 2vw;
    min-height: 50vh;
    
    `;

const Empty = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 15vw;

  @media only screen and (max-width: 621px) {
    min-height: 50vh;
    width: 100vw;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1vw 1vw 0 1vw;

  @media only screen and (max-width: 621px) {
    width: 85vw;
  }
`;

const ItemTitle = styled.div`
  display: flex;
  width: 14vw;
  overflow-x: hidden;
  white-space: nowrap;
  font-weight: bold;

  @media only screen and (max-width: 621px) {
    width: 40vw;
    font-size: 2.7vw;
    margin-right: 1vw;
  }
`;

const ItemPrice = styled.div`
  display: flex;
  justify-content: center;
  width: 5vw;
  color: #ddd;

  @media only screen and (max-width: 621px) {
    width: 10vw;
    font-size: 2.7vw;
  }
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: center;
  width: 6vw;
  font-weight: bold;

  @media only screen and (max-width: 621px) {
    width: 10vw;
    font-size: 2.7vw;
  }
`;

const ItemCounter = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 6vw;
  font-weight: bold;

  @media only screen and (max-width: 621px) {
    width: 20vw;
    font-size: 2.7vw;
  }
`;

const IncrDecr = styled.div`
  width: 1.5vw;
  height: 1.5vw;
  border-radius: 10vw;
  background: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: normal;

  @media only screen and (max-width: 621px) {
    width: 5vw;
    height: 5vw;
    font-size: 2.7vw;
  }
`;

const ItemRemover = styled.div`
  width: 1vw;
  margin-left: 1vw;
  display: flex;
  align-items: center;
  cursor: pointer;

  @media only screen and (max-width: 621px) {
    width: 3vw;
    margin-left: 3vw;
  }
`;

const Total = styled.div`
  padding: 1vw 0;
  border-top: 0.2vw solid #333;
  width: 90%;
  display: flex;
  justify-content: center;
  font-size: 1vw;

  @media only screen and (max-width: 621px) {
    padding: 3vw 0;
    font-size: 3.3vw;
  }
`;

const Buttons = styled.div`
  width: 40vw;
  display: flex;
  justify-content: space-between;

  .backIcon {
    font-size: 1.5vw;
    color: black;
    @media only screen and (max-width: 621px) {
      font-size: 5vw;
    }
  }

  .clear {
    color: ${(props) => (props.empty ? "white" : "red")};
    font-weight: bold;
  }

  @media only screen and (max-width: 621px) {
    width: 92vw;
    margin: 7vw 4vw;
  }
`;

const Button = styled.button`
  width: 48%;
  height: 2vw;
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 0.5vw;
  background: rgba(254, 70, 184, 0.1);

  @media only screen and (max-width: 621px) {
    height: 7vw;
    border-radius: 1.5vw;
  }
`;

const NextButton = styled.div`
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
