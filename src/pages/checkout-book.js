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
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

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

const BookCheckout = () => {
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
  const bookLang = useSelector((state) => state.storeOrder.bookLanguage);
  // define orders and give number to new order
  const orderL = useSelector((state) => state.storeDashboard.orderItems);
  const orderList = JSON.parse(orderL);
  const orders = orderList?.sort((a, b) => a.orderNumber - b.orderNumber);

  const DefineCurrentUserInfo = () => {
    if (currentUser != undefined) {
      dispatch(setBuyerName(user?.firstname + " " + user?.lastname));
      dispatch(setFirstname(user?.firstname));
      dispatch(setLastname(user?.lastname));
      dispatch(setEmail(user?.email));
      dispatch(setPhoneNumber(user?.phone));
      dispatch(setCity(user?.adress.city));
      dispatch(setAdress(user?.adress.adress));
      dispatch(setItems({ name: "ELAN Brow Book", language: bookLang }));
      dispatch(setBank("TBC e-commerce"));
      dispatch(setSum(70));
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

  //
  const coupon = useSelector((state) => state.storeOrder.coupon);
  // define total
  const DefineTotal = () => {
    let tot;
    if (coupon?.couponName?.length > 0) {
      tot = info?.sum - (info?.sum / 100) * coupon?.couponPercent;
    } else {
      tot = info?.sum;
    }
    return tot;
  };

  const total = DefineTotal();

  let lastItem;
  if (orders?.length > -1) {
    lastItem = orders[orders?.length - 1];
  }

  // define order number
  let num;
  if (orders?.length < 1) {
    num = 1;
  } else if (orders?.length == 1) {
    num = orders[0]?.orderNumber + 1;
  } else {
    num = lastItem?.orderNumber + 1;
  }

  // add order to firebase
  //
  async function AddOrderToFirebase() {
    const orderList = collection(db, `orders`);
    await setDoc(doc(orderList, `${num}`), {
      buyer: info?.buyerName,
      phoneNumber: info?.phoneNumber,
      ["adress"]: { city: info?.city, adress: info?.adress },
      items: "ELAN Brow Book",
      coupon: info?.coupon,
      discount: info?.discount,
      delivery: "0",
      orderNumber: num,
      status: "Not Finished",
      orderTime: serverTimestamp(),
      sum: total,
      bank: "TBC e-commerce",
      comment: info?.comment,
    });
    localStorage.setItem("orderNumber:elan-ecommerce", JSON.stringify(num));
  }

  // tbc checkout
  const [loading, setLoading] = useState(true);
  const buyItem = async () => {
    const amount = total;
    const req = await axios.post("/api/payments", { amount });
    dispatch(setServer(req.data));
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
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
        <Coupon currentUser={currentUser} sum={info?.sum} />
        <OrderContainer>
          <h2 id="yourOrder">Your Order:</h2>
          <ItemList>
            <ItemContainer>
              <ItemName>
                <span>ELAN Brow Book</span>
              </ItemName>
              <ItemQnt>{bookLang}</ItemQnt>
            </ItemContainer>
          </ItemList>
          <Subtotal>Subtotal: {info?.sum} GEL</Subtotal>
          <Coupon currentUser={currentUser} sum={info?.sum} desktop={true} />
          <Total total={true}>Total: {total} GEL</Total>
        </OrderContainer>
      </Wrapper>
      {loading ? (
        <Button load={true}>იტვირთება...</Button>
      ) : (
        <Button>
          <div
            onClick={
              info?.firstname?.length > 3 &&
              info?.lastname?.length > 3 &&
              info?.city?.length > 2 &&
              info?.adress?.length > 3 &&
              info?.phoneNumber?.length > 6 &&
              info?.email?.length > 6
                ? async () => {
                    await AddOrderToFirebase();
                    window.location.href = tbcData?.links[1]?.uri;
                  }
                : () => alert("PLease Input fields")
            }
            className="button"
          >
            ყიდვა
          </div>
        </Button>
      )}
    </Container>
  );
};

export default BookCheckout;

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
  background: ${(props) => (props.load ? "#ccc" : "#31a65e")};
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
