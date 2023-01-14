import React from "react";
import Styled from "styled-components";

export const Filter = (props) => {
  return (
    <Container>
      <FilterContainer>
        <span
          onClick={() => props.setFilter("All")}
          filter={props.filter}
          className={props.filter === "All" ? "active" : "item"}
        >
          ALL
        </span>
        <span
          onClick={() => props.setFilter("Tbilisi")}
          filter={props.filter}
          className={props.filterr}
          className={props.filter === "Tbilisi" ? "active" : "item"}
        >
          TBILISI
        </span>
        <span
          onClick={() => props.setFilter("Batumi")}
          filter={props.filter}
          className={props.filterr}
          className={props.filter === "Batumi" ? "active" : "item"}
        >
          BATUMI
        </span>
      </FilterContainer>
    </Container>
  );
};

const Container = Styled.div`
  background: #FFEBF8;
  width: 65.7vw;
  padding: 10px 0;
  border-radius: 10px;
  display: flex;
  gap: 5px;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-left: 30px;

  @media only screen and (max-width: 1100px) {
    width: 80vw;
    padding: 5px 15px;
  }
`;

const FilterContainer = Styled.div`
    width: 100%;
    margin: 5px;
    display: flex;
    justify-content: center;
    gap: 10px;

    @media only screen and (max-width: 1100px) {
    
    }

    & > .item {
      width: 120px;
    background: white;
    padding: 5px 0;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #011E2E;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;

    @media only screen and (max-width: 1100px) {
      font-size: 3vw;
    }

    &:hover {
    filter: brightness(0.95);
      }
    }

    .active {
      width: 120px;
      background: #FFC6E9;
      padding: 5px 0;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #011E2E;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;

      @media only screen and (max-width: 1100px) {
        font-size: 3vw;
      }
    }
`;
