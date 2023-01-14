import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Shop from "./pages/shop";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Signup from "./pages/signup";
import User from "./pages/user";
import Artists from "./pages/artists";
import Product from "./pages/product";
import Delivery from "./pages/delivery";
import Privacy from "./pages/privacyPolicy";
import About from "./pages/about";
import Terms from "./pages/terms";
import ReturnPolice from "./pages/returnPolice";
import Contact from "./pages/contact";
import Checkout from "./pages/checkout";
import Complete from "./pages/complete";
import { lightTheme, darkTheme, GlobalStyles } from "./context/theme";
import { collection, doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { ProductList } from "./components/productList";
import { setProductsList, setSalons } from "./redux/products";
import { useDispatch, useSelector } from "react-redux";
import Flag from "react-world-flags";
import { Menu } from "./components/menu";
import { Cart } from "./components/cart";
import { setLanguage } from "./redux/main";
import { AuthContext } from "./context/AuthContext";
import { Info } from "./components/artistInfo";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { setUser } from "./redux/main";
import { setOrderItems } from "./redux/dashboard";
import { LoaderAnimation } from "./components/loader";
import logo from "./assets/logo.png";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = React.useState(true);
  // authentication // private route
  const { currentUser } = useContext(AuthContext);

  const rerender = useSelector((state) => state.storeMain.rerender);

  /** */
  // import current user info
  React.useEffect(() => {
    if (currentUser != undefined) {
      const getting = async () => {
        const docRef = doc(db, "users", currentUser?.uid);
        const docSnap = await getDoc(docRef);
        dispatch(setUser(JSON.stringify(docSnap.data())));
      };
      getting();
      return getting;
    }
  }, [rerender]);

  /** */
  // import products list from firebase
  React.useEffect(() => {
    const data = onSnapshot(collection(db, "products"), (snapshot) => {
      dispatch(setProductsList(snapshot.docs.map((doc) => doc.data())));
    });
    return data;
  }, []);

  /** */
  // import salons from firebase
  React.useEffect(() => {
    const data = onSnapshot(collection(db, "salons"), (snapshot) => {
      dispatch(setSalons(snapshot.docs.map((doc) => doc.data())));
    });
    return data;
  }, []);

  /** */
  // import orders from fireabse
  React.useEffect(() => {
    const data = onSnapshot(collection(db, "orders"), (snapshot) => {
      dispatch(
        setOrderItems(JSON.stringify(snapshot.docs.map((doc) => doc.data())))
      );
      setLoading(false);
    });
    return data;
  }, []);

  const [theme, setTheme] = useState(() => true);

  // define language
  const currentLang = useSelector((state) => state.storeMain.language);

  /** */
  // define authorized pages
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  const RequireLogout = ({ children }) => {
    return !currentUser ? children : <Navigate to="/" />;
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MainLogoImg src={logo} alt="logo" />
        </div>
      ) : (
        <>
          {!location.pathname.includes("/dashboard") &&
            !location.pathname.includes("/dashboard/statistics") && (
              <Header loading={loading} />
            )}
          <AppContainer>
            <Routes>
              <Route
                path="/"
                element={
                  // <PrivateRoute>
                  <Home />
                }
              ></Route>
              <Route
                path="/login"
                element={
                  // <PrivateRoute>
                  <RequireLogout>
                    <Login />
                  </RequireLogout>
                }
              ></Route>
              <Route
                path="/signup"
                element={
                  // <PrivateRoute>
                  <RequireLogout>
                    <Signup />
                  </RequireLogout>
                }
              ></Route>
              <Route
                path="/shop"
                element={
                  // <PrivateRoute>
                  <Shop />
                }
              ></Route>
              <Route
                path="/dashboard"
                element={
                  // <PrivateRoute>
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              ></Route>

              <Route
                path="/user"
                element={
                  <RequireAuth>
                    <User />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/product/:Id"
                element={
                  // <PrivateRoute>
                  <Product />
                }
              ></Route>
              <Route
                path="/info/:Id"
                element={
                  // <PrivateRoute>
                  <Info />
                }
              ></Route>
              <Route
                path="/artists"
                element={
                  // <PrivateRoute>
                  <Artists />
                }
              ></Route>
              <Route
                path="/contact"
                element={
                  // <PrivateRoute>
                  <Contact />
                }
              ></Route>
              <Route
                path="/delivery"
                element={
                  // <PrivateRoute>
                  <Delivery />
                }
              ></Route>
              <Route
                path="/privacy"
                element={
                  // <PrivateRoute>
                  <Privacy />
                }
              ></Route>
              <Route
                path="/terms"
                element={
                  // <PrivateRoute>
                  <Terms />
                }
              ></Route>
              <Route
                path="/about"
                element={
                  // <PrivateRoute>
                  <About />
                }
              ></Route>
              <Route
                path="/return"
                element={
                  // <PrivateRoute>
                  <ReturnPolice />
                }
              ></Route>
              <Route
                path="/education"
                element={
                  // <PrivateRoute>
                  <Artists />
                }
              ></Route>
              <Route
                path="/checkout"
                element={
                  // <PrivateRoute>
                  <Checkout />
                }
              ></Route>
              <Route
                path="/cart"
                element={
                  // <PrivateRoute>
                  <Cart />
                }
              ></Route>
              <Route
                path="/complete"
                element={
                  // <PrivateRoute>
                  <Complete />
                }
              ></Route>
            </Routes>

            <Languages>
              <div onClick={() => dispatch(setLanguage("geo"))}>
                <Flag
                  code="geo"
                  className="lang"
                  style={
                    currentLang === "geo"
                      ? {
                          filter: "brightness(1.1)",
                        }
                      : { filter: "brightness(0.7)" }
                  }
                />
              </div>
              <div onClick={() => dispatch(setLanguage("eng"))}>
                <Flag
                  code="Usa"
                  className="lang"
                  style={
                    currentLang === "eng"
                      ? {
                          filter: "brightness(1.1)",
                        }
                      : { filter: "brightness(0.7)" }
                  }
                />
              </div>
              <div onClick={() => dispatch(setLanguage("rus"))}>
                <Flag
                  code="Rus"
                  className="lang"
                  style={
                    currentLang === "rus"
                      ? {
                          filter: "brightness(1.1)",
                        }
                      : { filter: "brightness(0.7)" }
                  }
                />
              </div>
            </Languages>
            {!location.pathname.includes("/dashboard") &&
              !location.pathname.includes("/dashboard/statistics") && (
                <Footer />
              )}
          </AppContainer>
        </>
      )}
    </>
  );
}

export default App;

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Languages = styled.div`
  height: 6vw;
  width: 2vw;
  background: #d2f9ff;
  border-radius: 1vw 0 0 1vw;
  border-radius: 0.5vw;
  position: fixed;
  right: 0;
  top: 9vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  & div {
    width: 1.2vw;
    height: 1.2vw;
    overflow: hidden;
  }

  .lang {
    cursor: pointer;
  }

  @media only screen and (max-width: 621px) {
    display: none;
  }
`;
const MainLogoImg = styled.img`
  width: 6vw;
  @media only screen and (max-width: 621px) {
    width: 20vw;
    margin-left: 7vw;
  }
`;
