import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: `/:id`,
    element: <App />,
  },
  {
    path: "*",
    element: <Navigate to={`f${(+new Date()).toString(16)}`} replace />,
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
//
