import React, { useState } from "react";
import Styled from "styled-components";
import { BsImages } from "react-icons/bs";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export const ArtistCard = (props) => {
  const [popup, setPopup] = useState(false);

  const OpenPopup = (action) => {
    setPopup(action);
  };
  console.log(props.id);
  return (
    <>
      <Container>
        <Link to={`/info/${props.id}`}>
          <Cover src={props.cover} onClick={() => OpenPopup(true)} />
        </Link>
        <Info>
          <Name>{props?.firstName + " " + props?.lastName}</Name>
          <Item>{props?.languages}</Item>
          <Item>{props?.Profession}</Item>
          <Item>Phone: {props?.phoneNumber}</Item>
          <Item>Adress: {props?.adress[0] + " " + props?.adress[1]}</Item>
          <Icons
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: "5vw",
            }}
          >
            <Link
              to={`/info/${props.id}`}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <BsImages color="#320e24" className="icon" />
            </Link>
            <a
              href={props.instagram}
              target="_blank"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaInstagram color="#320e24" className="icon" />
            </a>
            <a
              href={props.whatsApp}
              target="_blank"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaWhatsapp color="#320e24" className="icon" />
            </a>
          </Icons>
        </Info>
      </Container>
    </>
  );
};

const Container = Styled.div`
width: 12vw;
height: 26vw;
background: #FFC6E9;
border-radius: 0.5vw;
cursor: pointer;
display: flex;
flex-direction: column;
align-items: center;
padding: 0 1.5vw;
transition: ease 200ms;

&:hover {
  background: #FFADDF;
}

@media only screen and (max-width: 1100px) {
  width: 40vw;
  height: 80vw;
  justify-content: space-between;
  padding: 4vw 1.5vw;
  border-radius: 1vw;
}

`;

const Cover = Styled.img`
width: 12vw;
height: 13vw;
border-radius: 50%;
object-fit: cover;
margin-top: 1.5vw;
transition: ease 200ms;
box-shadow: 0 0 2px 5px rgba(255, 255, 255, 0.9);

@media only screen and (max-width: 1100px) {
  width: 35vw;
  height: 40vw;
  margin-top: 1.5vw;
  box-shadow: 0 0 2px 5px rgba(255, 255, 255, 0.9);
}

`;

const Info = Styled.div`
  margin-top: 0.7vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2vw;
  @media only screen and (max-width: 1100px) {
    gap: 0.4vw;
  }
  

`;

const Name = Styled.span`
  font-size: 1.1vw;
  white-space: now-wrap;
  font-weight: bold;
  margin-bottom: 0.3vw;
  color: #011E2E;

  @media only screen and (max-width: 1100px) {
    font-size:  3.5vw;
    letter-spacing: 0.15vw;
  }

`;
const Item = Styled.span`
  font-size: 0.8vw;
  margin-bottom: 0.1vw;
  color: #011E2E;
  white-space: nowrap;

  @media only screen and (max-width: 1100px) {
    font-size:  2.5vw;
    letter-spacing: 0.15vw;
  }

`;

const Icons = Styled.div`
width: 12vw;
position: relative;
top: 0.2vw;
padding: 0.3vw 0;
margin-top: 0.5vw;

@media only screen and (max-width: 1100px) {
  width: 38vw;
  height: 5vw;
  padding: 1.5vw 0;
  margin-top: 4vw;
}

.icon {
  transition: ease 200ms;
  cursor: pointer;
  width: 1.1vw;
  height: 1.1vw;

  @media only screen and (max-width: 1100px) {
    width: 4vw;
    height: 4vw;
  }

}
.icon:hover {
  scale: 1.1
}
`;
