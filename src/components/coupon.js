import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { collection, query, where, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { setCoupon } from "../redux/placeOrder";
import { FaRegEdit } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";

export const Coupon = (props) => {
  const coupon = useSelector((state) => state.storeOrder.coupon);
  const dispatch = useDispatch();
  // define coupon
  const [inputCoupon, setinputCoupn] = React.useState("");

  const getSearchedCoupon = async () => {
    const couponRef = collection(db, "coupons");
    const couponItem = query(couponRef, where("couponName", "==", inputCoupon));
    const querySnapshot = await getDocs(couponItem);
    querySnapshot.forEach((doc) => {
      let dat = doc.data();
      dispatch(setCoupon(dat));
    });
  };

  return (
    <Container desktop={props.desktop}>
      <Wrapper>
        <div style={{ flex: 2, display: "flex", fontWeight: "bold" }}>
          Coupon:
        </div>
        <div style={{ flex: 1, alignItems: "center" }}>
          {coupon?.couponName?.length > 0 ? (
            <div style={{ fontSize: "16px" }}>{coupon?.couponName}</div>
          ) : (
            <Input
              value={inputCoupon}
              placeholder="Enter Coupon"
              onChange={(e) => setinputCoupn(e.target.value)}
            />
          )}
        </div>
        <div
          style={{
            flex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {coupon?.couponName?.length > 0 ? (
            <FaRegEdit
              className="icon"
              onClick={() =>
                dispatch(setCoupon({ couponName: "", couponPercent: 0 }))
              }
            />
          ) : (
            <GiConfirmed className="icon" onClick={getSearchedCoupon} />
          )}
        </div>
      </Wrapper>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        Discount:{" "}
        <b>{((props.sum / 100) * coupon?.couponPercent).toFixed(2)} GEL</b>
        (- {coupon?.couponPercent}
        %)
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: ${(props) => (props.desktop ? "flex" : "none")};
  flex-direction: column;
  align-items: start;
  margin: 1vw 0 1vw 0;
  gap: 1vw;

  @media only screen and (max-width: 621px) {
    display: ${(props) => (props.desktop ? "none" : "flex")};
    align-items: center;
    margin: 5vw 0 2vw 0;
    gap: 5vw;
    width: 100%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 70%;
  min-height: 3vw;

  @media only screen and (max-width: 621px) {
    min-height: 10vw;
  }

  .icon {
    font-size: 26px;
    cursor: pointer;
  }
`;

const Input = styled.input`
  font-size: 16px;
  width: 10vw;
  height: 2vw;
  border: none;
  border-radius: 0.5vw;
  padding: 0 0 0 10px;
  text-align: start;
  background: #fff;
  border: 1px solid #ccc;

  &:focus {
    outline: none;
  }

  @media only screen and (max-width: 621px) {
    width: 30vw;
    height: 7vw;
    letter-spacing: 0.12vw;
    border-radius: 1vw;
  }
`;
