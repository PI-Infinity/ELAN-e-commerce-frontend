import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { collection, updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { Order } from "../pages/dashboard/order";
import { LoaderAnimation } from "../components/loader";
import { AiTwotoneEdit } from "react-icons/ai";
import { setRerender } from "../redux/main";
import { sendPasswordResetEmail } from "firebase/auth";
import { CgClose } from "react-icons/cg";

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

  // reset password
  const [openReset, setOpenReset] = useState(false);
  const [sent, setSent] = useState(false);

  const ResetPass = () => {
    sendPasswordResetEmail(auth, user?.email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  setTimeout(() => {
    setLoading(false);
  }, 500);

  return (
    <>
      {loading && <LoaderAnimation />}
      {openReset && (
        <ResetBg>
          <ResetPasswordPopup>
            {sent ? (
              <h4>განახლებული პაროლი გაგზავნილია ელ-ფოსტაზე! </h4>
            ) : (
              <>
                <h4>პაროლის განახლება</h4>
                <Button
                  onClick={() => {
                    setSent(true);
                    ResetPass();
                    setTimeout(() => {
                      setSent(false);
                      setOpenReset(false);
                    }, 1500);
                  }}
                >
                  ელ ფოსტაზე გაგზავნა
                </Button>
              </>
            )}
          </ResetPasswordPopup>
          <CgClose
            size={30}
            onClick={() => setOpenReset(false)}
            id="closeIcon"
          />
        </ResetBg>
      )}
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
                    <b>Password:</b> Change Password
                  </span>
                </div>
                <AiTwotoneEdit
                  className={openReset ? "submitIcon" : "editIcon"}
                  onClick={
                    openReset
                      ? () => setOpenReset(false)
                      : () => setOpenReset(true)
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

const ResetBg = styled.div`
  background: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;

  #closeIcon {
    position: fixed;
    top: 15vw;
    right: 15vw;
    cursor: pointer;

    @media only screen and (max-width: 1100px) {
      top: 35vw;
      right: 5vw;
    }
  }
`;

const ResetPasswordPopup = styled.div`
  width: 40vw;
  height: 25vw;
  border-radius: 0.5vw;
  box-shadow: 0 0.1vw 0.3vw rgba(0, 0, 0, 0.1);
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  @media only screen and (max-width: 1100px) {
    width: 80vw;
    height: 40vw;
    border-radius: 1.5vw;
  }
`;

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

const InputPass = styled.input`
  font-size: 1vw;
  width: 25vw;
  height: 2.5vw;
  border: 1px solid #ccc;
  background: white;
  border-radius: 5vw;
  padding: 0;
  text-align: center;
  color: #222;

  @media only screen and (max-width: 600px) {
    width: 70vw;
    height: 7vw;
    border-radius: 1.5vw;
    gap: 1.5vw;
    padding: 1.5vw;

    font-size: 16px;
  }

  &:focus {
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

const Button = styled.div`
  font-size: 0.8vw;
  width: 12vw;
  height: 2vw;
  border-radius: 5vw;
  border: 1px solid #ccc;
  background: #31a65e;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1vw;
  padding-bottom: 0.1vw;
  cursor: pointer;

  @media only screen and (max-width: 600px) {
    font-size: 3vw;
    letter-spacing: 0.2vw;
    width: 60vw;
    height: 8vw;
    border-radius: 10vw;
  }

  :hover {
    filter: brightness(1.1);
  }
`;
