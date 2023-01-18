import React, { useState } from "react";
import Styled from "styled-components";
import { ArtistCard } from "../../pages/artists/artistCard";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";

export const List = (props) => {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.storeMain.artists);

  const artists = () => {
    return list?.map((item) => {
      if (item?.adress[0] === props.filter) {
        return <ArtistCard key={item.Id} {...item} />;
      } else if (props.filter === "All") {
        return <ArtistCard key={item.Id} {...item} />;
      }
    });
  };

  const artistsList = artists();

  return <Container>{artistsList}</Container>;
};

const Container = Styled.div`
  margin-top: 1vw;
  background: #FFEBF8;
  width: 65vw;
  height: auto;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  row-gap: 30px;
  padding: 20px;
  overflow-x: hidden;

  @media only screen and (max-width: 1100px) {
    width: 91vw;
    grid-template-columns: 1fr 1fr;
    padding: 10px 5px;
    row-gap: 10px;
  }

`;
