import React from "react";
import { createGlobalStyle } from "styled-components";

export const darkTheme = {
  background: "red",
  icon: "#292846",
};
export const lightTheme = {
  background: "green",
  icon: "blue",
};

export const GlobalStyles = createGlobalStyle`

    body {
        background-color: ${(props) => props.theme.body}
    }

`;
