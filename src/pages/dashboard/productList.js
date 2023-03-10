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

export const ProductList = () => {
  // const [open, setOpen] = useState("-50vw");
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const list = useSelector((state) => state.storeProducts.list);

  const [sort, setSort] = useState(true);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [productQnt, setProductQnt] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productInitialPrice, setProductInitialPrice] = useState("");
  const [sale, setSale] = useState("");
  const [img, setImg] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [engShortDescription, setEngShortDescription] = useState("");
  const [geoShortDescription, setGeoShortDescription] = useState("");
  const [rusShortDescription, setRusShortDescription] = useState("");
  const [engSize, setEngSize] = useState("");
  const [geoSize, setGeoSize] = useState("");
  const [rusSize, setRusSize] = useState("");
  const [engAdvantages, setEngAdvantages] = useState("");
  const [geoAdvantages, setGeoAdvantages] = useState("");
  const [rusAdvantages, setRusAdvantages] = useState("");
  const [engDetails, setEngDetails] = useState("");
  const [geoDetails, setGeoDetails] = useState("");
  const [rusDetails, setRusDetails] = useState("");
  const [engHowToUse, setEngHowToUse] = useState("");
  const [geoHowToUse, setGeoHowToUse] = useState("");
  const [rusHowToUse, setRusHowToUse] = useState("");
  const [compositions, setCompositions] = useState("");
  const [variant, setVariant] = useState("");
  const [variant2, setVariant2] = useState("");

  async function AddProduct() {
    const orderList = collection(db, `products`);
    await setDoc(doc(orderList, `${name}`), {
      name: name,
      inStock: productQnt,
      category: productCategory,
      price: productPrice,
      sale: sale,
      initial: productInitialPrice,
      img: img,
      gallery: [img1, img2],
      engShortDescription: engShortDescription,
      geoShortDescription: geoShortDescription,
      rusShortDescription: rusShortDescription,
      engSize: engSize,
      geoSize: geoSize,
      rusSize: rusSize,
      engAdvantages: engAdvantages,
      geoAdvantages: geoAdvantages,
      rusAdvantages: rusAdvantages,
      engDetails: engDetails,
      geoDetails: geoDetails,
      rusDetails: rusDetails,
      engHowToUse: engHowToUse,
      geoHowToUse: geoHowToUse,
      rusHowToUse: rusHowToUse,
      compositions: compositions,
      variant: variant,
      variant2: variant2,
    });
  }

  const Clean = () => {
    setName("");
    setProductQnt("");
    setProductCategory("");
    setProductPrice("");
    setProductInitialPrice("");
    setImg("");
    setImg1("");
    setImg2("");
    setEngShortDescription("");
    setGeoShortDescription("");
    setRusShortDescription("");
    setEngSize("");
    setGeoSize("");
    setRusSize("");
    setEngAdvantages("");
    setGeoAdvantages("");
    setRusAdvantages("");
    setEngDetails("");
    setGeoDetails("");
    setRusDetails("");
    setEngHowToUse("");
    setGeoHowToUse("");
    setRusHowToUse("");
    setCompositions("");
    setVariant("");
    setVariant2("");
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
          <div
            onClick={() => {
              setOpenAddProduct(true);
              setBg("rgba(0,0,0,0.3)");
            }}
            style={{
              cursor: "pointer",
              background: "green",
              borderRadius: "0.5vw",
              height: "1.5vw",
              width: "6vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              position: "fixed",
              top: "5.2vw",
              right: "3vw",
              zIndex: "9",
            }}
          >
            Add Product
          </div>
          <Container>
            <div
              style={{
                margin: "1vw",
                height: "2vw",
                display: "flex",
                alignItems: "center",
                padding: "5px 10px",
                borderRadius: "10px",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                background: "#CCE9FF",
                boxSizing: "border-box",
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

            <div
              style={{
                boxSizing: "border-box",
                margin: "1vw 1vw 5vw 1vw",
                zIndex: 8,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {list

                ?.filter((item) => {
                  if (search == "") {
                    return item;
                  } else if (
                    item?.name
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

            <div
              style={{
                width: "88vw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                position: "fixed",
                bottom: "0vw",
                background: "#cce9ff",
                padding: "20px 0",
                border: "1px solid #ccc",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "95%",
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
                  placeholder="Name"
                  style={{ width: "11vw" }}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  requred
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
                  <option>tinting</option>
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
                <Input
                  type="number"
                  placeholder="Sale"
                  style={{ width: "5vw" }}
                  onChange={(e) => setSale(e.target.value)}
                  value={sale}
                />
                <Input
                  type="text"
                  placeholder="Cover Image"
                  style={{ width: "5vw" }}
                  onChange={(e) => setImg(e.target.value)}
                  value={img}
                />
                <Input
                  type="text"
                  placeholder="img1"
                  style={{ width: "5vw" }}
                  onChange={(e) => setImg1(e.target.value)}
                  value={img1}
                />
                <Input
                  type="text"
                  placeholder="img2"
                  style={{ width: "5vw" }}
                  onChange={(e) => setImg2(e.target.value)}
                  value={img2}
                />
                <Input
                  type="text"
                  placeholder="engShortDescription"
                  style={{ width: "15vw" }}
                  onChange={(e) => setEngShortDescription(e.target.value)}
                  value={engShortDescription}
                />
                <Input
                  type="text"
                  placeholder="geoShortDescription"
                  style={{ width: "15vw" }}
                  onChange={(e) => setGeoShortDescription(e.target.value)}
                  value={geoShortDescription}
                />
                <Input
                  type="text"
                  placeholder="rusShortDescription"
                  style={{ width: "15vw" }}
                  onChange={(e) => setRusShortDescription(e.target.value)}
                  value={rusShortDescription}
                />
                <Input
                  type="text"
                  placeholder="engSize"
                  style={{ width: "10vw" }}
                  onChange={(e) => setEngSize(e.target.value)}
                  value={engSize}
                />
                <Input
                  type="text"
                  placeholder="geoSize"
                  style={{ width: "10vw" }}
                  onChange={(e) => setGeoSize(e.target.value)}
                  value={geoSize}
                />
                <Input
                  type="text"
                  placeholder="rusSize"
                  style={{ width: "10vw" }}
                  onChange={(e) => setRusSize(e.target.value)}
                  value={rusSize}
                />
                <Input
                  type="text"
                  placeholder="engAdvantages"
                  style={{ width: "10vw" }}
                  onChange={(e) => setEngAdvantages(e.target.value)}
                  value={engAdvantages}
                />
                <Input
                  type="text"
                  placeholder="geoAdvantages"
                  style={{ width: "10vw" }}
                  onChange={(e) => setGeoAdvantages(e.target.value)}
                  value={geoAdvantages}
                />
                <Input
                  type="text"
                  placeholder="rusAdvantages"
                  style={{ width: "10vw" }}
                  onChange={(e) => setRusAdvantages(e.target.value)}
                  value={rusAdvantages}
                />
                <Input
                  type="text"
                  placeholder="engDetails"
                  style={{ width: "15vw" }}
                  onChange={(e) => setEngDetails(e.target.value)}
                  value={engDetails}
                />
                <Input
                  type="text"
                  placeholder="geoDetails"
                  style={{ width: "15vw" }}
                  onChange={(e) => setGeoDetails(e.target.value)}
                  value={geoDetails}
                />
                <Input
                  type="text"
                  placeholder="rusDetails"
                  style={{ width: "15vw" }}
                  onChange={(e) => setRusDetails(e.target.value)}
                  value={rusDetails}
                />
                <Input
                  type="text"
                  placeholder="engHowToUse"
                  style={{ width: "15vw" }}
                  onChange={(e) => setEngHowToUse(e.target.value)}
                  value={engHowToUse}
                />
                <Input
                  type="text"
                  placeholder="geoHowToUse"
                  style={{ width: "15vw" }}
                  onChange={(e) => setGeoHowToUse(e.target.value)}
                  value={geoHowToUse}
                />
                <Input
                  type="text"
                  placeholder="rusHowToUse"
                  style={{ width: "15vw" }}
                  onChange={(e) => setRusHowToUse(e.target.value)}
                  value={rusHowToUse}
                />
                <Input
                  type="text"
                  placeholder="compositions"
                  style={{ width: "10vw" }}
                  onChange={(e) => setCompositions(e.target.value)}
                  value={compositions}
                />
                <Input
                  type="text"
                  placeholder="variant"
                  style={{ width: "10vw" }}
                  onChange={(e) => setVariant(e.target.value)}
                  value={variant}
                />
                <Input
                  type="text"
                  placeholder="variant2"
                  style={{ width: "10vw" }}
                  onChange={(e) => setVariant2(e.target.value)}
                  value={variant2}
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

const ProductItem = (props) => {
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
    <ItemContainer>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
              fontWeight: "bold",
            }}
          >
            <span>{props.initial}</span>
            <span style={{ marginLeft: "2px" }}>$</span>
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
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  padding: 0.7vw 1vw;
  box-shadow: 0 0.1vw 0.3vw rgba(2, 2, 2, 0.1);
  border-radius: 0.3vw;
  background: #fff;
`;
