import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { eng, geo, rus } from "../languages/pages/product";
import { LoaderAnimation } from "../components/loader";
import book from "../assets/book.jpg";
import { setBookLanguage } from "../redux/placeOrder";

const Books = () => {
  const [loading, setLoading] = React.useState(true);
  const [cover, setCover] = React.useState(book);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const language = useSelector((state) => state.storeOrder.bookLanguage);

  console.log(language);

  setTimeout(() => {
    setLoading(false);
  }, 300);

  return (
    <>
      <>{loading && <LoaderAnimation />}</>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {loading ? (
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
        ) : (
          <Content loading={loading}>
            <MainImg src={cover} alt="ELAN Brow Book" />
            <InformationSection>
              <Back>
                <Link
                  to="/"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    color: "inherit",
                  }}
                >
                  <BsBoxArrowInLeft
                    style={{ fontSize: "2vw", marginRight: "0.5vw" }}
                  />
                  {/* <span>{language.back}</span> */}
                </Link>
              </Back>
              <h1 style={{ padding: "0", margin: "0" }}>ELAN Brow Book</h1>
              <span style={{ fontWeight: "bold" }}>
                ვერსია:{" "}
                <span style={{ fontWeight: "normal" }}>
                  PDF – Google Drive ბმული
                </span>
              </span>
              <span style={{ fontWeight: "bold" }}>
                გვერდები: <span style={{ fontWeight: "normal" }}>252</span>
              </span>
              <span style={{ fontWeight: "bold" }}>
                ფასი: <span style={{ fontWeight: "normal" }}>70 ლარი</span>
              </span>
              <select
                name="languages"
                id="languages"
                onChange={(e) => dispatch(setBookLanguage(e.target.value))}
                value={language}
              >
                <option value="ka">ქართული</option>
                <option value="ua">უკრაინული</option>
                <option value="rus">რუსული</option>
                <option value="eng">ინგლისური</option>
              </select>
              <Desc>
                აღწერა:{" "}
                <span style={{ fontWeight: "normal" }}>
                  მოიცავს წარბების და წამწამების ყველა პროცედურას, ELAN
                  პროფესიონალური ხაზის პროდუქტებით. – შექმნილია მათთვის ვინც
                  გეგმავს გახდეს პროფესიონალი წარბების მასტერი, ასევე მათთვის
                  ვინც ეძებს გზებს გაიუმჯობესოს პროფესიული უნარები – წიგნი
                  შექმნილია ÉLAN-ის პროფესიონალი წარბის მასტერების მიერ,
                  რომელთაც მრავალწლიანი გამოცდილება აქვთ სილამაზის ინდუსტრიაში –
                  ყველა ილუსტრაცია სპეციალურად შექმნილია წიგნისთვის- ÉLAN BROW
                  BOOK - ექსპერტები-სპეციალისტების მოსაზრებების გათვალისწინებით
                  *შეძენის შემდეგ (მაქსიმუმ 1 საათი) თქვენ მიიღებთ წიგნის ბმულს
                  თქვენს ელ. ფოსტის მისამართზე, რომელიც გამოიყენება შეკვეთის
                  ფორმაში.
                </span>
              </Desc>
              <Button onClick={() => navigate("/checkout/book")}>Buy</Button>
            </InformationSection>
          </Content>
        )}
      </div>
    </>
  );
};

export default Books;

const Content = styled.div`
  opacity: ${(props) => (props.loading ? "0" : "1")};
  transition: ease-in-out 300ms;
  background: #cce9ff;
  margin-top: 7vw;
  margin-bottom: 1vw;
  width: 70%;
  min-height: 30vw;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 1vw;
  border-radius: 0.5vw;
  gap: 30px;

  @media only screen and (max-width: 621px) {
    margin-top: 25vw;
    padding-bottom: 5vw;
    width: 90vw;
    flex-direction: column;
    align-items: center;
  }
`;

const MainImg = styled.img`
  width: 32vw;
  height: 32vw;
  object-fit: skretch;
  border-radius: 0.2vw;

  @media only screen and (max-width: 621px) {
    width: 80vw;
    height: 80vw;
    border-radius: 1.5vw;
    margin-top: 4vw;
  }
`;

const InformationSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1vw 0 0 3vw;
  height: 100%;
  gap: 20px;

  @media only screen and (max-width: 621px) {
    padding: 1vw 2vw 2vw 6vw;
  }

  #languages {
    width: 120px;
    cursor: pointer;
    padding: 0.2vw;
    borde-radius: 0.2vw;
    :focus {
      outline: none;
    }
  }
`;

const Back = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 621px) {
    display: none;
  }
`;

const Desc = styled.span`
  font-weight: bold;
  font-size: 0.8vw;

  @media only screen and (max-width: 621px) {
    font-size: 3vw;
  }
`;

const Button = styled.div`
  padding: 0.3vw 1vw 0.4vw 1vw;
  border-radius: 0.5vw;
  background: ${(props) => (props.remove ? "#ccc" : "#31a65e")};
  color: white;
  width: 12vw;
  height: 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;

  @media only screen and (max-width: 621px) {
    padding: 0.9vw 2vw 1.2vw 2vw;
    border-radius: 1.5vw;
    width: 40vw;
    height: 6vw;
    font-size: 3vw;
  }
`;

const AddationalDescription = styled.div`
  width: 60%;
  background: #cce9ff;
  height: auto;
  border-radius: 0.5vw;
  margin-top: 1vw;
  padding: 1vw 1vw 2vw 1vw;
  display: flex;
  flex-direction: column;
  gap: 1vw;
  margin-bottom: 2vw;

  @media only screen and (max-width: 621px) {
    margin-top: 2vw;
    padding-bottom: 5vw;
    padding: 1vw 1vw 2vw 1vw;
    width: 90vw;
    flex-direction: column;
    align-items: start;
  }
`;

const AddationalSectionTitle = styled.h3`
  font-size: 1.3vw;
  font-weight: bold;

  @media only screen and (max-width: 621px) {
    font-size: 5vw;
    margin-left: 6vw;
    padding: 0;
    margin-bottom: 0;
  }
`;

const AddationalSection = styled.div`
  @media only screen and (max-width: 621px) {
    padding: 0 2vw 0 6vw;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 2vw;
  }
`;
