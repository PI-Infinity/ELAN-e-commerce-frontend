import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import {
  onSnapshot,
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  BsListCheck,
  BsSortNumericUpAlt,
  BsSortNumericDown,
  BsArrowBarUp,
  BsBoxArrowLeft,
} from "react-icons/bs";
import {
  MdClose,
  MdOutlineCleaningServices,
  MdRemove,
  MdEditNote,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import axios from "axios";
import { setProductsList } from "../../redux/products";
import { useDispatch, useSelector } from "react-redux";
import { RiSearch2Line } from "react-icons/ri";
import Loader from "react-js-loader";

export const ArtistList = () => {
  const [list, setList] = useState();
  /** */
  // import users from firebase
  React.useEffect(() => {
    const data = onSnapshot(collection(db, "artists"), (snapshot) => {
      setList(snapshot.docs.map((doc) => doc.data()));
    });
    return data;
  }, []);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [sort, setSort] = useState(true);
  const [search, setSearch] = useState("");

  const id = list?.length + 1;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [adress, setAdress] = useState("");
  const [profession, setProfession] = useState("");
  const [languages, setLanguages] = useState("");
  const [descriptionGeo, setDescriptionGeo] = useState("");
  const [descriptionEng, setDescriptionEng] = useState("");
  const [descriptionRus, setDescriptionRus] = useState("");
  const [cover, setCover] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
  const [img5, setImg5] = useState("");
  const [instagram, setInstagram] = useState("");
  const [whatsApp, setWhatsApp] = useState("");

  async function AddProduct() {
    const orderList = collection(db, `artists`);
    await setDoc(doc(orderList, `${id}`), {
      id: id,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      adress: [city, adress],
      profession: profession,
      languages: languages,
      descriptionGeo: descriptionGeo,
      descriptionEng: descriptionEng,
      descriptionRus: descriptionRus,
      cover: cover,
      images: [img1, img2, img3, img4, img5],
      instagram: instagram,
      whatsApp: whatsApp,
    });
  }

  const Clean = () => {
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setCity("");
    setAdress("");
    setDescriptionGeo("");
    setDescriptionEng("");
    setDescriptionRus("");
    setLanguages("");
    setCover("");
    setImg1("");
    setImg2("");
    setImg3("");
    setImg4("");
    setImg5("");
    setInstagram("");
    setWhatsApp("");
  };

  const [openAddProduct, setOpenAddProduct] = useState(false);
  // "incrase bg opacity level"
  const [bg, setBg] = useState("rgba(0,0,0,0.1");

  setTimeout(() => {
    setLoading(false);
  }, 500);

  return (
    <>
      {loading ? (
        <div
          style={{
            width: "88vw",
            height: "calc(100vh-4vw)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#cce9ff",
            marginTop: "4vw",
          }}
        >
          <Loader
            type="spinner-circle"
            bgColor={"#FFADDF"}
            color={"#FFFFFF"}
            size={100}
          />
        </div>
      ) : (
        <>
          <Container>
            <Wrapper>
              <Navigator>
                <InsideItem style={{ minWidth: "2vw" }}>
                  <span>Id:</span>
                </InsideItem>
                <InsideItem>
                  <span>Name:</span>
                </InsideItem>
                <InsideItem>
                  <span>Phone:</span>
                </InsideItem>
                <InsideItem>
                  <span>Profession:</span>
                </InsideItem>
                <InsideItem>
                  <span>City:</span>
                </InsideItem>
                <InsideItem>
                  <span>Adress:</span>
                </InsideItem>
                <InsideItem>
                  <span>Languages:</span>
                </InsideItem>
                <InsideItem>
                  <span>Description Geo:</span>
                </InsideItem>
                <InsideItem>
                  <span>Description Eng:</span>
                </InsideItem>
                <InsideItem>
                  <span>Description Rus:</span>
                </InsideItem>
                <InsideItem>
                  <span>Cover:</span>
                </InsideItem>
                <InsideItem>
                  <span>Img1:</span>
                </InsideItem>
                <InsideItem>
                  <span>Img2:</span>
                </InsideItem>
                <InsideItem>
                  <span>Img3:</span>
                </InsideItem>
                <InsideItem>
                  <span>Img4:</span>
                </InsideItem>
                <InsideItem>
                  <span>Img5:</span>
                </InsideItem>
                <InsideItem>
                  <span>Instagram:</span>
                </InsideItem>
                <InsideItem>
                  <span>WhatsApp:</span>
                </InsideItem>
              </Navigator>
              <div
                style={{
                  //   boxSizing: "border-box",
                  margin: "0vw 1vw 2vw 1vw",
                  //   zIndex: 8,
                  //   display: "flex",
                  //   flexDirection: "column",
                  //   gap: "10px",
                  //   minWidth: "100%",
                }}
              >
                {list

                  ?.filter((item) => {
                    if (search == "") {
                      return item;
                    } else if (
                      item?.firstName
                        ?.toLowerCase()
                        ?.includes(search?.toLowerCase()) ||
                      item?.lastName
                        ?.toLowerCase()
                        ?.includes(search?.toLowerCase()) ||
                      item?.category
                        ?.toLowerCase()
                        ?.includes(search?.toLowerCase())
                    ) {
                      return item;
                    }
                  })
                  ?.sort(
                    sort
                      ? (a, b) => b?.inStock - a?.inStock
                      : (a, b) => a?.inStock - b?.inStock
                  )
                  .map((item, index) => {
                    return <ProductItem key={index} {...item} index={index} />;
                  })}
              </div>
            </Wrapper>
            <div
              style={{
                width: "88vw",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                position: "fixed",
                bottom: "0vw",
                background: "#cce9ff",
                padding: "20px 60px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "95%",
                  alignItems: "center",
                }}
              >
                <RiSearch2Line
                  style={{
                    fontSize: "1.4vw",
                    color: "white",
                    marginRight: "0.5vw",
                  }}
                />
                <Input
                  type="text"
                  placeholder="Search Item"
                  style={{ width: "92%" }}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div
                onClick={() => {
                  setOpenAddProduct(true);
                  setBg("rgba(0,0,0,0.3)");
                }}
                style={{
                  cursor: "pointer",
                  background: "green",
                  borderRadius: "0.2vw",
                  height: "2vw",
                  width: "6vw",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  zIndex: "15",
                }}
              >
                Add User
              </div>
            </div>
          </Container>
          {openAddProduct && (
            <div
              style={{
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: "0",
                left: "0",
                zIndex: 9,
                background: "rgba(255,255,255,0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MdClose
                style={{
                  color: "red",
                  fontSize: "2vw",
                  cursor: "pointer",
                  position: "fixed",
                  top: "7vw",
                  right: "15vw",
                }}
                onClick={() => {
                  setOpenAddProduct(false);
                  setBg("rgba(0,0,0,0.1)");
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  marginTop: "3vw",
                  marginBottom: "15px",
                  width: "55vw",
                  flexWrap: "wrap",
                  gap: "1vw",
                  borderRadius: "0.5vw",
                  zIndex: 10,
                  background: "#cce9ff",
                  padding: "5vw",
                  transition: "ease-in-out 250ms",
                  boxShadow: "0 0.1vw 0.3vw rgba(0,0,0,0.2)",
                }}
              >
                <b style={{ marginRight: "3px" }}>Add</b>
                <Input
                  type="text"
                  placeholder="First Name"
                  style={{ width: "11vw" }}
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  requred
                />

                <Input
                  type="text"
                  placeholder="Last Name"
                  style={{ width: "4vw" }}
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
                <Input
                  type="text"
                  placeholder="Phone Number"
                  style={{ width: "7vw" }}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                />
                <Input
                  type="text"
                  placeholder="City"
                  style={{ width: "3vw" }}
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                />
                <Input
                  type="text"
                  placeholder="Adress"
                  style={{ width: "5vw" }}
                  onChange={(e) => setAdress(e.target.value)}
                  value={adress}
                />
                <Input
                  type="text"
                  placeholder="Profession"
                  style={{ width: "5vw" }}
                  onChange={(e) => setProfession(e.target.value)}
                  value={profession}
                />
                <Input
                  type="text"
                  placeholder="Languages"
                  style={{ width: "5vw" }}
                  onChange={(e) => setLanguages(e.target.value)}
                  value={languages}
                />
                <Input
                  type="text"
                  placeholder="Description Geo"
                  style={{ width: "5vw" }}
                  onChange={(e) => setDescriptionGeo(e.target.value)}
                  value={descriptionGeo}
                />
                <Input
                  type="text"
                  placeholder="Description Rus"
                  style={{ width: "5vw" }}
                  onChange={(e) => setDescriptionRus(e.target.value)}
                  value={descriptionRus}
                />
                <Input
                  type="text"
                  placeholder="Description Eng"
                  style={{ width: "5vw" }}
                  onChange={(e) => setDescriptionEng(e.target.value)}
                  value={descriptionEng}
                />
                <Input
                  type="text"
                  placeholder="Cover"
                  style={{ width: "5vw" }}
                  onChange={(e) => setCover(e.target.value)}
                  value={cover}
                />
                <Input
                  type="text"
                  placeholder="Img1"
                  style={{ width: "15vw" }}
                  onChange={(e) => setImg1(e.target.value)}
                  value={img1}
                />
                <Input
                  type="text"
                  placeholder="Img2"
                  style={{ width: "15vw" }}
                  onChange={(e) => setImg2(e.target.value)}
                  value={img2}
                />
                <Input
                  type="text"
                  placeholder="Img3"
                  style={{ width: "15vw" }}
                  onChange={(e) => setImg3(e.target.value)}
                  value={img3}
                />
                <Input
                  type="text"
                  placeholder="Img4"
                  style={{ width: "15vw" }}
                  onChange={(e) => setImg4(e.target.value)}
                  value={img4}
                />
                <Input
                  type="text"
                  placeholder="Img5"
                  style={{ width: "15vw" }}
                  onChange={(e) => setImg5(e.target.value)}
                  value={img5}
                />
                <Input
                  type="text"
                  placeholder="Instagram"
                  style={{ width: "15vw" }}
                  onChange={(e) => setInstagram(e.target.value)}
                  value={instagram}
                />
                <Input
                  type="text"
                  placeholder="WhatsApp"
                  style={{ width: "15vw" }}
                  onChange={(e) => setWhatsApp(e.target.value)}
                  value={whatsApp}
                />

                <GiConfirmed
                  style={{
                    color: "green",
                    fontSize: "28px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    AddProduct();
                  }}
                />
                <div style={{ color: "red" }} onClick={Clean}>
                  Clear
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

const Container = styled.div`
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.1);
  width: 88vw;
  height: 83vh;
  z-index: 8;
  transition: ease-in-out 300ms;
  margin-top: 4vw;
  background: #cce9ff;
`;

const Wrapper = styled.div`
  overflow: scroll;
  width: auto;

  /* width */
  ::-webkit-scrollbar {
    height: 1vw;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background-color: white;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: yellow;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(254, 70, 184);
  }
`;

const Navigator = styled.div`
  margin: 1vw;
  height: 2vw;
  width: auto;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
  border-radius: 10px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
`;

const InsideItem = styled.div`
  min-width: 300px;
  max-width: 300px;
  max-height: 2vw;
  width: 100%;
  border-right: 1px solid green;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: scroll;
  box-sizing: border-box;
  padding: 0 0.5vw;

  /* width */
  ::-webkit-scrollbar {
    width: 0vw;
    height: 0vw;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background-color: white;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: #cce9ff;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(254, 70, 184);
  }
`;

const Input = styled.input`
  border: none;
  width: 35vw;
  height: 2vw;
  border-radius: 25vw;
  background: #fff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  padding-left: 20px;

  :focus {
    outline: none;
  }
`;

const ProductItem = (props) => {
  const [editPhone, setEditPhone] = useState(false);
  const [editCity, setEditCity] = useState(false);
  const [editAdress, setEditAdress] = useState(false);
  const [editCover, setEditCover] = useState(false);
  const [editImg1, setEditImg1] = useState(false);
  const [editImg2, setEditImg2] = useState(false);
  const [editImg3, setEditImg3] = useState(false);
  const [editImg4, ksetEditImg4] = useState(false);
  const [editImg5, setEditImg5] = useState(false);
  const [editWhatsApp, setEditWhatsApp] = useState(false);

  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [adress, setAdress] = useState("");
  const [cover, setCover] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
  const [img5, setImg5] = useState("");
  const [whatsApp, setWhatsApp] = useState("");

  const Update = (key, value) => {
    const document = doc(db, "artists", props.id);
    updateDoc(document, {
      key: value,
    });
  };

  const DeletProduct = async () => {
    console.log(props.id);
    await deleteDoc(doc(db, "artists", `${props.id}`));
  };

  return (
    <Navigator style={{ margin: "0.1vw", background: "#fff" }}>
      <InsideItem style={{ minWidth: "2vw" }}>
        <span>{props.id}</span>
      </InsideItem>
      <InsideItem>
        <span>
          {props.firstName} {props.lastName}
        </span>
      </InsideItem>

      {editPhone ? (
        <InsideItem>
          <Input
            style={{ width: "1.9vw" }}
            type="number"
            placeholder={props.phoneNumber}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <GiConfirmed
            style={{
              color: "green",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={
              phone.length < 1
                ? (e) => {
                    e.preventDefault();
                    setEditPhone(false);
                    setPhone("");
                  }
                : () => {
                    Update("phoneNumber", phone);
                    setEditPhone(false);
                    setPhone("");
                  }
            }
          />
        </InsideItem>
      ) : (
        <InsideItem>
          <span>{props.phoneNumber}</span>
          <MdEditNote
            style={{
              color: "orange",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={() => setEditPhone(true)}
          />
        </InsideItem>
      )}

      <InsideItem>
        <span>{props.profession}</span>
      </InsideItem>
      {editCity == true ? (
        <InsideItem>
          <Input
            style={{ width: "1.9vw" }}
            type="text"
            value={city}
            placeholder={props.adress[0]}
            onChange={(e) => setCity(e.target.value)}
          />
          <GiConfirmed
            style={{
              color: "green",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={
              city < 1
                ? (e) => {
                    e.preventDefault();
                    setEditCity(false);
                    setCity("");
                  }
                : () => {
                    Update("adress", [{ city: city }, { adress: adress }]);
                    setEditCity(false);
                    setCity("");
                  }
            }
          />
        </InsideItem>
      ) : (
        <InsideItem>
          <span>{props.adress[0]}</span>
          <MdEditNote
            style={{
              color: "orange",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={() => setEditCity(true)}
          />
        </InsideItem>
      )}
      <InsideItem>
        {editAdress ? (
          <InsideItem>
            <Input
              style={{ width: "1.9vw" }}
              type="text"
              value={adress}
              placeholder={props.adress[1]}
              onChange={(e) => setAdress(e.target.value)}
            />
            <GiConfirmed
              style={{
                color: "green",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={
                adress < 1
                  ? (e) => {
                      e.preventDefault();
                      setEditAdress(false);
                      setAdress("");
                    }
                  : () => {
                      Update("adress", [{ city: city }, { adress: adress }]);
                      setEditAdress(false);
                      setAdress("");
                    }
              }
            />
          </InsideItem>
        ) : (
          <InsideItem>
            <span>{props.adress[1]}</span>
            <MdEditNote
              style={{
                color: "orange",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={() => setEditAdress(true)}
            />
          </InsideItem>
        )}
      </InsideItem>
      <InsideItem>
        <span>{props.languages}</span>
      </InsideItem>
      <InsideItem style={{ alignItems: "start" }}>
        <span>{props.descriptionGeo}</span>
      </InsideItem>
      <InsideItem style={{ alignItems: "start" }}>
        <span>{props.descriptionEng}</span>
      </InsideItem>
      <InsideItem style={{ alignItems: "start" }}>
        <span>{props.descriptionRus}</span>
      </InsideItem>
      {editAdress ? (
        <InsideItem>
          <Input
            style={{ width: "1.9vw" }}
            type="text"
            value={cover}
            placeholder={props.cover}
            onChange={(e) => setCover(e.target.value)}
          />
          <GiConfirmed
            style={{
              color: "green",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={
              cover < 1
                ? (e) => {
                    e.preventDefault();
                    setEditCover(false);
                    setCover("");
                  }
                : () => {
                    Update("cover", cover);
                    setEditCover(false);
                    setCover("");
                  }
            }
          />
        </InsideItem>
      ) : (
        <InsideItem>
          <span>{props.cover}</span>
          <MdEditNote
            style={{
              color: "orange",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={() => setEditCover(true)}
          />
        </InsideItem>
      )}
      <InsideItem>
        <span>{props.images[0]}</span>
      </InsideItem>
      <InsideItem>
        <span>{props.images[1]}</span>
      </InsideItem>
      <InsideItem>
        <span>{props.images[2]}</span>
      </InsideItem>
      <InsideItem>
        <span>{props.images[3]}</span>
      </InsideItem>
      <InsideItem>
        <span>{props.images[4]}</span>
      </InsideItem>
      <InsideItem>
        <span>{props.instagram}</span>
      </InsideItem>
      <InsideItem>
        {editAdress ? (
          <InsideItem>
            <Input
              style={{ width: "1.9vw" }}
              type="text"
              value={whatsApp}
              placeholder={props.whatsApp}
              onChange={(e) => setWhatsApp(e.target.value)}
            />
            <GiConfirmed
              style={{
                color: "green",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={
                whatsApp < 1
                  ? (e) => {
                      e.preventDefault();
                      setEditWhatsApp(false);
                      setWhatsApp("");
                    }
                  : () => {
                      Update("whatsApp", whatsApp);
                      setEditWhatsApp(false);
                      setWhatsApp("");
                    }
              }
            />
          </InsideItem>
        ) : (
          <InsideItem>
            <span>{props.whatsApp}</span>
            <MdEditNote
              style={{
                color: "orange",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={() => setWhatsApp(true)}
            />
          </InsideItem>
        )}
      </InsideItem>
      <InsideItem
        style={{ maxWidth: "2vw", minWidth: "2vw", borderRight: "0px" }}
      >
        <MdRemove
          style={{
            color: "red",
            fontSize: "20px",
            cursor: "pointer",
          }}
          onClick={DeletProduct}
        />
      </InsideItem>
    </Navigator>
  );
};

const ItemContainer = styled.div`
  height: 1vw;
  height: 2vw;
  width: auto;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
  border-radius: 10px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  background: #fff;
`;
