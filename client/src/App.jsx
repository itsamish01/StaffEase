import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/layout";
import {
  Review,
  Login,
  PublicQuery,
  BusinessPage,
  EmployeePage,
} from "./pages";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <PublicQuery /> },
      { path: "/login", element: <Login /> },
      { path: "/review", element: <Review /> },
      { path: "/businesspage", element: <BusinessPage /> },
      { path: "/employeepage", element: <EmployeePage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
