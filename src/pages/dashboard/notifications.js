import React from "react";
import styled from "styled-components";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export const Notifications = () => {
  const [notif, setNotif] = React.useState([]);
  /** */
  // import artists from firebase
  React.useEffect(() => {
    const data = onSnapshot(collection(db, "notifications"), (snapshot) => {
      setNotif(snapshot.docs.map((doc) => doc.data()));
    });
    return data;
  }, []);
  return (
    <Container>
      {notif?.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              padding: "1vw",
              borderRadius: "0.25vw",
              background: "#fff",
              width: "auto",
              maxWidth: "70vw",
              gap: "3vw",
            }}
          >
            <h4>
              Name: <span>{item.name}</span>
            </h4>
            <h4>
              Email: <span>{item.email}</span>
            </h4>
            <h4>
              Phone: <span>{item.phone}</span>
            </h4>
            <h4>
              Text: <span>{item.text}</span>
            </h4>
          </div>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.1);
  width: 88vw;
  height: 90vh;
  z-index: 8;
  transition: ease-in-out 300ms;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-top: 4vw;
  padding: 2vw 3vw;
  background: #cce9ff;
`;
