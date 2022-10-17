import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ShoppingCartContextProvider } from "./context/ShoppingCartContext";
import { EventsContextProvider } from "./context/EventsContext";
import { NotificationsContextProvider } from "./context/notifications/NotificationsContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <NotificationsContextProvider>
      <EventsContextProvider>
        <ShoppingCartContextProvider>
          <App />
        </ShoppingCartContextProvider>
      </EventsContextProvider>
    </NotificationsContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
