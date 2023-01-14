import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../redux/products";
import { geo, eng, rus } from "../languages/components/filter";

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.storeProducts.filter);

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
      <List>
        <div
          className={filter === "all" ? "active" : "item"}
          onClick={() => dispatch(setFilter("all"))}
        >
          {language.all}
        </div>
        <div
          className={filter === "tinting" ? "active" : "item"}
          onClick={() => dispatch(setFilter("tinting"))}
        >
          {language.tinting}
        </div>
        <div
          className={filter === "Lamination" ? "active" : "item"}
          onClick={() => dispatch(setFilter("Lamination"))}
        >
          {language.lamination}
        </div>
        <div
          className={filter === "Flexing" ? "active" : "item"}
          onClick={() => dispatch(setFilter("Flexing"))}
        >
          {language.flexing}
        </div>
        <div
          className={filter === "Lighting" ? "active" : "item"}
          onClick={() => dispatch(setFilter("Lighting"))}
        >
          {language.lighting}
        </div>
        <div
          className={filter === "Decoration" ? "active" : "item"}
          onClick={() => dispatch(setFilter("Decoration"))}
        >
          {language.decoration}
        </div>
        <div
          className={filter === "Care" ? "active" : "item"}
          onClick={() => dispatch(setFilter("Care"))}
        >
          {language.care}
        </div>
        <div
          className={filter === "tandb" ? "active" : "item"}
          onClick={() => dispatch(setFilter("tandb"))}
        >
          {language.accessoriesAndBurshes}
        </div>
      </List>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2vw 0 1vw 0;
  x-index: 10;

  @media only screen and (max-width: 621px) {
    padding: 0;
  }
`;
const List = styled.div`
  width: 87vw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  font-size: 0.8vw;
  letter-spacing: 0.02vw;
  font-weight: bold;
  list-style: none;
  background: #ffebf8;
  border-radius: 0.3vw;
  padding: 0.7vw 0vw;

  @media only screen and (max-width: 621px) {
    font-size: 2.8vw;
    padding: 2.1vw 0 2.1vw 3vw;
    overflow-x: scroll;
    justify-content: start;
    gap: 3vw;
  }

  .item {
    color: ${(props) => props.theme.icon};
    background: rgba(255, 255, 255, 1);
    padding: 0.3vw 1vw;
    border-radius: 0.3vw;
    white-space: nowrap;

    @media only screen and (max-width: 621px) {
      padding: 1vw 3vw;
      width: auto;
    }
  }
  .active {
    background: #ffc6e9;
    color: ${(props) => props.theme.icon};
    // border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 0.3vw;
    padding: 0.3vw 1vw;
    white-space: nowrap;

    @media only screen and (max-width: 621px) {
      padding: 1vw 3vw;
      width: auto;
    }
  }
`;
