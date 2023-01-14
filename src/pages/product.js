import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Header } from "../components/header";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { setCart, removeItem } from "../redux/products";
import { eng, geo, rus } from "../languages/pages/product";
import { LoaderAnimation } from "../components/loader";

const Product = () => {
  const [loading, setLoading] = React.useState(true);

  const dispatch = useDispatch();
  const list = useSelector((state) => state.storeProducts.list);
  const { Id } = useParams();
  const product = list?.find((item) => item.name === Id);

  // add & remove items from cart
  const cartItems = useSelector((state) => state.storeProducts.cart);
  // define language
  let language;
  const lang = useSelector((state) => state.storeMain.language);

  let title = product?.name;
  let shortDescription;
  let size;
  let advantages;
  let details;
  let usage;
  if (lang == "eng") {
    shortDescription = product?.engShortDescription;
    size = product?.engSize;
    advantages = product?.engAdvantages;
    details = product?.engDetails;
    usage = product?.engHowToUse;
    language = eng;
  } else if (lang == "geo") {
    shortDescription = product?.geoShortDescription;
    size = product?.geoSize;
    advantages = product?.geoAdvantages;
    details = product?.geoDetails;
    usage = product?.geoHowToUse;
    language = geo;
  } else {
    shortDescription = product?.rusShortDescription;
    size = product?.rusSize;
    advantages = product?.rusAdvantages;
    details = product?.rusDetails;
    usage = product?.rusHowToUse;
    language = rus;
  }
  const price = product?.price;

  // define product cover image
  const [cover, setCover] = useState(0);

  const DefineCover = () => {
    let result;
    if (cover == 0) {
      result = product?.img;
    } else if (cover == 1) {
      result = product?.gallery[0];
    } else {
      result = product?.gallery[1];
    }
    return result;
  };

  const DefineActiveCoverStyle = () => {
    let result;
    if (cover == 0) {
      result = product?.img;
    } else if (cover == 1) {
      result = product?.gallery[0];
    } else {
      result = product?.gallery[1];
    }
    return result;
  };

  const Cover = DefineCover();

  // product quantity counter
  const [counter, setCounter] = useState(1);
  const qnt = counter;

  // define language
  const currentLang = useSelector((state) => state.storeMain.language);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  // variantes bg
  let background;
  if (
    product?.variant === "Gel Tint 01 (Set)" ||
    product?.variant === "Gel Tint 01 Black"
  ) {
    background = "#111";
  } else if (
    product?.variant === "Gel Tint 02 (Set)" ||
    product?.variant === "Gel Tint 02 Dark Brown" ||
    product?.variant === "Deep Brow Tint 05 SPICY" ||
    product?.variant === "Brow Liner 02 D Brown"
  ) {
    background = "#5B4646";
  } else if (product?.variant === "Brow Mask 13 CHESTNUT") {
    background = "#921F42";
  } else if (
    product?.variant === "Gel Tint 03 (Set)" ||
    product?.variant === "Gel Tint 03 Medium Brown" ||
    product?.variant === "Deep Brow Tint 04 ICY" ||
    product?.variant === "Brow Liner 01 M Brown" ||
    product?.variant === "Brow Mask 12 COCOA" ||
    product?.variant === "Brow Concealer 02 W Nude"
  ) {
    background = "#A27575";
  } else if (
    product?.variant === "Brow Liner 03 Blonde" ||
    product?.variant === "Brow Mask 11 AMETHYST" ||
    product?.variant === "Brow Concealer 01 C Nude"
  ) {
    background = "#EFC8B2";
  } else if (product?.variant === "Supersonic Serum 1 Clear") {
    background = "#9FEE71";
  } else if (product?.variant === "Supersonic Serum 1") {
    background = "#FF51C2";
  } else if (product?.variant === "Booster Orange") {
    background = "orange";
  } else if (product?.variant === "Booster Indigo") {
    background = "indigo";
  }

  // variantes2 bg
  let background2;
  if (
    product?.variant2 === "Gel Tint 01 (Set)" ||
    product?.variant2 === "Gel Tint 01 Black"
  ) {
    background2 = "#111";
  } else if (
    product?.variant2 === "Gel Tint 02 (Set)" ||
    product?.variant2 === "Gel Tint 02 Dark Brown" ||
    product?.variant2 === "Brow Liner 02 D Brown"
  ) {
    background2 = "#5B4646";
  } else if (
    product?.variant2 === "Brow Liner 03 Blonde" ||
    product?.variant2 === "Brow Mask 11 AMETHYST"
  ) {
    background2 = "#EFC8B2";
  } else if (product?.variant2 === "Brow Mask 13 CHESTNUT") {
    background2 = "#921F42";
  } else if (
    product?.variant2 === "Gel Tint 03 (Set)" ||
    product?.variant2 === "Gel Tint 03 Medium Brown" ||
    product?.variant2 === "Brow Liner 01 M Brown" ||
    product?.variant2 === "Brow Mask 12 COCOA"
  ) {
    background2 = "#A27575";
  }

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
          <>
            <Content loading={loading}>
              <div>
                <MainImg src={Cover} alt={product?.name} />
                <Gallery>
                  {product?.img?.length > 0 && (
                    <ImgBg
                      style={
                        cover == 0
                          ? { filter: "brightness(0.9)" }
                          : { filter: "brightness(1)" }
                      }
                    >
                      <Img
                        src={product?.img}
                        alt={product?.name}
                        onClick={() => setCover(0)}
                      />
                    </ImgBg>
                  )}
                  {product?.gallery[0]?.length > 0 && (
                    <ImgBg
                      style={
                        cover == 1
                          ? { filter: "brightness(0.9)" }
                          : { filter: "brightness(1)" }
                      }
                    >
                      <Img
                        src={product?.gallery[0]}
                        alt={product?.name}
                        onClick={() => setCover(1)}
                      />
                    </ImgBg>
                  )}
                  {product?.gallery[1]?.length > 0 && (
                    <ImgBg
                      style={
                        cover == 2
                          ? { filter: "brightness(0.9)" }
                          : { filter: "brightness(1)" }
                      }
                    >
                      <Img
                        src={product?.gallery[1]}
                        alt={product?.name}
                        onClick={() => setCover(2)}
                      />
                    </ImgBg>
                  )}
                </Gallery>
              </div>
              <InformationSection>
                <Back>
                  <Link
                    to="/shop"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      color: "inherit",
                    }}
                  >
                    <BsBoxArrowInLeft
                      style={{ fontSize: "1vw", marginRight: "0.5vw" }}
                    />
                    <span>{language.back}</span>
                  </Link>
                </Back>
                <InfoContainer>
                  <Title>{title}</Title>
                  {(product?.variant?.length > 0 ||
                    product?.variant2?.length > 0) && (
                    <Variantes
                      background={background}
                      background2={background2}
                    >
                      {language.variantes}
                      <Link
                        to={`/product/${product?.variant}`}
                        className="variant1"
                      ></Link>
                      <Link
                        to={`/product/${product?.variant2}`}
                        className="variant2"
                      ></Link>
                    </Variantes>
                  )}
                </InfoContainer>
                <SectionTitle>{language.shortDesc}</SectionTitle>
                <SectionDetails>{shortDescription}</SectionDetails>
                <SectionTitle>{language.pckg}</SectionTitle>
                <SectionDetails>{size}</SectionDetails>
                {advantages?.length > 0 && (
                  <>
                    <SectionTitle>{language.advantages}</SectionTitle>
                    <SectionDetails>{advantages}</SectionDetails>
                  </>
                )}

                <SectionTitle>
                  {language.price}{" "}
                  <Price>
                    {product?.price} {language.gel}
                  </Price>{" "}
                </SectionTitle>
                <InStock>
                  {language.instock} <span>{product?.inStock}</span>{" "}
                  {language.pcs}
                </InStock>
                <DefineSection>
                  <IncrDecr
                    decr={true}
                    onClick={
                      counter != 1 ? () => setCounter(counter - 1) : undefined
                    }
                  >
                    <AiOutlineMinus />
                  </IncrDecr>
                  <Counter>{counter}</Counter>
                  <IncrDecr onClick={() => setCounter(counter + 1)}>
                    <AiOutlinePlus />
                  </IncrDecr>
                  {cartItems?.find((item) => item.title === product.name) ? (
                    <Button
                      remove={true}
                      onClick={() => dispatch(removeItem(title))}
                    >
                      {language.remove}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => dispatch(setCart({ title, price, qnt }))}
                    >
                      {language.add}
                    </Button>
                  )}
                </DefineSection>
              </InformationSection>
            </Content>
            {details?.length > 0 ||
              usage?.length > 0 ||
              (product?.compositions?.length > 0 && (
                <AddationalDescription>
                  <AddationalSectionTitle>
                    {language.descrpition}
                  </AddationalSectionTitle>
                  {details?.length > 0 && (
                    <AddationalSection>
                      <SectionTitle>{language.details} </SectionTitle>
                      <SectionDetails>{details}</SectionDetails>
                    </AddationalSection>
                  )}
                  {usage?.length > 0 && (
                    <AddationalSection>
                      <SectionTitle>{language.usage} </SectionTitle>
                      <span>{usage}</span>
                    </AddationalSection>
                  )}
                  {product?.compositions?.length > 0 && (
                    <AddationalSection>
                      <SectionTitle>{language.compositions} </SectionTitle>
                      <span>{product?.compositions}</span>
                    </AddationalSection>
                  )}
                </AddationalDescription>
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default Product;

const Content = styled.div`
  opacity: ${(props) => (props.loading ? "0" : "1")};
  transition: ease-in-out 300ms;
  background: #cce9ff;
  margin-top: 6vw;
  margin-bottom: 2vw;
  width: 60%;
  minheight: 30vw;
  display: flex;
  align-items: start;
  justify-content: space-between;
  padding: 1vw;
  border-radius: 0.5vw;

  @media only screen and (max-width: 621px) {
    margin-top: 25vw;
    padding-bottom: 5vw;
    width: 90vw;
    flex-direction: column;
    align-items: center;
  }
`;

const MainImg = styled.img`
  width: 24vw;
  height: 24vw;
  object-fit: skretch;

  @media only screen and (max-width: 621px) {
    width: 80vw;
    height: 80vw;
  }
`;

const Gallery = styled.div`
  width: auto;
  background: #fff;
  padding: 0.3vw;
  border-radius: 0.5vw;
  display: flex;
  gap: 0.5vw;

  @media only screen and (max-width: 621px) {
    padding: 1vw;
    gap: 1vw;
  }
`;

const ImgBg = styled.div`
  overflow: hidden;
  border-radius: 5%;
  background: white;
  filter: brightness(${(props) => props.brightness});
  width: 4vw;
  height: 4vw;

  @media only screen and (max-width: 621px) {
    width: 15vw;
    height: 15vw;
  }
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  objectfit: cover;
`;

const InformationSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1vw 0 0 3vw;
  height: 100%;

  @media only screen and (max-width: 621px) {
    padding: 1vw 2vw 2vw 6vw;
  }
`;

const Back = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 621px) {
    display: none;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5vw;

  @media only screen and (max-width: 621px) {
    margin-top: 2.5vw;
    flex-direction: column;
    align-items: start;
  }
`;

const Title = styled.h3`
  font-size: 1.3vw;
  font-weight: bold;

  @media only screen and (max-width: 621px) {
    font-size: 5vw;
  }
`;

const Variantes = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5vw;
  margin-right: 0.5vw;

  @media only screen and (max-width: 621px) {
    margin-right: 0;
    gap: 2vw;
    font-size: 4vw;
  }

  .variant1 {
    width: 1.5vw;
    height: 1.5vw;
    border-radius: 50%;
    background: ${(props) => props.background};
    cursor: pointer;

    @media only screen and (max-width: 621px) {
      width: 6vw;
      height: 6vw;
    }
  }
  .variant2 {
    width: 1.5vw;
    height: 1.5vw;
    border-radius: 50%;
    background: ${(props) => props.background2};
    cursor: pointer;

    @media only screen and (max-width: 621px) {
      width: 6vw;
      height: 6vw;
    }
  }
`;

const SectionTitle = styled.span`
  margin: 1vw 0 0 0;
  font-weight: bold;
  font-size: 0.8vw;

  @media only screen and (max-width: 621px) {
    margin: 6vw 0 0 0;
    font-size: 3.7vw;
  }
`;

const SectionDetails = styled.span`
  margin: 0.5vw 0 0 0;

  @media only screen and (max-width: 621px) {
    margin: 3vw 0 0 0;
  }
`;

const Price = styled.span`
  font-weight: bold;
  font-size: 1.1vw;
  color: green;

  @media only screen and (max-width: 621px) {
    font-size: 3.7vw;
  }
`;

const InStock = styled.span`
  margin: 1vw 0 0 0.5vw;
  font-weight: bold;
  font-size: 0.8vw;
  color: #b5b5b5;

  @media only screen and (max-width: 621px) {
    margin: 3vw 0 0 1.5vw;
    font-size: 3vw;
  }
`;

const DefineSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 1.5vw;

  @media only screen and (max-width: 621px) {
    margin-top: 7vw;
  }
`;

const IncrDecr = styled.div`
  width: 2vw;
  height: 2vw;
  border-radius: 10vw;
  background: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.8vw;

  @media only screen and (max-width: 621px) {
    width: 6vw;
    height: 6vw;
    border-radius: 50vw;
    font-size: 2vw;
  }
`;

const Counter = styled.div`
  padding: 0.5vw;
  font-size: 1vw;
  font-weight: bold;

  @media only screen and (max-width: 621px) {
    padding: 1.5vw;
    font-size: 3vw;
  }
`;

const Button = styled.div`
  padding: 0.3vw 1vw 0.4vw 1vw;
  margin-right: 0.5vw;
  margin-left: 1vw;
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
    margin-right: 1.5vw;
    margin-left: 3vw;
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
