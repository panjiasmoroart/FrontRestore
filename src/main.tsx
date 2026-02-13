import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/layout/styles.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes/Route";
import { configureStore } from "./app/store/store";
import { Provider } from "react-redux";

const store = configureStore();

console.log("state management -> ", store.getState());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
