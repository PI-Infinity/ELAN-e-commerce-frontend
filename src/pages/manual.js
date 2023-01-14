import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  onSnapshot,
  collection,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const Fixing = () => {
  const { currentUser } = useContext(AuthContext);
  const orderL = useSelector((state) => state.storeDashboard.orderItems);
  const orderList = JSON.parse(orderL);

  const orders = orderList?.sort((a, b) => a.orderNumber - b.orderNumber);

  const order = orders?.find((item) => item.orderNumber == 1);

  const [items, setItems] = React.useState([]);
  const [number, setNumber] = React.useState("");

  const getItems = () => {
    const data = onSnapshot(
      collection(db, "orders", number, "items"),
      (snapshot) => {
        console.log(snapshot.docs.map((doc) => doc.data()));
        setItems(snapshot.docs.map((doc) => doc.data()));
      }
    );
  };

  console.log(items);

  const addFirebase = async () => {
    const docRef = doc(db, "orders", number);
    await updateDoc(docRef, {
      ["items"]: items,
    });
    DeleteOrder(number, items);
  };

  const DeleteOrder = (order, items) => {
    const subcoll = collection(db, "orders", `${order}`, "items");
    items?.map((item, index) => {
      deleteDoc(doc(subcoll, `${item.name}`));
    });
  };

  return (
    <Container>
      <div>
        <input
          placeholder="number"
          type="number"
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <button onClick={getItems}>fixing</button>
      <button onClick={addFirebase}>add</button>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  background: green;
  width: 100%;
  padding: 10vw 0;
`;
