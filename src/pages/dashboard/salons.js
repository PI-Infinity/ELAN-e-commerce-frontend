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
import { SiHomeassistantcommunitystore } from "react-icons/si";
import Loader from "react-js-loader";

export const Salons = () => {
  const [open, setOpen] = useState("-50vw");
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const list = useSelector((state) => state.storeProducts.salons);
  const productList = useSelector((state) => state.storeProducts.list);

  const [sort, setSort] = useState(true);
  const [search, setSearch] = useState("");

  const [salon, setSalon] = useState("");
  const [name, setName] = useState("");
  const [productQnt, setProductQnt] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [sale, setSale] = useState("");

  async function AddProduct() {
    const salons = collection(db, `salons`);
    await setDoc(doc(salons, `${salon}`), {
      salon: salon,
      sale: sale,
    });
    const salonsItem = collection(db, `salons`, `${salon}`, "products");
    await setDoc(doc(salonsItem, `${name}`), {
      name: name,
      inStock: productQnt,
      price: productPrice,
    });
  }

  const [choiseSalon, setChoiseSalon] = useState();
  const [listItems, setListItems] = useState();

  const currentSalonSale = list?.find((it) => it.salon == choiseSalon);

  React.useEffect(() => {
    const data = onSnapshot(
      collection(db, "salons", `${choiseSalon}`, "products"),
      (snapshot) => {
        setListItems(snapshot.docs.map((doc) => doc.data()));
      }
    );
    return data;
  }, [choiseSalon]);

  const Clean = () => {
    setSalon("");
    setName("");
    setProductQnt("");
    setProductPrice("");
    setSale("");
  };

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
            <div
              style={{
                width: "88vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "1vw 0 0 0",
              }}
            >
              <span>Choise Salon:</span>
              <Select
                name="salons"
                id="salons"
                onChange={(e) => setChoiseSalon(e.target.value)}
              >
                <option value="all">All Salon</option>
                {list?.map((item, index) => {
                  return (
                    <option key={index} value={item.salon}>
                      {item.salon}
                    </option>
                  );
                })}
              </Select>
            </div>
            <div
              style={{
                width: "88vw",
                height: "2vw",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            ></div>
            <div
              style={{
                marginLeft: "1vw",
                marginBottom: "0.5vw",
                width: "84vw",
                height: "2vw",
                display: "flex",
                alignItems: "center",
                padding: "5px 10px",
                borderRadius: "10px",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                background: "#fff",
              }}
            >
              <div style={{ flex: 0.7 }}>
                <span>N:</span>
              </div>
              <div style={{ flex: 3.7 }}>
                <span>Item Name:</span>
              </div>
              <div
                style={{
                  flex: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {sort ? (
                  <BsSortNumericDown
                    onClick={() => setSort(false)}
                    style={{
                      cursor: "pointer",
                      fontSize: "15px",
                      marginRight: "3px",
                    }}
                  />
                ) : (
                  <BsSortNumericUpAlt
                    onClick={() => setSort(true)}
                    style={{
                      cursor: "pointer",
                      fontSize: "15px",
                      marginRight: "3px",
                    }}
                  />
                )}
                <span>In Stock:</span>
              </div>
              {/* <div style={{ flex: 3 }}>
              <span>Category</span>
            </div> */}
              <div style={{ flex: 3 }}>
                <span>Current Price</span>
              </div>
              <div style={{ flex: 3 }}>
                <span>Sale Price</span>
              </div>
              {/* <div style={{ flex: 2 }}></div> */}
            </div>
            {loading ? (
              <div
                style={{
                  marginLeft: "1vw",
                  width: "88vw",
                  height: "80vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "5px 10px",
                  borderRadius: "10px",
                  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                  background: "#CCE9FF",
                }}
              >
                <h2>Loading...</h2>
              </div>
            ) : (
              <div style={{ marginBottom: "5vw" }}>
                {listItems

                  ?.sort(
                    sort
                      ? (a, b) => b?.inStock - a?.inStock
                      : (a, b) => a?.inStock - b?.inStock
                  )
                  .map((item, index) => {
                    return (
                      <ProductItem
                        key={index}
                        {...item}
                        index={index}
                        salon={choiseSalon}
                        sale={currentSalonSale?.sale}
                      />
                    );
                  })}
                <div
                  style={{
                    width: "88vw",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    position: "fixed",
                    bottom: "0vw",
                    background: "#CCE9FF",
                    padding: "20px 0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "15px",
                      width: "88vw",
                      flexWrap: "wrap",
                      gap: "1vw",
                      borderRadius: "0.5vw",
                    }}
                  >
                    <b style={{ marginRight: "3px" }}>Add</b>
                    <Input
                      type="text"
                      placeholder="Salon"
                      style={{ width: "15vw" }}
                      onChange={(e) => setSalon(e.target.value)}
                      value={salon}
                      requred
                    />
                    <Input
                      id="products"
                      type="text"
                      placeholder="Product"
                      style={{ width: "10vw" }}
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      requred
                    />
                    <datalist id="products">
                      {productList?.map((item, index) => {
                        return <option value={item.name} key={index} />;
                      })}
                    </datalist>
                    <Input
                      type="number"
                      placeholder="In Stock"
                      style={{ width: "8vw" }}
                      onChange={(e) => setProductQnt(e.target.value)}
                      value={productQnt}
                    />

                    <Input
                      type="number"
                      placeholder="Price"
                      style={{ width: "7vw" }}
                      onChange={(e) => setProductPrice(e.target.value)}
                      value={productPrice}
                    />

                    <Input
                      type="number"
                      placeholder="Sale"
                      style={{ width: "9vw" }}
                      onChange={(e) => setSale(e.target.value)}
                      value={sale}
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
                  </div>
                </div>
              </div>
            )}
          </Container>
        </>
      )}
    </>
  );
};

const Container = styled.div`
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.1);
  width: 88vw;
  height: 86vh;
  z-index: 8;
  transition: ease-in-out 300ms;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-top: 4vw;
  background: #cce9ff;
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
const Select = styled.select`
  border: none;
  width: 10vw;
  height: 2vw;
  border-radius: 25vw;
  background: #fff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  padding-left: 20px;
  margin-left: 1vw;
  cursor: pointer;

  :focus {
    outline: none;
  }
`;

const ProductItem = (props) => {
  const [editQnt, setEditQnt] = useState(false);
  const [editPrice, setEditPrice] = useState(false);

  const [updateStock, setUpdateStock] = useState("");
  const [price, setPrice] = useState("");

  const UpdateQnt = () => {
    const document = doc(
      db,
      "salons",
      `${props.salon}`,
      "products",
      `${props.name}`
    );
    updateDoc(document, {
      inStock: updateStock,
    });
  };
  const UpdatePrice = () => {
    const document = doc(
      db,
      "salons",
      `${props.salon}`,
      "products",
      `${props.name}`
    );
    updateDoc(document, {
      price: price,
    });
  };

  const DeletProduct = (prod) => {
    const coll = collection(db, "salons", `${props.salon}`, "products");
    deleteDoc(doc(coll, `${prod}`));
  };

  return (
    <div
      style={{
        marginLeft: "1vw",
        paddingLeft: "1vw",
        marginBottom: "0.5vw",
        width: "84vw",
        height: "2vw",
        display: "flex",
        alignItems: "center",
        padding: "5px 10px",
        borderRadius: "10px",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
        background: "white",
      }}
    >
      <div style={{ flex: 0.7 }}>
        <span>{props.index + 1}</span>
      </div>
      <div style={{ flex: 4.3 }}>
        <span>{props.name}</span>
      </div>
      <div style={{ flex: 2, fontWeight: "bold" }}>
        {editQnt ? (
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <Input
              style={{ width: "1.9vw" }}
              type="number"
              placeholder={props.inStock}
              value={updateStock}
              onChange={(e) => setUpdateStock(e.target.value)}
            />
            <GiConfirmed
              style={{
                color: "green",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={
                updateStock?.length < 1
                  ? (e) => {
                      e.preventDefault();
                      setEditQnt(false);
                    }
                  : () => {
                      UpdateQnt();
                      setEditQnt(false);
                    }
              }
            />
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <span>{props.inStock}</span>
            <MdEditNote
              style={{
                color: "orange",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={() => setEditQnt(true)}
            />
          </div>
        )}
      </div>
      <div style={{ flex: 3, fontWeight: "bold" }}>
        {editPrice == true ? (
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <Input
              style={{ width: "1.9vw" }}
              type="number"
              value={price}
              placeholder={props.price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <GiConfirmed
              style={{
                color: "green",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={
                price < 1
                  ? (e) => {
                      e.preventDefault();
                      setEditPrice(false);
                    }
                  : () => {
                      // UpdatePrice(props.name);
                      UpdatePrice();
                      setEditPrice(false);
                    }
              }
            />
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <span>{props.price}</span>
            <span> Gel</span>
            <MdEditNote
              style={{
                color: "orange",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={() => setEditPrice(true)}
            />
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "3px",
          width: "3vw",
        }}
      >
        <b>{props.price - (props.price / 100) * props.sale} </b>
        <b> Gel</b>
        {/* <MdEditNote
          style={{
            color: "orange",
            fontSize: "20px",
            cursor: "pointer",
          }}
          onClick={() => setEditPrice(true)}
        /> */}
      </div>

      <div
        style={{
          flex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <MdRemove
          style={{
            color: "red",
            fontSize: "20px",
            cursor: "pointer",
          }}
          onClick={() => DeletProduct(props.name)}
        />
      </div>
    </div>
  );
};
