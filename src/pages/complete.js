import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../firebase";
import {
  collection,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const Complete = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const orderTotal = useSelector((state) => state.storeOrder.total);

  // add order in list in firebase
  const buyerName = useSelector((state) => state.storeOrder.buyerName);
  const phoneNumber = useSelector((state) => state.storeOrder.phoneNumber);
  const city = useSelector((state) => state.storeOrder.city);
  const adress = useSelector((state) => state.storeOrder.adress);
  const coupon = useSelector((state) => state.storeOrder.coupon);
  const discount = useSelector((state) => state.storeOrder.discount);
  const delivery = useSelector((state) => state.storeOrder.delivery);
  const comment = useSelector((state) => state.storeOrder.comment);
  const items = useSelector((state) => state.storeOrder.items);

  const products = useSelector((state) => state.storeProducts.list);

  const itemList = useSelector((state) => state.storeProducts.cart);

  // define orders and give number to new order
  const orderL = useSelector((state) => state.storeDashboard.orderItems);
  const orderList = JSON.parse(orderL);
  const orders = orderList?.sort((a, b) => a.orderNumber - b.orderNumber);

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

  // define order sum
  function DefineSum() {
    let arr = [];
    const summ = itemList?.map((item) => {
      const pliused = item.qnt * item.price;
      arr.push(pliused);
    });
    const initialValue = 0;
    const sumWithInitial = arr.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      initialValue
    );
    return sumWithInitial;
  }

  let summ = DefineSum();

  // define ordered items names
  const itemNames = itemList?.map((item) => {
    return item.title;
  });

  // add order to firebase
  async function AddOrderToFirebase() {
    const orderList = collection(db, `orders`);
    await setDoc(doc(orderList, `${num}`), {
      buyer: buyerName,
      phoneNumber: phoneNumber,
      ["adress"]: { city: city, adress: adress },
      items: items,
      coupon: coupon,
      delivery: delivery,
      discount: discount,
      orderNumber: num,
      status: "New Order",
      orderTime: serverTimestamp(),
      sum: summ,
      bank: "TBC e-commerce",
      comment: comment,
    });
    itemList?.map(async (item) => {
      const initialQnt = products?.filter((it) => {
        if (it.name === item.title) {
          const product = doc(db, "products", `${it.name}`);
          updateDoc(product, {
            inStock: it.inStock - item.qnt,
          });
        }
      });
    });
  }
  return (
    <button style={{ height: "100vh" }} onClick={AddOrderToFirebase}>
      add
    </button>
  );
};

export default Complete;
