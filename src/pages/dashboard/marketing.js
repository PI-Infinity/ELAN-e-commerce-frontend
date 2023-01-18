import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  collection,
  onSnapshot,
  serverTimestamp,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { GiConfirmed } from "react-icons/gi";

export const Marketing = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [coupons, setCoupons] = useState([]);
  /** */
  // import artists from firebase
  React.useEffect(() => {
    const data = onSnapshot(collection(db, "coupons"), (snapshot) => {
      setCoupons(snapshot.docs.map((doc) => doc.data()));
    });
    return data;
  }, []);

  const [couponName, setCouponName] = useState("");
  const [couponPercent, setCouponPercent] = useState("");
  const [couponOwner, setCouponOwner] = useState("");
  const [couponExpier, setCouponExpire] = useState("");

  // add order to firebase
  function AddCoupon() {
    setDoc(doc(db, "coupons", `${couponName}`), {
      couponName: couponName,
      couponPercent: couponPercent,
      owner: couponOwner,
      expire: couponExpier,
    });
  }

  const Clean = () => {
    setCouponName("");
    setCouponPercent("");
    setCouponOwner("");
    setCouponExpire("");
  };

  const removeCoupon = async (p) => {
    await deleteDoc(doc(db, "coupons", `${p}`));
  };

  return (
    <Container>
      <div
        onClick={
          openAdd
            ? () => setOpenAdd(false)
            : () => {
                setOpenAdd(true);
              }
        }
        style={{
          cursor: "pointer",
          background: openAdd ? "orange" : "green",
          borderRadius: "0.2vw",
          height: "2vw",
          width: "6vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          zIndex: "15",
          marginRight: "2vw",
        }}
      >
        {openAdd ? "Close" : "Add Coupon"}
      </div>
      {openAdd && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              marginTop: "3vw",
              marginBottom: "15px",
              width: "55vw",
              flexWrap: "wrap",
              gap: "1vw",
              borderRadius: "0.5vw",
              zIndex: 10,
              background: "#cce9ff",
              padding: "5vw",
              transition: "ease-in-out 250ms",
              boxShadow: "0 0.1vw 0.3vw rgba(0,0,0,0.2)",
            }}
          >
            <b style={{ marginRight: "3px" }}>Add</b>
            <Input
              type="text"
              placeholder="Coupon Name"
              style={{ width: "11vw" }}
              onChange={(e) => setCouponName(e.target.value)}
              value={couponName}
              requred
            />

            <Input
              type="text"
              placeholder="Coupon Percent"
              style={{ width: "4vw" }}
              onChange={(e) => setCouponPercent(e.target.value)}
              value={couponPercent}
            />
            <Input
              type="text"
              placeholder="Coupon Owner"
              style={{ width: "7vw" }}
              onChange={(e) => setCouponOwner(e.target.value)}
              value={couponOwner}
            />
            <Input
              type="text"
              placeholder="Expire Date"
              style={{ width: "3vw" }}
              onChange={(e) => setCouponExpire(e.target.value)}
              value={couponExpier}
            />

            <GiConfirmed
              style={{
                color: "green",
                fontSize: "28px",
                cursor: "pointer",
              }}
              onClick={() => {
                AddCoupon();
              }}
            />
            <div style={{ color: "red" }} onClick={Clean}>
              Clear
            </div>
          </div>
        </div>
      )}
      <div>
        {coupons?.map((item, index) => {
          return (
            <div
              key={index}
              style={{ display: "flex", alignItems: "center", gap: "1vw" }}
            >
              <h4>{item.couponName}</h4>
              <span>{item.couponPercent} %</span>
              <span>{item.owner}</span>
              <span
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => removeCoupon(item.couponName)}
              >
                Remove
              </span>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

const Container = styled.div`
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.1);
  width: 88vw;
  height: 90vh;
  z-index: 8;
  transition: ease-in-out 300ms;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-top: 4vw;
  padding: 2vw 3vw;
  background: #cce9ff;
`;

const Input = styled.input`
  border: none;
  width: 35vw;
  height: 2vw;
  border-radius: 25vw;
  background: #fff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  padding-left: 20px;

  :focus {
    outline: none;
  }
`;
