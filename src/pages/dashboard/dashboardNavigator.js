import React from "react";
import styled from "styled-components";

export const DashboardNavigator = (props) => {
  const Items = [
    {
      id: 1,
      title: "Orders",
      onClick: () => props.setNavigator(1),
    },
    {
      id: 2,
      title: "Outcomes",
      onClick: () => props.setNavigator(2),
    },
    {
      id: 3,
      title: "Products",
      onClick: () => props.setNavigator(3),
    },
    {
      id: 4,
      title: "Salons",
      onClick: () => props.setNavigator(4),
    },
    {
      id: 5,
      title: "Statistics",
      onClick: () => props.setNavigator(5),
    },
    {
      id: 6,
      title: "Users",
      onClick: () => props.setNavigator(6),
    },
    {
      id: 7,
      title: "ELAN Artists",
      onClick: () => props.setNavigator(7),
    },
    {
      id: 8,
      title: "Notifications",
      onClick: () => props.setNavigator(8),
    },
    {
      id: 9,
      title: "Marketing",
      onClick: () => props.setNavigator(9),
    },
  ];

  return (
    <Container>
      {Items.map((item) => {
        return (
          <Item
            key={item.id}
            active={props.navigator === item.id}
            onClick={item.onClick}
          >
            {item.title}
          </Item>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  width: 12vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 4vw;
  background: #fff;
  z-index: 2;
  border-right: 1px solid #ccc;

  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

const Item = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 0.3vw 0 0.3vw 1vw;
  cursor: pointer;
  transition: ease 150ms;
  background: ${(props) => (props.active ? "#ccc" : "none")};
`;
