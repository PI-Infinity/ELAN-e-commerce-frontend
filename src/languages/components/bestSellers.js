import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

export const BestSellers = () => {
  const orderItems = [
    "Lashplex",
    "Supersonic SET",
    "Gel Tint 02",
    "Gel Tint 03",
    "Detox-Mousse",
    "Colour-Fix",
    "Easy-Fix",
    "Lash Curlup Step 1,",
    "Lash CurlUp Step 2",
  ];

  const DefineBestSellers = () => {
    return orderItems?.map((item, index) => {
      return (
        <div
          key={index}
          style={{
            width: "13vw",
            height: "16vw",
            background: "#f1f1f1",
            borderRadius: "0.2vw",
            cursor: "pointer",
          }}
        >
          <h3>{item}</h3>
        </div>
      );
    });
  };
  const bestSellers = DefineBestSellers();

  return (
    <Container>
      <h2>BestSellers</h2>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1 }}>Left</div>
        <div
          style={{
            width: "60vw",
            flex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1vw",
            overflow: "hidden",
          }}
        >
          {bestSellers}
        </div>
        <div style={{ flex: 1 }}>Right</div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 3vw;
  height: auto;
  width: 100%;
  z-index: 15;
  margin-top: 4vw;
  margin-bottom: 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1vw;
`;
