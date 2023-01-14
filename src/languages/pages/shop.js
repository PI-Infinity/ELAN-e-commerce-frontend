import React from "react";
import styled from "styled-components";
import { Header } from "../components/header";
import { Search } from "../components/search";
import { Filter } from "../components/filter";
import { useSelector, useDispatch } from "react-redux";
import { ProductCard } from "../components/productCard";

const Shop = () => {
  const list = useSelector((state) => state.storeProducts.list);
  const filter = useSelector((state) => state.storeProducts.filter);
  const search = useSelector((state) => state.storeProducts.search);

  const DefineProducts = () => {
    const data = list
      ?.filter((val) => {
        if (search === "") {
          return val;
        } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
          return val;
        }
      })
      ?.filter((item) => {
        if (filter === "all") {
          return item;
        } else {
          return item.category === filter;
        }
      })
      .map((item, index, list) => {
        return <ProductCard key={index} {...item} />;
      }, []);
    return data;
  };

  const Products = DefineProducts();
  return (
    <div style={{ paddingTop: "6vw", background: "#f7f7f7" }}>
      <Header />

      <Filter />
      <Search />

      <Container>{Products}</Container>
    </div>
  );
};

export default Shop;

const Container = styled.div`
  margin-top: 1.5vw;
  display: grid;
  width: 100%;
  height: auto;
  min-height: 80vh;
  grid-template-columns: repeat(5, 15vw);
  justify-content: center;
  align-items: start;
  gap: 1vw;
  padding-bottom: 2vw;
  z-index: 10;
`;
