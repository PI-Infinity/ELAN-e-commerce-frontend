import React from "react";
import styled from "styled-components";
import { RiSearch2Line } from "react-icons/ri";
import { setSearch } from "../redux/products";
import { useDispatch, useSelector } from "react-redux";
import { rus, geo, eng } from "../languages/components/search";
import { MdOutlineClear } from "react-icons/md";

export const Search = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.storeProducts.search);
  const list = useSelector((state) => state.storeProducts.list);

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
    <Container
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RiSearch2Line className="searchIcon" />
      <Input
        type="text"
        list="products"
        placeholder={language.search}
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
      <Clear>
        {search?.length > 0 && (
          <MdOutlineClear
            className="clearIcon"
            onClick={() => dispatch(setSearch(""))}
          />
        )}
      </Clear>
      <datalist id="products">
        {list?.map((item, index) => {
          return <option key={index}>{item.name}</option>;
        })}
      </datalist>
    </Container>
  );
};

const Container = styled.div`
  .searchIcon {
    font-size: 1.5vw;
    margin-right: 0.3vw;
    color: white;

    @media only screen and (max-width: 621px) {
      font-size: 5vw;
      margin-right: 1vw;
    }
  }

  .clearIcon {
    font-size: 1vw;
    margin-left: 0.3vw;
    color: red;
    cursor: pointer;

    @media only screen and (max-width: 621px) {
      font-size: 4vw;
      margin-left: 1vw;
    }
  }
`;

const Clear = styled.div`
  width: 2vw;
  @media only screen and (max-width: 621px) {
    width: 4vw;
  }
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 1);
  width: 50vw;
  height: 2vw;
  border: none;
  border-radius: 25vw;
  padding-left: 1vw;
  display: flex;
  align-items: center;

  ::placeholder {
    color: ${(props) => props.theme.icon};
    font-size: 0.8vw;
    letter-spacing: 0.01vw;
  }

  :focus {
    outline: none;
  }

  @media only screen and (max-width: 621px) {
    width: 70vw;
    height: 6vw;
    padding-left: 3vw;
    font-size: 16px;

    ::placeholder {
      font-size: 16px;
      letter-spacing: 0.15vw;
    }
  }
`;
