import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Mobile, MobileSmall } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { ClearCart, setCart, Increment, Decriment } from "../redux/products";
import { eng, geo, rus } from "../languages/components/cart";
import { MdRemove } from "react-icons/md";
import { removeItem } from "../redux/products";
import { Link } from "react-router-dom";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import {
  setBuyerName,
  setFirstname,
  setLastname,
  setPhoneNumber,
  setEmail,
  setCity,
  setAdress,
  setOther,
  setCoupon,
  setDiscount,
  setDelivery,
  setItems,
  setComment,
  setBank,
  setItemName,
  setQnt,
  setItemPrice,
  setSum,
} from "../redux/placeOrder.js";
import { Coupon } from "../components/coupon";
import axios from "axios";
import { setServer } from "../redux/server";

const Checkout = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tbcData = useSelector((state) => state.storeServer.server);

  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const us = useSelector((state) => state.storeMain.user);

  let user;
  if (us?.length > 0) {
    user = JSON?.parse(us);
  }

  const info = useSelector((state) => state.storeOrder);
  const cartItems = useSelector((state) => state.storeProducts.cart);

  const DefineSum = () => {
    let sum = [];
    const result = cartItems?.map((item) => {
      return sum.push(item.qnt * item.price);
    });
    const initialValue = 0;
    const sumWithInitial = sum.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      initialValue
    );
    return sumWithInitial;
  };

  const sum = DefineSum();

  const DefineCurrentUserInfo = () => {
    if (currentUser != undefined) {
      dispatch(setBuyerName(user?.firstname + " " + user?.lastname));
      dispatch(setFirstname(user?.firstname));
      dispatch(setLastname(user?.lastname));
      dispatch(setEmail(user?.email));
      dispatch(setPhoneNumber(user?.phone));
      dispatch(setCity(user?.adress.city));
      dispatch(setAdress(user?.adress.adress));
      dispatch(setItems(cartItems));
      dispatch(setBank("TBC e-commerce"));
      dispatch(setSum(sum));
      if (user?.adress.city == "TBILISI") {
        dispatch(setDelivery("6"));
      } else {
        dispatch(setDelivery("10"));
      }
      if (user?.coupon?.length > 0) {
        dispatch(setCoupon(user?.coupon));
      } else {
        dispatch(
          setCoupon({ couponName: "", couponPercent: 0, owner: user?.id })
        );
      }
    }
  };

  useEffect(() => {
    DefineCurrentUserInfo();
  }, []);

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

  // define delivery

  const DefineDelivery = () => {
    let delivery;
    if (info?.city?.toLowerCase() == "tbilisi") {
      delivery = (
        <fieldset onChange={(e) => dispatch(setDelivery(e.target.value))}>
          <legend>Choise Delivery:</legend>
          <div style={{ marginTop: "0.5vw" }}>
            <input
              type="radio"
              id="standart"
              value="6"
              name="delivery"
              defaultChecked={true}
              required
            />
            <span>Standart 6 GEL (1-2 Working Day)</span>
          </div>

          <div style={{ marginTop: "0.5vw" }}>
            <input
              type="radio"
              id="express"
              value="12"
              name="delivery"
              required
            />
            <span>Express 12 GEL (Order Day)</span>
          </div>

          <div style={{ marginTop: "0.5vw" }}>
            <input
              type="radio"
              id="pickup"
              value="0"
              name="delivery"
              required
            />
            <span>Pick Up Free</span>
          </div>
        </fieldset>
      );
    } else if (
      info?.city?.length > 3 &&
      info?.city.toLowerCase() != "tbilisi"
    ) {
      delivery = (
        <fieldset>
          <legend>Delivery:</legend>
          <div>
            <span>Regions 10 GEL (1-4 Working Day)</span>
          </div>
        </fieldset>
      );
    } else {
      delivery = undefined;
    }
    return delivery;
  };

  const Delivery = DefineDelivery();

  let deliveryDefined;
  if (info?.city?.toLowerCase() == "tbilisi") {
    deliveryDefined = info?.delivery;
  } else if (info?.city?.length > 3 && info?.city.toLowerCase() != "tbilisi") {
    deliveryDefined = "10";
  } else {
    deliveryDefined = "";
  }

  //
  const coupon = useSelector((state) => state.storeOrder);

  // define total

  const DefineTotal = () => {
    let tot;
    if (deliveryDefined?.length > 0) {
      tot =
        parseInt(sum) -
        (sum / 100) * info?.coupon?.couponPercent +
        parseInt(deliveryDefined);
    } else {
      tot = parseInt(sum);
    }
    return tot;
  };

  const total = DefineTotal();

  // tbc checkout

  const buyItem = async () => {
    const amount = total;
    const req = await axios.post("api/payments", { amount });
    dispatch(setServer(req.data));
  };

  useEffect(() => {
    buyItem();
  }, [total]);

  return (
    <Container>
      <Back>
        <div
          onClick={() => navigate(-1)}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            color: "inherit",
          }}
        >
          <BsBoxArrowInLeft className="backIcon" />
          <span>Back To Cart</span>
        </div>
      </Back>
      <Wrapper>
        <Form>
          <h3>Checkout Form</h3>
          <Names>
            <Input
              type="text"
              placeholder="Firstname & Lastname"
              onChange={(e) => dispatch(setBuyerName(e.target.value))}
              value={info?.buyerName}
              required
            />
          </Names>
          <Input
            type="text"
            placeholder="Email"
            onChange={(e) => dispatch(setEmail(e.target.value))}
            value={info?.email}
            required
          />
          <Input
            type="text"
            placeholder="Phone Number"
            onChange={(e) => dispatch(setPhoneNumber(e.target.value))}
            value={info?.phoneNumber}
            required
          />
          <Select
            list="cities"
            type="text"
            placeholder="City"
            onChange={(e) => dispatch(setCity(e.target.value))}
            value={info?.city}
            required
            className="select"
          />
          <datalist id="cities" className="selectItems">
            <option>TBILISI</option>
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
          </datalist>

          <Input
            type="text"
            placeholder="Adress"
            onChange={(e) => dispatch(setAdress(e.target.value))}
            value={info?.adress}
            required
          />
          <InputText
            placeholder="Comment"
            onChange={(e) => dispatch(setComment(e.target.value))}
            value={info?.comments}
          />
        </Form>
        <Coupon currentUser={currentUser} sum={sum} />
        <OrderContainer>
          <h2 id="yourOrder">Your Order:</h2>
          <ItemList>
            {cartItems?.map((item, index) => {
              return (
                <ItemContainer key={index}>
                  <ItemName>
                    <span>{item.title}</span>
                  </ItemName>
                  <ItemQnt>
                    <span style={{ marginRight: "0.2vw" }}>{item.qnt}</span>{" "}
                    {language.pcs}
                  </ItemQnt>
                  <ItemPrice>
                    <span>
                      {item.price} {language.gel[0]}.{" "}
                    </span>
                  </ItemPrice>
                  <ItemPrice>
                    <span>
                      {item.price * item.qnt} {language.gel[0]}.{" "}
                    </span>
                  </ItemPrice>
                </ItemContainer>
              );
            })}
          </ItemList>
          <Subtotal>Subtotal: {sum} GEL</Subtotal>
          <Coupon currentUser={currentUser} sum={sum} desktop={true} />
          <div style={{ marginTop: "2vw" }} className="deliveryDesktop">
            {Delivery}
          </div>
          <Total total={true}>Total: {total} GEL</Total>
        </OrderContainer>
      </Wrapper>
      <Button>
        <div
          onClick={
            cartItems?.length > 0 &&
            deliveryDefined?.length > 0 &&
            info?.firstname?.length > 3 &&
            info?.lastname?.length > 3 &&
            info?.city?.length > 2 &&
            info?.adress?.length > 3 &&
            info?.phoneNumber?.length > 6 &&
            info?.email?.length > 6
              ? () => (window.location.href = tbcData?.links[1]?.uri)
              : () => alert("PLease Input fields")
          }
          className="button"
        >
          ყიდვა
        </div>
      </Button>
    </Container>
  );
};

export default Checkout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-height: 100vh;
  padding-top: 7vw;
  padding-bottom: 5vh;

  @media only screen and (max-width: 621px) {
    padding-top: 22vw;
    position: sticky;
    background: white;
    height: auto;
    min-height: 30vh;
  }
`;

const Wrapper = styled.div`
  width: 90vw;
  display: flex;
  align-items: start;
  justify-content: space-evenly;

  @media only screen and (max-width: 621px) {
    flex-direction: column;
    align-items: center;
  }

  .mobile {
    display: none;

    @media only screen and (max-width: 621px) {
      display: flex;
    }
  }
`;

const Title = styled.h4`
  font-size: 1.7vw;
  letter-spacing: 0.05vw;

  @media only screen and (max-width: 621px) {
    display: none;
  }
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.5vw;

  @media only screen and (max-width: 621px) {
    width: 85vw;
    gap: 3vw;
  }
`;
const Names = styled.div`
  width: 25vw;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 621px) {
    width: 85vw;
  }
`;
const NamesInput = styled.input`
  font-size: 1vw;
  width: 12.2vw;
  height: 3vw;
  border: none;
  border-radius: 0.5vw;
  padding: 0;
  text-align: center;
  background: #fff;
  border: 1px solid #ccc;

  &:focus {
    outline: none;
  }

  @media only screen and (max-width: 621px) {
    width: 40vw;
    height: 9vw;
    font-size: 16px;
    letter-spacing: 0.12vw;
    border-radius: 1vw;
  }
`;

const Input = styled.input`
  font-size: 1vw;
  width: 25vw;
  height: 2.5vw;
  border: none;
  border-radius: 0.5vw;
  padding: 0;
  text-align: center;
  background: #fff;
  border: 1px solid #ccc;

  &:focus {
    outline: none;
  }

  @media only screen and (max-width: 621px) {
    width: 85vw;
    height: 9vw;
    font-size: 16px;
    letter-spacing: 0.12vw;
    border-radius: 1vw;
  }
`;
const InputText = styled.textarea`
  font-size: 1vw;
  width: 25vw;
  height: 2vw;
  border: none;
  border-radius: 0.5vw;
  padding: 2vh 0 0 0;
  text-align: center;
  background: #fff;
  border: 1px solid #ccc;

  &:focus {
    outline: none;
  }

  @media only screen and (max-width: 621px) {
    width: 85vw;
    height: 9vw;
    font-size: 16px;
    letter-spacing: 0.12vw;
    border-radius: 1vw;
  }
`;
const Select = styled.input`
  font-size: 1vw;
  width: 25vw;
  height: 3vw;
  border-radius: 0.5vw;
  padding: 0;
  text-align: center;
  background: #fff;
  border: 1px solid #ccc;

  @media only screen and (max-width: 621px) {
    width: 85vw;
    height: 9vw;
    font-size: 16px;
    letter-spacing: 0.12vw;
    border-radius: 1vw;
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
  margin-top: 3vw;
  padding-bottom: 0.1vw;
  cursor: pointer;

  @media only screen and (max-width: 600px) {
    display: none;
  }

  :hover {
    filter: brightness(1.1);
  }
`;

const OrderContainer = styled.div`
  #yourOrder {
    @media only screen and (max-width: 621px) {
      display: none;
    }
  }
  .deliveryDesktop {
    @media only screen and (max-width: 621px) {
      // display: none;
    }
  }
`;

const Back = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1vw;

  .backIcon {
    font-size: 1vw;
    margin-right: 0.5vw;

    @media only screen and (max-width: 621px) {
      margin-right: 1.5vw;
      font-size: 4vw;
    }
  }

  @media only screen and (max-width: 621px) {
    margin: 5vw 0;
  }
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25vw;
  overflow-y: scroll;
  height: auto;

  @media only screen and (max-width: 621px) {
    display: none;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 1vw 1vw 0 0;

  @media only screen and (max-width: 621px) {
    gap: 3vw;
    padding: 1vw 1vw 2vw 0;
  }
`;

const ItemName = styled.div`
  display: flex;
  width: 14vw;
  overflow-x: hidden;

  @media only screen and (max-width: 621px) {
    width: 42vw;
    font-size: 16px;
  }
`;

const ItemQnt = styled.div`
  display: flex;
  justify-content: start;
  width: 4vw;
  font-weight: bold;

  @media only screen and (max-width: 621px) {
    font-size: 16px;
  }
`;
const ItemPrice = styled.div`
  display: flex;
  justify-content: center;
  width: 5vw;

  @media only screen and (max-width: 621px) {
    width: 15vw;
    font-size: 16px;
  }
`;

const Subtotal = styled.div`
  padding-top: 0.5vw;
  border-top: 2px solid #ccc;
  margin-top: 2vw;
  font-weight: ${(props) => props.total && "bold"};

  @media only screen and (max-width: 621px) {
    display: none;
  }
`;
const Total = styled.div`
  padding-top: 0.5vw;
  border-top: 2px solid #ccc;
  margin-top: 2vw;
  font-weight: ${(props) => props.total && "bold"};

  @media only screen and (max-width: 621px) {
    margin-top: 5vw;
    padding: 2vw 0;
    font-size: 18px;
  }
`;
