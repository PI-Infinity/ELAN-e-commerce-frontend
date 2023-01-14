import React from "react";
import styled from "styled-components";
import { Filter } from "../components/artistFilter";
import { List } from "../components/artistsList";
import { Info } from "../components/artistInfo";
import { Header } from "../components/header";
import { LoaderAnimation } from "../components/loader";

function Artists() {
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState("All");

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                // justifyContent: "space-between",
                alignItems: "center",
                width: "95%",
              }}
              className="titleContainer"
            >
              <Title>Brow Artists</Title>
              <div style={{ width: "200px" }}></div>
            </div>
            <Filter setFilter={setFilter} filter={filter} />
            <List filter={filter} setLoading={setLoading} />
          </>
        )}
      </Container>
    </>
  );
}

export default Artists;

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  overflow-x: hidden;
  padding-bottom: 3vw;
  padding-top: 5vw;
  opacity: ${(props) => (props.loading ? "0" : "1")};
  transition: ease-in-out 300ms;

  @media only screen and (max-width: 1100px) {
    padding-top: 24vw;
  }

  .titleContainer {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    @media only screen and (max-width: 1100px) {
      flex-direction: column;
      height: auto;
    }
  }
`;

const Title = styled.h1`
  color: #011e2e;
  margin-top: 30px;
  margin-bottom: 30px;
  letter-spacing: 0.03vw;

  @media only screen and (max-width: 1100px) {
    margin-top: 0;
    font-size: 5vw;
    margin-bottom: 5vw;
    letter-spacing: 0.15vw;
  }
`;
