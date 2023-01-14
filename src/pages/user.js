import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Order } from "../components/order";
import { LoaderAnimation } from "../components/loader";
import { AiTwotoneEdit } from "react-icons/ai";
import { setRerender } from "../redux/main";

const User = () => {
  const [loading, setLoading] = React.useState(true);

  const dispatch = useDispatch();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const us = useSelector((state) => state.storeMain.user);
  const user = JSON?.parse(us);
  const ord = useSelector((state) => state.storeDashboard.orderItems);
  const orde = JSON?.parse(ord);
  const order = orde?.filter((item) => item.phoneNumber === user?.phone);
  const orders = order?.sort((a, b) => b.orderNumber - a.orderNumber);

  const [editPhone, setEditPhone] = React.useState(false);
  const [editAdress, setEditAdress] = React.useState(false);
  const [city, setCity] = React.useState("");
  const [adress, setAdress] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const ChangePhone = async () => {
    const inforef = doc(db, "users", user?.id);
    await updateDoc(inforef, {
      phone: phone,
    });
    dispatch(setRerender());
  };
  const ChangeAdress = async () => {
    const inforef = doc(db, "users", user?.id);
    await updateDoc(inforef, {
      ["adress"]: { city: city, adress: adress },
    });
    dispatch(setRerender());
  };

  setTimeout(() => {
    setLoading(false);
  }, 500);

  return (
    <>
      {loading && <LoaderAnimation />}
      <Container loading={loading}>
        {loading ? (
          <div
            style={{
              height: "90vh",
            }}
          ></div>
        ) : (
          <>
            <Info>
              <h3>
                Hello {user?.firstname} {user?.lastname}!
              </h3>
              <div>
                <div>
                  <span>
                    <b>Email:</b> {user?.email}
                  </span>
                </div>
              </div>
              <div>
                <div>
                  {editPhone ? (
                    <Input
                      placeholder="Phone Number"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  ) : (
                    <span>
                      <b>Phone:</b> {user?.phone}
                    </span>
                  )}
                </div>
                <AiTwotoneEdit
                  className={editPhone ? "submitIcon" : "editIcon"}
                  onClick={
                    editPhone
                      ? () => {
                          setEditPhone(false);
                          ChangePhone();
                        }
                      : () => setEditPhone(true)
                  }
                />
              </div>
              <div>
                <div>
                  {editAdress ? (
                    <div>
                      <Input
                        placeholder="City"
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <Input
                        placeholder="Adress"
                        onChange={(e) => setAdress(e.target.value)}
                      />
                    </div>
                  ) : (
                    <span>
                      <b>Adress:</b> {user?.adress.city} - {user?.adress.adress}
                    </span>
                  )}
                </div>
                <AiTwotoneEdit
                  className={editAdress ? "submitIcon" : "editIcon"}
                  onClick={
                    editAdress
                      ? () => {
                          setEditAdress(false);
                          ChangeAdress();
                        }
                      : () => setEditAdress(true)
                  }
                />
              </div>
              <div>
                <div>
                  <span>
                    <b>Coupon:</b>{" "}
                    {user?.coupon != undefined ? user?.coupon : "None"}
                  </span>
                </div>
              </div>
            </Info>
            <List>
              {orders?.map((item) => {
                return <Order key={item.orderNumber} {...item} front="front" />;
              })}
            </List>
          </>
        )}
      </Container>
    </>
  );
};

export default User;

const Container = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 100%;
  // background: #ffebf8;
  padding-top: 7vw;
  opacity: ${(props) => (props.loading ? "0" : "1")};
  transition: ease-in-out 400ms;
  display: flex;
  align-items: start;

  @media only screen and (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
    padding-top: 20vw;
  }
`;

const Info = styled.div`
  background: rgba(254, 70, 184, 0.1);
  padding: 1vw 1vw 2vw 1vw;
  width: 20vw;
  height: 100%;
  margin-top: 1.5vw;
  margin-left: 2vw;
  border-radius: 0.3vw;
  display: flex;
  flex-direction: column;
  gap: 0.5vw;

  @media only screen and (max-width: 1100px) {
    width: 80vw;
    padding: 2vw 6vw 8vw 6vw;
    margin-left: 0;
    margin-top: 6vw;
    border-radius: 1vw;
    gap: 3vw;
  }

  & div {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 10px;
  }

  & > div > div {
    background: #fff;
    border-radius: 10vw;
    padding: 0.5vw 0 0.5vw 1vw;
    width: 90%;

    @media only screen and (max-width: 1100px) {
      padding: 2vw 0 2vw 3vw;
      width: 90%;
    }
  }

  & > h3 {
    padding: 0 0 0 1vw;

    @media only screen and (max-width: 1100px) {
      padding: 0 0 0 1vw;
    }
  }

  & > div > div > span {
    font-size: 0.8vw;

    @media only screen and (max-width: 1100px) {
      font-size: 3vw;
    }
  }

  .editIcon {
    font-size: 20px;
    cursor: pointer;
  }
  .submitIcon {
    font-size: 20px;
    cursor: pointer;
    color: green;
  }
`;

const Input = styled.input`
  border: none;
  font-size: 16px;
  width: 150px;

  :focus {
    outline: none;
  }
`;

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  gap: 0.5vw;
  margin-left: 2vw;

  @media only screen and (max-width: 1100px) {
    margin-left: 0;
    margin-top: 5vw;
    width: 90vw;
    gap: 1.5vw;
    grid-template-columns: 1fr;
  }
`;
