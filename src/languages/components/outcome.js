import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GiConfirmed, GiTakeMyMoney } from "react-icons/gi";
import {
  BsListCheck,
  BsSortNumericUpAlt,
  BsSortNumericDown,
  BsArrowBarUp,
} from "react-icons/bs";
import { MdClose, MdOutlineCleaningServices, MdRemove } from "react-icons/md";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  setList,
  setComment,
  setPrice,
  setTitle,
  setOutcomeSum,
  setOutcomeSearch,
} from "../redux/outcome";
import {
  StartOutcomeCalendarComponent,
  EndOutcomeCalendarComponent,
} from "../components/calendar";
import { setStartDate, setEndDate } from "../redux/calendar";

export const Outcome = () => {
  const dispatch = useDispatch();

  const [list, setList] = useState([]);
  const title = useSelector((state) => state.storeOutcome.title);
  const price = useSelector((state) => state.storeOutcome.price);
  const comment = useSelector((state) => state.storeOutcome.comment);
  const startDate = useSelector((state) => state.storeCalendar.startDate);
  const endDate = useSelector((state) => state.storeCalendar.endDate);
  const outcomeSearch = useSelector((state) => state.storeOutcome.search);

  const [sort, setSort] = useState(true);

  useEffect(() => {
    const data = onSnapshot(collection(db, "outcomes"), (snapshot) => {
      setList(snapshot.docs.map((doc) => doc.data()));
    });
    return data;
  }, []);

  const Outlist = list?.sort((a, b) => a.id - b.id);

  let lastItem;
  if (Outlist?.length > -1) {
    lastItem = Outlist[Outlist?.length - 1];
  }

  // const lastItemNumber = orders[0];
  let num;
  if (Outlist?.length < 1) {
    num = 1;
  } else if (Outlist?.length == 1) {
    num = Outlist[0]?.id + 1;
  } else {
    num = lastItem?.id + 1;
  }

  async function AddOutcome() {
    const orderList = collection(db, `outcomes`);
    console.log("add");
    await setDoc(doc(orderList, `${num}`), {
      title: title,
      price: price,
      orderTime: serverTimestamp(),
      comment: comment,
      id: num,
    });
    dispatch(setTitle(""));
    dispatch(setPrice(""));
    dispatch(setComment(""));
  }
  const DeleteOrder = (order) => {
    const coll = collection(db, "outcomes");
    deleteDoc(doc(coll, `${order}`));
  };

  const [open, setOpen] = useState("-800px");

  if (open === "5.5vw") {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  const DefineList = () => {
    var data = list
      ?.sort(sort ? (a, b) => b.id - a.id : (a, b) => a.id - b.id)
      .filter(
        (item) =>
          item.orderTime?.seconds > Date?.parse(startDate) / 1000 &&
          item.orderTime?.seconds < Date?.parse(endDate) / 1000
      )
      ?.filter((item) => {
        if (outcomeSearch == undefined) {
          return item;
        } else if (
          item?.title?.toLowerCase()?.includes(outcomeSearch?.toLowerCase())
        ) {
          return item;
        }
      })
      .map((item, index) => {
        return (
          <div
            key={index}
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              background: "#fff",
              boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
              margin: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <div style={{ flex: 1 }}>
              <span>{index + 1}</span>
            </div>
            <div style={{ flex: 4 }}>
              <span>{item?.title}</span>
            </div>
            <div
              style={{
                flex: 3,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <span>{item?.price} Gel</span>
            </div>
            <div
              style={{
                flex: 4,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span>{item?.orderTime?.toDate().getDate().toString()}</span>/
              <span>
                {parseInt(item?.orderTime?.toDate().getMonth().toString()) + 1}
              </span>
              /<span>{item?.orderTime?.toDate().getFullYear().toString()}</span>
            </div>
            <div style={{ flex: 5 }}>
              <span>{item?.comment}</span>
            </div>
            {/* <span>{item?.orderTime}</span> */}
            <MdRemove
              style={{ color: "red", fontSize: "24px" }}
              onClick={() => DeleteOrder(item?.id)}
            >
              Delete
            </MdRemove>
          </div>
        );
      });
    console.log(data);
    return data;
  };

  const listItems = DefineList();

  // define summ of outcome deployed in list window
  const OutcomeSumDefining = () => {
    const definedSum = list
      ?.sort(sort ? (a, b) => b.id - a.id : (a, b) => a.id - b.id)
      .filter(
        (item) =>
          item.orderTime?.seconds > Date?.parse(startDate) / 1000 &&
          item.orderTime?.seconds < Date?.parse(endDate) / 1000
      )
      ?.filter((item) => {
        if (outcomeSearch == undefined) {
          return item.price;
        } else if (
          item?.title?.toLowerCase()?.includes(outcomeSearch?.toLowerCase())
        ) {
          return item.price;
        }
      })
      ?.map((item) => {
        return item.price;
      });
    const initialValue = 0;
    const sumWithInitial = definedSum?.reduce(
      (previousValue, currentValue) =>
        parseFloat(previousValue) + parseFloat(currentValue),
      initialValue
    );
    console.log(sumWithInitial?.toFixed(2));
    return sumWithInitial?.toFixed(2);
  };

  const outcomeSum = OutcomeSumDefining();
  useEffect(() => {
    dispatch(setOutcomeSum(outcomeSum));
  }, [startDate]);

  return (
    <>
      {open === "5.5vw" && (
        <div
          onClick={() => setOpen("-800px")}
          style={{
            width: "100%",
            height: "1500px",
            position: "fixed",
            left: "0",
            top: "0",
            background: "rgba(0,0,0,0.2)",
            zIndex: 9,
            cursor: "pointer",
          }}
        ></div>
      )}
      <List open={open}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "10px",
            paddingBottom: "30px",
          }}
        >
          <div style={{ margin: "10px 0 0 30px" }}>
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
              alignItems: "center",
              margin: "0 0 0 10px",
            }}
          >
            Outcome: <b style={{ marginLeft: "10px" }}>{outcomeSum}</b>
          </div>
          <Input
            type="text"
            list="outcome"
            value={outcomeSearch}
            onChange={(e) => dispatch(setOutcomeSearch(e.target.value))}
            placeholder="Search by Title"
            style={{ width: "20vw", marginRight: "1vw" }}
          />
          <datalist id="outcome">
            <option>Delivery</option>
            <option>Tax 1%</option>
            <option>Products</option>
            <option>G-Translate</option>
            <option>Cash Out</option>
            <option>TBC Payment</option>
            <option>Logistic</option>
            <option>Custom Services</option>
            <option>Tax 18%</option>
            <option>FB Ads</option>
            <option>Advertisments</option>
            <option>Other</option>
          </datalist>
        </div>
        <div
          style={{
            display: "flex",
            marginLeft: "25px",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            Start: <StartOutcomeCalendarComponent />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            End: <EndOutcomeCalendarComponent />
          </div>
        </div>
        <div style={{ overflowY: "scroll", height: "450px" }}>{listItems}</div>
      </List>
      <Container>
        <GiTakeMyMoney
          style={{ fontSize: "36px", marginRight: "1vw", color: "red" }}
        />
        <Input
          type="text"
          placeholder="Add Outcome"
          list="outcome"
          value={title}
          onChange={(e) => dispatch(setTitle(e.target.value))}
        />
        <datalist id="outcome">
          <option>Delivery</option>
          <option>Tax 1%</option>
          <option>G-Translate</option>
        </datalist>
        <Input
          type="number"
          placeholder="Gel"
          value={price}
          style={{ width: "5vw", marginLeft: "1vw" }}
          onChange={(e) => dispatch(setPrice(e.target.value))}
        />
        <Input
          type="text"
          placeholder="Comment"
          value={comment}
          style={{ width: "15vw", marginLeft: "1vw" }}
          onChange={(e) => dispatch(setComment(e.target.value))}
        />
        <GiConfirmed
          style={{
            fontSize: "28px",
            marginLeft: "1vw",
            color: "green",
            cursor: "pointer",
          }}
          onClick={
            title?.length > 0 && price?.length > 0
              ? () => {
                  alert("Outcome Added");
                  AddOutcome();
                }
              : () => alert("Add Outcome Item")
          }
        />
        <div style={{ position: "relative", left: "12vw", cursor: "pointer" }}>
          {open == "-800px" ? (
            <BsListCheck
              onClick={() => setOpen("5.5vw")}
              style={{ fontSize: "28px" }}
            />
          ) : (
            <BsListCheck
              onClick={() => setOpen("-800px")}
              style={{ fontSize: "28px" }}
            />
          )}
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e4e8ff;
  height: 5vw;
  width: 100vw;
  z-index: 12;
  box-shadow: 0 -2px 15px 2px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  border: none;
  width: 35vw;
  height: 2vw;
  border-radius: 25vw;
  background: white;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  padding-left: 20px;

  :focus {
    outline: none;
  }
`;

const List = styled.div`
  position: fixed;
  bottom: ${(props) => props.open};
  right: 1vw;
  width: 800px;
  height: 600px;
  padding: 15px 20px 0 20px;
  overflowy: scroll;
  background: #cce9ff;
  border-radius: 10px;
  z-index: 10;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  transition: ease-in-out 300ms;
`;
