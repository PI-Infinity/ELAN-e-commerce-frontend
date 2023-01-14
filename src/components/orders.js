import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  collection,
  onSnapshot,
  setDoc,
  doc,
  addDoc,
  getDoc,
  serverTimestamp,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Order } from "../components/order";
import { AiFillPlusCircle } from "react-icons/ai";
import { CgPlayListRemove } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import {
  setBuyerName,
  setPhoneNumber,
  setCity,
  setAdress,
  setOther,
  setCoupon,
  setDiscount,
  setDelivery,
  setItems,
  setComment,
  setBank,
  setItemName,
  setQnt,
  setItemPrice,
} from "../redux/placeOrder.js";
import { MdClose, MdOutlineCleaningServices, MdRemove } from "react-icons/md";
import {
  BsSortNumericUpAlt,
  BsSortNumericDown,
  BsArrowBarUp,
} from "react-icons/bs";
import { AiOutlineFileAdd } from "react-icons/ai";
import {
  StartCalendarComponent,
  EndCalendarComponent,
} from "../components/calendar";
import { RiSearch2Line } from "react-icons/ri";
import { useNavigate, Link } from "react-router-dom";
import Loader from "react-js-loader";

function Orders(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const orderL = useSelector((state) => state.storeDashboard.orderItems);
  const orderList = JSON.parse(orderL);

  const orders = orderList?.sort((a, b) => a.orderNumber - b.orderNumber);

  const [itemNum, setItemNum] = useState(1);
  const [itemList, setItemList] = useState([]);

  const RemoveItemField = (x) => {
    var filtered = itemList.filter(function (value, index, arr) {
      return index != x;
    });
    setItemList(filtered);
  };

  // add order in list in firebase
  const buyerName = useSelector((state) => state.storeOrder.buyerName);
  const phoneNumber = useSelector((state) => state.storeOrder.phoneNumber);
  const city = useSelector((state) => state.storeOrder.city);
  const adress = useSelector((state) => state.storeOrder.adress);
  const otherInfo = useSelector((state) => state.storeOrder.other);
  const coupon = useSelector((state) => state.storeOrder.coupon);
  const discount = useSelector((state) => state.storeOrder.discount);
  const delivery = useSelector((state) => state.storeOrder.delivery);
  const bank = useSelector((state) => state.storeOrder.bank);
  const comment = useSelector((state) => state.storeOrder.comment);
  const products = useSelector((state) => state.storeProducts.list);

  const [gift, setGift] = useState(false);

  const [itemName, setItemName] = React.useState("");
  const [itemQnt, setItemQnt] = React.useState("");
  const [itemPrice, setItemPrice] = React.useState("");

  const addItemInList = () => {
    if (itemList?.find((item) => item?.name === itemName) == undefined) {
      setItemList([
        ...itemList,
        { name: itemName, quantity: itemQnt, price: itemPrice },
      ]);
    } else {
      alert("Product Already defined in order");
    }
  };

  // define new order number
  let lastItem;
  if (orders?.length > -1) {
    lastItem = orders[orders?.length - 1];
  }

  let num;
  if (orders?.length < 1) {
    num = 1;
  } else if (orders?.length == 1) {
    num = orders[0]?.orderNumber + 1;
  } else {
    num = lastItem?.orderNumber + 1;
  }

  // define order sum
  function DefineSum() {
    let arr = [];
    const summ = itemList?.map((item) => {
      const pliused = item.quantity * item.price;
      arr.push(pliused);
    });
    const initialValue = 0;
    const sumWithInitial = arr.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      initialValue
    );
    return sumWithInitial;
  }

  let summ = DefineSum();

  let allSum;
  if (delivery > 0) {
    allSum = summ - (summ / 100) * discount + parseInt(delivery);
  } else {
    allSum = 0;
  }

  const itemNames = itemList?.map((item) => {
    return item.name;
  });

  // filter inputed phone number
  let phone;
  if (phoneNumber?.startsWith(+995)) {
    phone = phoneNumber.slice(3).replace(" ", "");
  } else if (phoneNumber?.includes(" ")) {
    phone = phoneNumber.replace(" ", "");
  } else {
    phone = phoneNumber;
  }

  // define order status
  let statusDefined;
  if (gift === true) {
    statusDefined = "gift";
  } else {
    statusDefined = "newOrder";
  }

  // add order to firebase
  async function AddOrderToFirebase() {
    const orderList = collection(db, `orders`);
    await setDoc(doc(orderList, `${num}`), {
      buyer: buyerName,
      phoneNumber: phoneNumber,
      city: city,
      adress: adress,
      delivery: delivery,
      discount: discount,
      otherInfo: otherInfo,
      orderNumber: num,
      status: statusDefined,
      orderTime: serverTimestamp(),
      sum: summ,
      bank: bank,
      comment: comment,
      ["items"]: itemList,
    });
    itemList?.map(async (item) => {
      const initialQnt = products?.filter((it) => {
        if (it.name === item.name) {
          const product = doc(db, "products", `${it.name}`);
          updateDoc(product, {
            inStock: it.inStock - item.quantity,
          });
        }
      });
    });
  }

  const HandleSubmit = () => {
    if (
      buyerName?.length > 0 &&
      phoneNumber?.length > 0 &&
      city?.length > 0 &&
      // adress?.length > 0 &&
      (delivery?.length > 0 || delivery === 0) &&
      bank?.length > 0
    ) {
      AddOrderToFirebase();
      alert("added");
    } else {
      alert("not full fields");
    }
  };

  const DeleteOrder = (order, items) => {
    const subcoll = collection(db, "orders", `${order}`, "items");
    items?.map((item, index) => {
      deleteDoc(doc(subcoll, `${item.name}`));
    });
    const coll = collection(db, "orders");
    deleteDoc(doc(coll, `${order}`));
  };

  // sorting
  const [sort, setSort] = useState(true);
  const [sortBank, setSortBank] = useState("");
  const [statused, setStatused] = useState("all");
  const [itemLength, setItemLength] = useState(orders?.length);
  const startTime = useSelector((state) => state.storeCalendar.startTime);
  const endTime = useSelector((state) => state.storeCalendar.endTime);
  // rerender
  const [render, setRender] = useState(false);
  useEffect(() => {
    setRender(true);
  }, []);

  const ItemDefining = () => {
    return orders
      ?.sort(
        sort
          ? (a, b) => b.orderNumber - a.orderNumber
          : (a, b) => a.orderNumber - b.orderNumber
      )
      .filter(
        (item) =>
          item.orderTime?.seconds > Date?.parse(startTime) / 1000 &&
          item.orderTime?.seconds < Date?.parse(endTime) / 1000
      )
      .filter((item) => {
        if (statused == "all") {
          return item;
        } else {
          return item.status === statused;
        }
      })

      ?.filter((item) => {
        if (sortBank == "") {
          return item;
        } else if (
          item?.bank?.toLowerCase()?.includes(sortBank?.toLowerCase()) ||
          item?.city?.toLowerCase()?.includes(sortBank?.toLowerCase()) ||
          item?.phoneNumber?.toLowerCase()?.includes(sortBank?.toLowerCase()) ||
          item?.buyer?.toLowerCase()?.includes(sortBank?.toLowerCase()) ||
          item.coupon?.toLowerCase()?.includes(sortBank?.toLowerCase()) ||
          item?.items.name?.toLowerCase()?.includes(sortBank?.toLowerCase()) ||
          item?.items[1]?.name
            ?.toLowerCase()
            ?.includes(sortBank?.toLowerCase()) ||
          item?.items[2]?.name
            ?.toLowerCase()
            ?.includes(sortBank?.toLowerCase()) ||
          item?.items[3]?.name
            ?.toLowerCase()
            ?.includes(sortBank?.toLowerCase()) ||
          item?.items[4]?.name
            ?.toLowerCase()
            ?.includes(sortBank?.toLowerCase()) ||
          item?.items[5]?.name
            ?.toLowerCase()
            ?.includes(sortBank?.toLowerCase()) ||
          item?.items[6]?.name
            ?.toLowerCase()
            ?.includes(sortBank?.toLowerCase()) ||
          item?.items[7]?.name
            ?.toLowerCase()
            ?.includes(sortBank?.toLowerCase()) ||
          item?.items[8]?.name
            ?.toLowerCase()
            ?.includes(sortBank?.toLowerCase()) ||
          item?.items[9]?.name
            ?.toLowerCase()
            ?.includes(sortBank?.toLowerCase()) ||
          item?.items[10]?.name
            ?.toLowerCase()
            ?.includes(sortBank?.toLowerCase()) ||
          item?.items[12]?.name
            ?.toLowerCase()
            ?.includes(sortBank?.toLowerCase()) ||
          item?.items[13]?.name
            ?.toLowerCase()
            ?.includes(sortBank?.toLowerCase()) ||
          item?.items[14]?.name
            ?.toLowerCase()
            ?.includes(sortBank?.toLowerCase()) ||
          item?.items[15]?.name
            ?.toLowerCase()
            ?.includes(sortBank?.toLowerCase()) ||
          item?.items[16]?.name
            ?.toLowerCase()
            ?.includes(sortBank?.toLowerCase()) ||
          item?.items[17]?.name
            ?.toLowerCase()
            ?.includes(sortBank?.toLowerCase()) ||
          item?.items[18]?.name
            ?.toLowerCase()
            ?.includes(sortBank?.toLowerCase()) ||
          item?.items[19]?.name
            ?.toLowerCase()
            ?.includes(sortBank?.toLowerCase()) ||
          item?.items[20]?.name
            ?.toLowerCase()
            ?.includes(sortBank?.toLowerCase())
        ) {
          return item;
        }
      });
  };

  const definedItems = ItemDefining();

  // define summ deplyed in calendar filter
  const SumDefining = () => {
    const definedSum = definedItems?.map((item) => {
      if (item.status == "gift") {
        return 0;
      } else {
        return item.sum - (item.sum / 100) * item.discount;
      }
    });
    const initialValue = 0;
    const sumWithInitial = definedSum?.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      initialValue
    );
    return sumWithInitial?.toFixed(2);
  };
  const definedSum = SumDefining();
  // define delivery deployed in calendar filter
  const DeliverySumDefining = () => {
    const definedSum = definedItems?.map((item) => {
      return item.delivery;
    });
    const initialValue = 0;
    const sumWithInitial = definedSum?.reduce(
      (previousValue, currentValue) =>
        parseInt(previousValue) + parseInt(currentValue),
      initialValue
    );
    return sumWithInitial;
  };
  const deliverySumm = DeliverySumDefining();

  // define discount deployed in calendar filter
  const DiscountSumDefining = () => {
    const definedSum = definedItems?.map((item) => {
      if (item.status === "gift") {
        return item.sum;
      } else {
        if (item?.discount == "0" || item.discount?.length < 1) {
          return 0;
        } else {
          return (item.sum / 100) * item?.discount;
        }
      }
    });
    const initialValue = 0;
    const sumWithInitial = definedSum?.reduce(
      (previousValue, currentValue) =>
        parseFloat(previousValue) + parseFloat(currentValue),
      initialValue
    );
    return sumWithInitial?.toFixed(2);
  };
  const discountSum = DiscountSumDefining();

  const productList = useSelector((state) => state.storeProducts.list);

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
        <OrdersContainer>
          <div
            style={{
              position: "relative",
              bottom: props.openAddOrder,
              transition: "ease-in-out 200ms",
            }}
          >
            <div
              className="addOrder"
              style={{
                width: "70vw",
                background: "rgba(255,255,2550,0.3)",
                height: "auto",
                borderRadius: "10px",
                padding: "15px 0 20px 25px",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "center",
                gap: "10px",
                boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",

                transition: "ease 200ms",
                marginTop: "5vw",

                zIndex: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "80px" }}>
                  <span style={{ marginRight: "20px", fontWeight: "bold" }}>
                    Buyer
                  </span>
                </div>
                <Input
                  list="buyerNames"
                  type="text"
                  placeholder="Buyer Name"
                  onChange={(e) => dispatch(setBuyerName(e.target.value))}
                  value={buyerName}
                />
                <datalist id="buyerNames">
                  {orderList?.map((item, index) => {
                    return <option value={item.buyer} key={index} />;
                  })}
                </datalist>
                <Input
                  value={phoneNumber}
                  type="number"
                  list="numbers"
                  placeholder="Phone Number"
                  onChange={(e) => dispatch(setPhoneNumber(e.target.value))}
                />
                <datalist id="numbers">
                  {orderList?.map((item, index) => {
                    return <option value={item.phoneNumber} key={index} />;
                  })}
                </datalist>
                <Input
                  list="cities"
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => dispatch(setCity(e.target.value))}
                />
                <datalist id="cities">
                  {orderList?.map((item, index) => {
                    return <option value={item.city} key={index} />;
                  })}
                </datalist>
                <Input
                  list="adress"
                  type="text"
                  value={adress}
                  placeholder="Adress"
                  onChange={(e) => dispatch(setAdress(e.target.value))}
                />
                <datalist id="adress">
                  {orderList?.map((item, index) => {
                    return <option value={item.adress} key={index} />;
                  })}
                  <option>Pick Up</option>
                </datalist>
                <Input
                  type="text"
                  value={otherInfo}
                  placeholder="Other Info"
                  onChange={(e) => dispatch(setOther(e.target.value))}
                />
                <MdOutlineCleaningServices
                  className="add"
                  onClick={() => {
                    dispatch(setBuyerName(""));
                    dispatch(setPhoneNumber(""));
                    dispatch(setCity(""));
                    dispatch(setAdress(""));
                    dispatch(setOther(""));
                    dispatch(setCoupon(""));
                    dispatch(setDiscount(""));
                    dispatch(setDelivery(""));
                    dispatch(setBank(""));
                    dispatch(setComment(""));
                    setItemName("");
                    setItemQnt("");
                    setItemPrice("");
                    setItemList([]);
                  }}
                  style={{ color: "red" }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: "80px" }}>
                  <span style={{ marginRight: "20px", fontWeight: "bold" }}>
                    Details
                  </span>
                </div>
                <Input
                  list="coupons"
                  type="text"
                  placeholder="Coupon"
                  value={coupon}
                  onChange={(e) => dispatch(setCoupon(e.target.value))}
                />
                <datalist id="coupons">
                  {orderList?.map((item, index) => {
                    return <option value={item.coupon} key={index} />;
                  })}
                </datalist>
                <Input
                  type="number"
                  placeholder="Discount %"
                  value={discount}
                  onChange={(e) => dispatch(setDiscount(e.target.value))}
                />
                <Input
                  list="costs"
                  type="number"
                  placeholder="Delivery Gel"
                  value={delivery === NaN ? "0" : delivery}
                  onChange={(e) => dispatch(setDelivery(e.target.value))}
                />
                <datalist id="costs">
                  <option value={"6"}>Standart</option>
                  <option value={"8"}>Region</option>
                  <option value={"12"}>Express</option>
                  <option value={"0"}>Pick Up</option>
                </datalist>
                <Input
                  list="banks"
                  type="text"
                  placeholder="Bank"
                  value={bank}
                  onChange={(e) => dispatch(setBank(e.target.value))}
                />
                <datalist id="banks">
                  <option value={"TBC"} />
                  <option value={"BOG"} />
                  <option value={"TBC e-commerce"} />
                  <option value={"Cash"} />
                  <option value={"Other"} />
                </datalist>
                <Input
                  type="checkbox"
                  defaultChecked={gift}
                  onChange={() => setGift(!gift)}
                  style={{ width: "1vw", height: "1vw" }}
                />
                <span>Gift</span>
              </div>
              <div style={{ width: "100%", display: "flex" }}>
                <div
                  style={{
                    height: "auto",
                  }}
                >
                  <Item style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ width: "80px" }}>
                      <span
                        style={{
                          marginRight: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        Items
                      </span>
                    </div>
                    <Input
                      value={itemName}
                      list="products"
                      id="item"
                      type="text"
                      placeholder="Item"
                      onChange={(e) => setItemName(e.target.value)}
                    />
                    <datalist id="products">
                      {productList?.map((item, index) => {
                        return <option value={item.name} key={index} />;
                      })}
                    </datalist>
                    <Input
                      value={itemQnt}
                      type="number"
                      placeholder="Item Quantity: 1"
                      onChange={(e) => setItemQnt(e.target.value)}
                    />
                    <Input
                      type="number"
                      value={itemPrice}
                      placeholder="Item Price Gel"
                      onChange={(e) => setItemPrice(e.target.value)}
                    />
                    <AiFillPlusCircle
                      className="add"
                      onClick={
                        itemName?.length > 0 &&
                        itemPrice?.length > 0 &&
                        itemQnt?.length > 0
                          ? addItemInList
                          : () => alert("Add Item")
                      }
                      style={{}}
                    />
                    <MdOutlineCleaningServices
                      className="add"
                      onClick={() => {
                        setItemName("");
                        setItemQnt("");
                        setItemPrice("");
                      }}
                      style={{
                        color: "red",
                        fontSize: "24px",
                        marginLeft: "10px",
                      }}
                    />
                  </Item>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <Input
                  type="text"
                  placeholder="Comment"
                  style={{
                    width: "70%",
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
                  }}
                  onChange={(e) => dispatch(setComment(e.target.value))}
                />
              </div>
              <div
                style={{
                  height: "auto",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <div style={{ width: "15vw" }}>
                  <p>
                    Buyer Name: <b>{buyerName}</b>
                  </p>
                  <p>
                    Phone Number: <b>{phone}</b>
                  </p>

                  <p>
                    City: <b>{city}</b>
                  </p>
                  <p>
                    Adress: <b>{adress}</b>
                  </p>

                  <p>
                    Coupon: <b>{coupon}</b>
                  </p>
                  <p>
                    Comment: <b>{comment}</b>
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    width: "350px",
                    justifyContent: "start",
                    marginLeft: "200px",
                    border: "2px solid #fff",
                    borderRadius: "10px",
                    paddingLeft: "40px",
                    paddingRight: "40px",
                    overflowY: "scroll",
                    overflowX: "hidden",
                    height: "300px",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      width: "250px",
                    }}
                  >
                    <p>Items:</p>
                  </div>
                  <div>
                    {itemList?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "350px",
                            justifyContent: "space-between",
                          }}
                        >
                          <div style={{ flex: 7 }}>
                            <span>{item.name}</span>
                          </div>
                          <div style={{ flex: 1 }}>
                            <span>{item.quantity}</span>
                          </div>
                          <div style={{ flex: 2 }}>
                            <span>{item.price}</span>
                          </div>
                          <div style={{ flex: 2 }}>
                            <span>{item.price * item.quantity}</span>
                          </div>
                          <MdRemove
                            onClick={() => RemoveItemField(index)}
                            style={{ color: "red", cursor: "pointer" }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div style={{ marginLeft: "50px" }}>
                  <p>
                    Products: <b>{summ}</b>
                  </p>
                  <p>
                    Discount:{" "}
                    <b>
                      {((summ / 100) * discount)?.toFixed(2)} Gel /{" "}
                      {parseInt(discount)}%
                    </b>
                  </p>
                  <p>
                    Delivery:{" "}
                    {delivery > 0 ? <b>{parseInt(delivery)} Gel</b> : <b>0</b>}
                  </p>
                  <p>
                    All Sum: <b>{allSum}</b>
                  </p>
                </div>
              </div>
              <Button onClick={HandleSubmit}>Add Order</Button>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "1vw",
              }}
            >
              {props.openAddOrder ? (
                <AiOutlineFileAdd
                  style={{
                    fontSize: "30px",
                    color: "rgba(254, 70, 184)",
                    cursor: "pointer",
                  }}
                  onClick={() => props.setOpenAddOrder(0)}
                />
              ) : (
                <BsArrowBarUp
                  style={{
                    fontSize: "30px",
                    color: "rgba(254, 70, 184)",
                    cursor: "pointer",
                  }}
                  onClick={() => props.setOpenAddOrder("620px")}
                />
              )}
            </div>
            <div
              style={{
                display: "flex",
                width: "70vw",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 15px",
                background: "rgba(255,255,2550,1)",
                marginTop: "1vw",
                borderRadius: "25px",
                boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: "14px", marginRight: "10px" }}>
                  Start:{" "}
                </span>
                <StartCalendarComponent />
              </div>
              <div>
                <span>Income: </span>
                <b style={{ color: "green" }}>
                  {(parseFloat(definedSum) + parseFloat(deliverySumm)).toFixed(
                    2
                  )}{" "}
                  Gel
                </b>
              </div>
              <div>
                <span>Delivery: </span>
                <b style={{ color: "orange" }}>{parseInt(deliverySumm)} Gel</b>
              </div>
              <div style={{}}> / </div>
              <div>
                <span>Discounts & Gifts: </span>
                <b style={{ color: "red" }}>{discountSum} Gel</b>
              </div>
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  left: "105px",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "14px", marginRight: "10px" }}>
                  End:{" "}
                </span>
                <EndCalendarComponent />
              </div>
            </div>
            <div
              style={{
                width: "70vw",
                padding: "5px 10px",
                marginTop: "0.9vw",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1 }}>
                {sort ? (
                  <BsSortNumericDown
                    onClick={() => setSort(false)}
                    style={{ cursor: "pointer", fontSize: "20px" }}
                  />
                ) : (
                  <BsSortNumericUpAlt
                    onClick={() => setSort(true)}
                    style={{ cursor: "pointer", fontSize: "20px" }}
                  />
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  flex: 5,
                }}
              >
                <span style={{ fontSize: "16px" }}>
                  Order Quantity: <b>{definedItems?.length}</b>
                </span>
              </div>
              <div style={{ flex: 6, display: "flex", alignItems: "center" }}>
                <RiSearch2Line
                  style={{
                    fontSize: "1.4vw",
                    color: "white",
                    marginRight: "0.5vw",
                  }}
                />
                <Input
                  list="filterOrders"
                  style={{ width: "35vw", height: "2vw", background: "#fff" }}
                  type="text"
                  onChange={(e) => setSortBank(e.target.value)}
                  placeholder="Search by Phone Number, Bank, Buyer Name, City, Coupon..."
                />
                <datalist id="filterOrders">
                  <option value={"TBC"} />
                  <option value={"BOG"} />
                  <option value={"TBC e-commerce"} />
                  <option value={"Cash"} />
                  <option value={"Other"} />
                </datalist>
              </div>

              <div
                style={{
                  flex: 6,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Selected onChange={(e) => setStatused(e.target.value)}>
                  <option value={"all"}>All</option>
                  <option value={"newOrder"}>New Order</option>
                  <option value={"courier"}>Courier</option>
                  <option value={"completed"}>Completed</option>
                  <option value={"canceled"}>Cenceled</option>
                  <option value={"gift"}>Gift</option>
                  <option value={"event"}>Event</option>
                </Selected>
              </div>
            </div>

            <div
              className="orderList"
              style={{
                width: "70vw",
                height: "auto",
                minHeight: "80vh",
                borderRadius: "10px",
                boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
                display: "flex",
                columnGap: "20px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {definedItems?.map((item) => {
                return (
                  <Order
                    key={item.orderNumber}
                    {...item}
                    DeleteOrder={DeleteOrder}
                    numberOfItem={num}
                    render={render}
                  />
                );
              })}
            </div>
          </div>
        </OrdersContainer>
      )}
    </>
  );
}

export default Orders;

const OrdersContainer = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 88vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  transition: ease 200ms;
  padding-bottom: 2vw;
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;
  background: #cce9ff;

  .add {
    font-size: 32px;
    color: green;
    cursor: pointer;

    &:hover {
      filter: brightness(1.1);
    }
  }
`;

const Item = styled.div``;

const Input = styled.input`
  border: none;
  background: #fff;
  height: 30px;
  width: 160px;
  border-radius: 40px;
  margin-right: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 15px;
  padding-right: 15px;
  color: #111;
  font-size: 14px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: 14px;
    text-align: start;
    letter-spacing: 0.5px;
    color: #555;
  }
`;
const Selected = styled.select`
  border: none;
  background: #fff;
  height: 30px;
  width: 160px;
  border-radius: 40px;
  margin-right: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 15px;
  padding-right: 15px;
  color: #111;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
  }
`;

const Button = styled.div`
  height: 40px;
  width: 250px;
  // background: green;
  border: none;
  border-radius: 20px;
  color: green;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 0.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
  }

  &:hover {
    filter: brightness(1.1);
  }
`;
