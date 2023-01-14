import React, { useEffect } from "react";
import styled from "styled-components";
import { Header } from "../components/header";
import { Search } from "../components/search";
import { Filter } from "../components/filter";
import { useSelector, useDispatch } from "react-redux";
import { ProductCard } from "../components/productCard";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { LoaderAnimation } from "../components/loader";

const Shop = () => {
  const [loading, setLoading] = React.useState(true);

  const list = useSelector((state) => state.storeProducts.list);
  const filter = useSelector((state) => state.storeProducts.filter);
  const search = useSelector((state) => state.storeProducts.search);

  const DefineProducts = () => {
    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    const data = list
      ?.filter((val) => {
        if (search === "") {
          return val;
        } else if (val.name?.toLowerCase().includes(search?.toLowerCase())) {
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

  setTimeout(() => {
    setLoading(false);
  }, 300);

  const Products = DefineProducts();
  return (
    <>
      {loading && <LoaderAnimation />}
      <Container loading={loading}>
        <>
          <FilterContainer>
            <Filter />
          </FilterContainer>
          <ListContainer>
            <Search />
            <ProductList>{Products}</ProductList>
          </ListContainer>
        </>
        {/* )} */}
      </Container>
    </>
  );
};

export default Shop;

const Container = styled.div`
  padding-top: 4vw;
  padding-bottom: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${(props) => (props.loading ? "0" : "1")};
  transition: ease-in-out 300ms;

  @media only screen and (max-width: 621px) {
    padding-top: 22vw;
    padding-bottom: 6vw;
  }
`;

const FilterContainer = styled.div`
  margin-top: 1vw;
`;

const ListContainer = styled.div`
  background: #e7f5ff;
  border-radius: 0.3vw;
  padding: 1vw 0;

  @media only screen and (max-width: 621px) {
    padding: 3vw 0;
    margin-top: 3vw;
  }
`;

const ProductList = styled.div`
  margin-top: 1.5vw;
  display: grid;
  width: 84vw;
  height: auto;
  min-height: 80vh;
  grid-template-columns: repeat(5, 15vw);
  justify-content: center;
  justify-items: center;
  // align-items: center;
  gap: 1vw;
  padding-bottom: 2vw;
  z-index: 10;

  @media only screen and (max-width: 621px) {
    margin-top: 4.5vw;
    gap: 0vw;
    row-gap: 5vw;
    grid-template-columns: repeat(2, 45vw);
    padding: 0 3vw 2vw 3vw;
  }
`;
const Logo = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2vw;
`;
