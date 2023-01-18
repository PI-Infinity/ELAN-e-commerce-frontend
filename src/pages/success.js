import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  collection,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
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
import { ClearCart, setCartList } from "../redux/products";
import axios from "axios";
import emailjs from "@emailjs/browser";

const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const payId = localStorage.getItem("payId:elan-ecommerce");

  const [payData, setPayData] = React.useState("");

  const getPaymentDetails = () => {
    fetch("http://localhost:5000/api/payments", {
      method: "GET",
      headers: { "Content-Type": "aplication/json" },
      // body: JSON.stringify("body"),
    })
      .then((data) => {
        data.json().then((response) => {
          console.log(response);
          setPayData(response);
        });
      })
      .catch((err) => console.log(err));
    // console.log(req);
    // setPayData(req.data);
  };

  useEffect(() => {
    getPaymentDetails();
  }, []);

  const orderNumber = localStorage.getItem("orderNumber:elan-ecommerce");
  const cart = JSON.parse(localStorage.getItem("cart:elan-ecommerce"));
  const orderL = useSelector((state) => state.storeDashboard.orderItems);
  const orderList = JSON.parse(orderL);
  const orders = orderList?.sort((a, b) => a.orderNumber - b.orderNumber);
  const itemList = useSelector((state) => state.storeProducts.cart);
  const products = useSelector((state) => state.storeProducts.list);

  let lastItem;
  if (orders?.length > -1) {
    lastItem = orders[orders?.length - 1];
  }

  let num;
  if (orders?.length < 1) {
    num = 1;
  } else if (orders?.length == 1) {
    num = orders[0]?.orderNumber + 1;
  } else {
    num = lastItem?.orderNumber + 1;
  }

  const UpdateOrder = async () => {
    const orderRef = doc(db, "orders", `${orderNumber}`);
    const querySnapshot = await updateDoc(orderRef, {
      status: "New Order",
    });
    itemList?.map(async (item) => {
      const initialQnt = products?.filter((it) => {
        if (it.name === item.name) {
          const product = doc(db, "products", `${it.name}`);
          updateDoc(product, {
            inStock: it.inStock - cart[0]?.quantity,
          });
        }
      });
    });
  };

  useEffect(() => {
    UpdateOrder();
  }, []);

  useEffect(() => {
    localStorage.removeItem("cart:elan-ecommerce");
    localStorage.removeItem("orderNumber:elan-ecommerce");
    dispatch(setCartList([]));
  }, []);
  // const form = useRef();
  // send email

  const us = useSelector((state) => state.storeMain.user);

  let user;
  if (us?.length > 0) {
    user = JSON?.parse(us);
  }

  console.log(user);

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    emailjs
      .sendForm(
        "service_rickopv",
        "template_euz0voj",
        e.target,
        "mwCGrFwRs3cO4PO6k"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      Thank You! გადახდა წარმატებით შესრულდა
      <form onSubmit={sendEmail}>
        <label>Name</label>
        <input
          type="text"
          name="user_name"
          value={user?.firstname + " " + user?.lastname}
        />
        <label>Email</label>
        <input
          type="email"
          name="user_email"
          value="tornike.pirtakhia@gmail.com"
        />
        <label>Message</label>
        <textarea name="message" value={JSON.stringify(cart)} />
        <input type="submit" value="Send" />
      </form>
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        მთავარზე დაბრუნება
      </Button>
    </div>
  );
};

export default Success;

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
