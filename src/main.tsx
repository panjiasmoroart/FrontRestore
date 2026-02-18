import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/layout/styles.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes/Route";
import { store } from "./app/store/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const store = configureStore();
// console.log("state management -> ", store.getState());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
