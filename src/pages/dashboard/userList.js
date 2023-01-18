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

export const UserList = () => {
  const [list, setList] = useState();
  /** */
  // import users from firebase
  React.useEffect(() => {
    const data = onSnapshot(collection(db, "users"), (snapshot) => {
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
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [adress, setAdress] = useState("");

  async function AddProduct() {
    const orderList = collection(db, `users`);
    await setDoc(doc(orderList, `${id}`), {
      id: id,
      firstname: firstName,
      lastname: lastName,
      phone: phoneNumber,
      adress: [city, adress],
    });
  }

  const Clean = () => {
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setCity("");
    setAdress("");
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
                <InsideItem>
                  <span>Id:</span>
                </InsideItem>
                <InsideItem>
                  <span>Name:</span>
                </InsideItem>
                <InsideItem>
                  <span>Phone:</span>
                </InsideItem>
                <InsideItem>
                  <span>Email:</span>
                </InsideItem>

                <InsideItem>
                  <span>City:</span>
                </InsideItem>
                <InsideItem>
                  <span>Adress:</span>
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
                      item?.firstname
                        ?.toLowerCase()
                        ?.includes(search?.toLowerCase()) ||
                      item?.lastname
                        ?.toLowerCase()
                        ?.includes(search?.toLowerCase())
                    ) {
                      return item;
                    }
                  })
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
                  style={{ width: "90%" }}
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

  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [adress, setAdress] = useState("");

  const Update = (key, value) => {
    const document = doc(db, "users", props.id);
    updateDoc(document, {
      key: value,
    });
  };

  const DeletProduct = async () => {
    await deleteDoc(doc(db, "users", `${props.id}`));
  };

  return (
    <Navigator style={{ margin: "0.1vw", background: "#fff" }}>
      <InsideItem>
        <span>{props.id}</span>
      </InsideItem>
      <InsideItem>
        <span>
          {props.firstname} {props.lastname}
        </span>
      </InsideItem>

      {editPhone ? (
        <InsideItem>
          <Input
            style={{ width: "1.9vw" }}
            type="number"
            placeholder={props.phone}
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
          <span>{props.phone}</span>
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
        <span>{props.email}</span>
      </InsideItem>

      <InsideItem>
        {editAdress ? (
          <InsideItem>
            <Input
              style={{ width: "1.9vw" }}
              type="text"
              value={adress}
              placeholder={props.adress.city}
              onChange={(e) => setCity(e.target.value)}
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
            <span>{props.adress.city}</span>
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
      </InsideItem>
      <InsideItem>
        {editAdress ? (
          <InsideItem>
            <Input
              style={{ width: "1.9vw" }}
              type="text"
              value={adress}
              placeholder={props.adress.adress}
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
            <span>{props.adress.adress}</span>
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
