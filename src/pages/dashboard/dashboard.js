import React, { useState } from "react";
import styled from "styled-components";
import Orders from "../../pages/dashboard/orders";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Outcome } from "../../pages/dashboard/outcome";
import { ProductList } from "../../pages/dashboard/productList";
import { UserList } from "../../pages/dashboard/userList";
import { ArtistList } from "../../pages/dashboard/artistList";
import { Salons } from "../../pages/dashboard/salons";
import { Statistics } from "../../pages/dashboard/statistics";
import { Notifications } from "../../pages/dashboard/notifications";
import { Marketing } from "../../pages/dashboard/marketing";
import { setProductsList } from "../../redux/products";
import { useDispatch } from "react-redux";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import { ImStatsBars } from "react-icons/im";
import { DashboardNavigator } from "../../pages/dashboard/dashboardNavigator";

function Dashboard(props) {
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openAddOrder, setOpenAddOrder] = useState("620px");

  const [navigator, setNavigator] = React.useState(1);

  let content;
  if (navigator === 1) {
    content = (
      <Orders openAddOrder={openAddOrder} setOpenAddOrder={setOpenAddOrder} />
    );
  } else if (navigator === 2) {
    content = <Outcome />;
  } else if (navigator === 3) {
    content = <ProductList />;
  } else if (navigator === 4) {
    content = <Salons />;
  } else if (navigator === 5) {
    content = <Statistics />;
  } else if (navigator === 6) {
    content = <UserList />;
  } else if (navigator === 7) {
    content = <ArtistList />;
  } else if (navigator === 8) {
    content = <Notifications />;
  } else if (navigator === 9) {
    content = <Marketing />;
  }

  return (
    <>
      {props.loading ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>Loading...</h2>
        </div>
      ) : (
        <>
          <Header>
            <GoToShop onClick={() => navigate("/")}>E</GoToShop>
          </Header>
          <DashboardNavigator
            navigator={navigator}
            setNavigator={setNavigator}
          />
          <Container>{content}</Container>
        </>
      )}
    </>
  );
}

export default Dashboard;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: start;
  background: #fff;
  position: fixed;
  top: 0;
  left: 12vw;
  z-index: 1;

  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 4vw;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  align-items: center;
  margin-bottom: 15px;
  background: #fff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 3;
  padding: 0 3vw;
  box-sizing: border-box;

  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

const GoToShop = styled.div`
  // position: fixed;
  // left: 1vw;
  // top: 1vw;
  border-radius: 50%;
  background: rgba(254, 70, 184);
  width: 2vw;
  height: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  padding-bottom: 0.1vw;
  cursor: pointer;
  z-index: 2;
  color: white;
`;
