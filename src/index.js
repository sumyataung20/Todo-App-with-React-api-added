import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import ThemedApp from "./ThemedApp";
const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme({
  palette: {
    mode: "dark",
    text: { fade: "#999", light: "#fff" },
  },
});
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ThemedApp>
          <CssBaseline />
          <App />
        </ThemedApp>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
