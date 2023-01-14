import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";
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
import { setProductsList } from "../redux/products";
import { useDispatch, useSelector } from "react-redux";
import { RiSearch2Line } from "react-icons/ri";

export const ProductList = () => {
  const [open, setOpen] = useState("-50vw");
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const list = useSelector((state) => state.storeProducts.list);

  if (open === "0") {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  const [sort, setSort] = useState(true);
  const [search, setSearch] = useState("");

  const [productName, setProductName] = useState("");
  const [productQnt, setProductQnt] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productInitialPrice, setProductInitialPrice] = useState("");

  async function AddProduct() {
    const orderList = collection(db, `products`);
    await setDoc(doc(orderList, `${productName}`), {
      name: productName,
      inStock: productQnt,
      category: productCategory,
      price: productPrice,
      initial: productInitialPrice,
    });
    setProductName("");
    setProductQnt("");
    setProductCategory("");
    setProductPrice("");
    setProductInitialPrice("");
  }

  return (
    <div style={{ background: "#CCE9FF" }}>
      <div
        style={{
          position: "fixed",
          left: 0,
          top: "4vw",
          zIndex: 16,
          background: "#fff",
          borderRadius: "0 30px 30px 0",
          width: "6vw",
          height: "2vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
        }}
        onClick={() => {
          setOpen("0");
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }}
      >
        <MdProductionQuantityLimits
          style={{ fontSize: "1.1vw", marginRight: "0.3vw" }}
        />
        <span>Products</span>
      </div>
      {open == "-50vw" ? (
        <div></div>
      ) : (
        <div
          onClick={() => {
            setOpen("-50vw");
            setTimeout(() => {
              setLoading(true);
            }, 500);
          }}
          style={{
            width: "100%",
            height: "1500px",
            background: "rgba(0,0,0,0.1)",
            position: "fixed",
            top: 0,
            left: 0,
            cursor: "pointer",
            zIndex: 15,
          }}
        ></div>
      )}
      {open == "0" && (
        <div
          style={{
            zIndex: 16,
            position: "absolute",
            top: "1vw",
            right: "1vw",
            background: "#CCE9FF",
            borderRadius: "10vw",
            width: "3vw",
            height: "3vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
          }}
          onClick={() => {
            setOpen("-50vw");
            setTimeout(() => {
              setLoading(true);
            }, 500);
          }}
        >
          Close
        </div>
      )}
      <Container open={open}>
        <div
          style={{
            width: "50vw",
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
            width: "40vw",
            height: "2vw",
            display: "flex",
            alignItems: "center",
            padding: "5px 10px",
            borderRadius: "10px",
            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
            background: "#CCE9FF",
          }}
        >
          <div style={{ flex: 0.7 }}>
            <span>N:</span>
          </div>
          <div style={{ flex: 4.3 }}>
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
          <div style={{ flex: 3 }}>
            <span>Category</span>
          </div>
          <div style={{ flex: 3 }}>
            <span>Current Price</span>
          </div>
          <div style={{ flex: 2 }}>
            <span>Initial Price</span>
          </div>
          <div style={{ flex: 2 }}></div>
        </div>
        {loading ? (
          <div
            style={{
              marginLeft: "1vw",
              width: "40vw",
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
          <div>
            {list

              ?.filter((item) => {
                if (search == "") {
                  return item;
                } else if (
                  item?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
                  item?.category?.toLowerCase()?.includes(search?.toLowerCase())
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
        )}
        <div
          style={{
            width: "44vw",
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
              width: "94%",
              alignItems: "center",
              marginBottom: "1vw",
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
              style={{ width: "94%" }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginBottom: "15px",
              width: "42vw",
            }}
          >
            <b style={{ marginRight: "3px" }}>Add</b>
            <Input
              type="text"
              placeholder="Item Name"
              style={{ width: "11vw" }}
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
            />
            <Input
              type="number"
              placeholder="In Stock"
              style={{ width: "4vw" }}
              onChange={(e) => setProductQnt(e.target.value)}
              value={productQnt}
            />
            <Input
              type="text"
              placeholder="Category"
              list="category"
              style={{ width: "7vw" }}
              onChange={(e) => setProductCategory(e.target.value)}
              value={productCategory}
            />
            <datalist id="category">
              <option>Lamination</option>
              <option>Flexing</option>
              <option>Accessories</option>
              <option>SBTS</option>
              <option>T&B</option>
              <option>Gel Tint</option>
              <option>Decoration</option>
            </datalist>
            <Input
              type="number"
              placeholder="Price"
              style={{ width: "3vw" }}
              onChange={(e) => setProductPrice(e.target.value)}
              value={productPrice}
            />
            <Input
              type="number"
              placeholder="Initial Price"
              style={{ width: "5vw" }}
              onChange={(e) => setProductInitialPrice(e.target.value)}
              value={productInitialPrice}
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
      </Container>
    </div>
  );
};

const Container = styled.div`
  background: #cce9ff;
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.1);
  width: 44vw;
  height: 86vh;
  position: fixed;
  left: ${(props) => props.open};
  top: 0;
  z-index: 17;
  transition: ease-in-out 300ms;
  overflow-y: scroll;
  overflow-x: hidden;
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
  const [currency, setCurrency] = useState();

  const options = {
    method: "GET",
    url: "https://currency-exchange.p.rapidapi.com/exchange",
    params: { from: "usd", to: "gel", q: "1.0" },
    headers: {
      "X-RapidAPI-Key": "52e1d0c7c8msh48ed8924d5366abp111952jsn2ebe8e4bebb4",
      "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      setCurrency(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  const [editQnt, setEditQnt] = useState(false);
  const [editPrice, setEditPrice] = useState(false);
  const [editInitial, setEditInitial] = useState(false);

  const [updateStock, setUpdateStock] = useState("");
  const [price, setPrice] = useState("");
  const [initial, setInitial] = useState("");

  const UpdateQnt = (name) => {
    const document = doc(db, "products", `${name}`);
    updateDoc(document, {
      inStock: updateStock,
    });
  };
  const UpdatePrice = (name) => {
    const document = doc(db, "products", `${name}`);
    updateDoc(document, {
      price: price,
    });
  };
  const UpdateInitial = (name) => {
    const document = doc(db, "products", `${name}`);
    updateDoc(document, {
      initial: initial,
    });
  };

  const DeletProduct = (prod) => {
    const coll = collection(db, "products");
    deleteDoc(doc(coll, `${prod}`));
  };

  return (
    <div
      style={{
        marginLeft: "1vw",
        paddingLeft: "1vw",
        marginBottom: "0.5vw",
        width: "40vw",
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
                updateStock.length < 1
                  ? (e) => {
                      e.preventDefault();
                      setEditQnt(false);
                      setUpdateStock("");
                    }
                  : () => {
                      UpdateQnt(props.name);
                      setEditQnt(false);
                      setUpdateStock("");
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
      <div style={{ flex: 3 }}>
        <span>{props.category}</span>
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
                      setPrice("");
                    }
                  : () => {
                      UpdatePrice(props.name);
                      setEditPrice(false);
                      setPrice("");
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
      <div style={{ flex: 2 }}>
        {editInitial ? (
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <Input
              style={{ width: "1.9vw" }}
              type="number"
              value={initial}
              placeholder={props.initial}
              onChange={(e) => setInitial(e.target.value)}
            />
            <GiConfirmed
              style={{
                color: "green",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={
                initial < 1
                  ? (e) => {
                      e.preventDefault();
                      setEditInitial(false);
                      setInitial("");
                    }
                  : () => {
                      UpdateInitial(props.name);
                      setEditInitial(false);
                      setInitial("");
                    }
              }
            />
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <span>{(currency * props.initial).toFixed(2)}</span>
            <span style={{ marginLeft: "2px" }}>Gel</span>
            <MdEditNote
              style={{
                color: "orange",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={() => setEditInitial(true)}
            />
          </div>
        )}
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
