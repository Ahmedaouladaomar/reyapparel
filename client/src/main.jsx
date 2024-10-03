import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { Security } from "@/context/user.jsx";
import { NavigationProgress } from "@mantine/nprogress";
import { Notifications } from "@mantine/notifications";
import { CartContextProvider } from "@/context/cart.jsx";

const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  primaryColor: "rey-gold",
  colors: {
    "rey-gold": [
      "#E7B421",
      "#E7B421",
      "#E7B421",
      "#E7B421",
      "#E7B421",
      "#E7B421",
      "#E7B421",
    ],
    "dark-gold": [
      "#C09721",
      "#C09721",
      "#C09721",
      "#C09721",
      "#C09721",
      "#C09721",
      "#C09721",
    ],
  },
  defaultRadius: 0,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider theme={theme}>
    <NavigationProgress />
    <Notifications position="top-right" zIndex={1000} containerWidth="300" />
    <Security>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </Security>
  </MantineProvider>
);
