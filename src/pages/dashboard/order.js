import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import {
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  update,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { MdMenuOpen } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import logo2 from "../../assets/smallLogo.png";

export const Order = (props) => {
  const [open, setOpen] = React.useState(false);
  const [orderedItems, setOrderedItems] = React.useState();
  const N = props.numberOfItem?.toString();
  const ord = props.order;

  // React.useEffect(() => {
  //   // if (N != undefined) {
  //   const data = onSnapshot(
  //     collection(db, `orders/${props.orderNumber}/items`),
  //     (snapshot) => {
  //       setOrderedItems(snapshot.docs.map((doc) => doc.data()));
  //     }
  //   );
  //   return data;
  //   // }
  // }, [open]);

  // ordered time
  var date = new Date(props?.orderTime?.seconds * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  // defined status
  const [status, setStatus] = React.useState("#f1f1f1");

  const [selectedOption, setSelectedOption] = React.useState(props?.status);
  let bgColor;
  if (!props?.front) {
    if (selectedOption === "New Order") {
      bgColor = "#a0e482";
    } else if (selectedOption === "courier") {
      bgColor = "#eef068";
    } else if (selectedOption == "canceled") {
      bgColor = "#e48282";
    } else if (selectedOption == "gift") {
      bgColor = "#FFC2F3";
    } else if (selectedOption == "event") {
      bgColor = "#e5e5e5";
    } else if (selectedOption == "Not Finished") {
      bgColor = "#f1f1f1";
    } else {
      bgColor = "rgba(255,255,2550,1)";
    }
  } else {
    bgColor = "rgba(255,255,2550,1)";
  }

  // update status
  const products = useSelector((state) => state.storeProducts.list);
  const Update = (x) => {
    const document = doc(db, "orders", `${props?.orderNumber}`);
    updateDoc(document, {
      status: x,
    });

    // add item quantity in stock from removed check, (when cancel check)
    if (x == "canceled") {
      orderedItems?.map(async (item) => {
        const initialQnt = products?.filter((it) => {
          if (it.name === item.name) {
            const product = doc(db, "products", `${it.name}`);
            updateDoc(product, {
              inStock: parseInt(it.inStock) + parseInt(item.quantity),
            });
          }
        });
      });
    }
  };

  // add item quantity in stock from removed order, (when removing order)

  const ReturnItemQnt = () => {
    orderedItems?.map(async (item) => {
      const initialQnt = products?.filter((it) => {
        if (it.name === item.name) {
          const product = doc(db, "products", `${it.name}`);
          updateDoc(product, {
            inStock: parseInt(it.inStock) + parseInt(item.quantity),
          });
        }
      });
    });
  };

  console.log(props?.items);

  return (
    <OrderContainer
      key={props.orderNumber}
      status={bgColor}
      front={props.front}
    >
      {props.front ? (
        <div style={{ marginTop: "1vw" }}></div>
      ) : (
        <MdClose
          style={{ fontSize: "26px", marginBottom: "10px" }}
          className="close"
          onClick={() => {
            ReturnItemQnt();
            props.DeleteOrder(props.orderNumber, orderedItems);
          }}
        />
      )}
      <span>
        Order Number: <b>#000{props.orderNumber}</b>
      </span>
      <div
        style={{ marginTop: "20px", marginBottom: "20px", fontSize: "15px" }}
      >
        Order Time -{" "}
        <b>
          {new Date(props?.orderTime?.seconds * 1000).toLocaleDateString(
            "en-US"
          ) +
            " / " +
            formattedTime}
        </b>
      </div>
      <ScrollContainer>
        {props?.items === "ELAN Brow Book" ? (
          <div>ELAN Brow Book</div>
        ) : (
          props?.items?.map((item, index) => {
            return (
              <div
                key={item.orderNumber}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <P2 id="name">{item?.name}</P2>
                <P2>
                  <b>{item?.quantity}</b>
                </P2>
                <P2>{item?.price} Gel</P2>
                <P2>
                  <span style={{ color: "gray" }}>
                    {item?.quantity * item?.price} Gel
                  </span>
                </P2>
              </div>
            );
          })
        )}
      </ScrollContainer>

      <div
        style={{
          marginTop: "20px",
          dispaly: "flex",
          flexDirection: "column",
          width: "90%",
          height: "200px",
        }}
      >
        <P>
          Sum: <Span>{props.sum} Gel</Span>
        </P>
        <P>
          Discount:{" "}
          <Span>
            {((props.sum / 100) * props.discount).toFixed(2)} Gel /{" "}
            {props.discount}%
          </Span>
        </P>
        <P>
          Delivery: <Span>{props.delivery} Gel</Span>
        </P>
        <P>
          Full Sum:{" "}
          <Span>
            {props.items === "ELAN Brow Book" ? (
              <div>{props?.sum} Gel</div>
            ) : (
              <>
                {" "}
                {(
                  parseFloat(props.sum) -
                  parseFloat((props.sum / 100) * props.discount) +
                  parseFloat(props.delivery)
                ).toFixed(0)}{" "}
                Gel
              </>
            )}
          </Span>
        </P>
        {!props.front && (
          <Buyer
            onClick={() =>
              alert(
                JSON.stringify(
                  props.buyer +
                    " / " +
                    props.phoneNumber +
                    " / " +
                    props.city +
                    " / " +
                    props.adress +
                    " / " +
                    props.coupon +
                    " / " +
                    props.bank
                )
              )
            }
          >
            <FaUserCheck style={{ fontSize: "22px", color: "#062841" }} />
          </Buyer>
        )}
        {props?.front ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // padding: "1vw 0",
            }}
          >
            <Img src={logo2} alt="logo" />
          </div>
        ) : (
          <StatusBar
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",

              marginTop: "20px",
            }}
          >
            <span>Status</span>
            {selectedOption !== "canceled" ? (
              <select
                id="status"
                name="status"
                className="status"
                value={selectedOption}
                onChange={(e) => {
                  Update(e.target.value);
                  setSelectedOption(e.target.value);
                }}
              >
                <option value="New Order">New Order</option>
                <option value="Not Finished">Not Finished</option>
                <option value="courier">Courier</option>
                <option value="canceled">Canceled</option>
                <option value="completed">Completed</option>
                <option value="gift">Gift</option>
                <option value="event">Event</option>
              </select>
            ) : (
              <select
                id="status"
                name="status"
                className="status"
                value={selectedOption}
                onChange={(e) => {
                  props.DeleteOrder(props.orderNumber);
                }}
              >
                <option value="courier">Canceled</option>
                <option value="courier">Remove</option>
              </select>
            )}
          </StatusBar>
        )}
      </div>
    </OrderContainer>
  );
};

const OrderContainer = styled.div`
  width: 15vw;
  height: ${(props) => (props.front == undefined ? "24vw" : "22vw")};
  background: ${(props) => props.status};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 15px;
  padding-top: 15px;
  cursor: pointer;
  transition: ease 300ms;
  box-shadow: 0px 0.1vw 0.3vw rgba(2, 2, 2, 0.1);
  scale: 0.97;
  margin-top: 1vw;

  @media only screen and (max-width: 1100px) {
    width: 75vw;
    height: ${(props) => (props.front == undefined ? "auto" : "auto")};
    padding: 8vw 7vw;
    box-shadow: 0px 0.3vw 0.9vw rgba(2, 2, 2, 0.1);
  }

  .close {
    color: gray;
    &:hover {
      color: red;
    }
  }
`;

const Img = styled.img`
  width: 8vw;

  @media only screen and (max-width: 1100px) {
    width: 24vw;
  }
`;

const ScrollContainer = styled.div`
  // display: flex;
  // justify-content: space-between;
  width: 90%;
  height: 60px;
  min-height: 60px;
  background: #ffebf8;
  padding: 15px;
  border-radius: 10px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background-color: #1e1e1e;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: var(--green2);
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: "none";
  }

  #name {
    width: 60%;
  }
`;
const Start = styled.div`
  display: flex;
  height: 60px;
  justify-content: center;
  align-items: center;
  width: 90%;
  background: #ffebf8;
  padding: 15px;
  border-radius: 10px;
`;

const P = styled.span`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin-bottom: 10px;
`;
const P2 = styled.span`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 10px;
`;
const Span = styled.b`
  margin-left: 15px;
  font-size: 15px;
`;
const Buyer = styled.div`
  margin-top: 20px;
  margin-bottom: 5px;
  background: #ffebf8;
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: center;
  border-radius: 5px;

  &:hover {
    background: #ffe8ee;
  }
`;

const StatusBar = styled.div`
  .status {
    border: none;

    &:focus {
      outline: none;
    }
  }
`;
