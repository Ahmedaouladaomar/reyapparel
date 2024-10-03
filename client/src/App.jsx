import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/notifications/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ABOUT,
  ADD_COLLECTION,
  ADD_PRODUCT,
  ADMIN,
  CHECKOUT,
  COLLECTION,
  COLLECTIONS,
  COLLECTION_PLP,
  CONTACT,
  HOME,
  ORDERS,
  PAYMENTS,
  PDP_PATH,
  PRODUCT,
  PRODUCTS,
  SHIPPING,
  USERS,
} from "@/pages/routes";
import Home from "@/pages/Home";
import Header from "@/components/Header";
import Guard from "@/guard";
import Sidebar from "@/components/Sidebar";
import { Flex } from "@mantine/core";
import { FULL_HEIGHT } from "@/helpers/consts";
import ListUsers from "@/pages/Admin/Users/List";
import ListCollections from "@/pages/Admin/Collections/List";
import AddCollection from "@/pages/Admin/Collections/Add";
import ListProducts from "@/pages/Admin/Products/List";
import AddProduct from "@/pages/Admin/Products/Add";
import EditProduct from "@/pages/Admin/Products/Edit";
import EditCollection from "@/pages/Admin/Collections/Edit";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import PLP from "@/pages/PLP";
import CollectionPLP from "@/pages/CollectionPLP";
import PDP from "@/pages/PDP";
import { Footer } from "@/components/Footer";
import Checkout from "@/pages/Checkout";
import ListOrders from "@/pages/Admin/Orders/List";
import ListPayments from "@/pages/Admin/Payments/List";
import ListShipping from "@/pages/Admin/Shipping/List";
import Dashboard from "@/pages/Admin/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={CHECKOUT} element={<Checkout />} />
        <Route
          exact
          path="*"
          element={
            <>
              <Header />
              <Routes>
                <Route path={HOME} element={<Home />} />
                <Route path={ABOUT} element={<About />} />
                <Route path={CONTACT} element={<Contact />} />
                <Route path={PRODUCTS} element={<PLP />} />
                <Route path={PDP_PATH} element={<PDP />} />
                <Route path={COLLECTION_PLP} element={<CollectionPLP />} />
                <Route path="*" element={<Home />} />
              </Routes>
              <Footer />
            </>
          }
        />
        <Route
          path={ADMIN}
          element={
            <Guard>
              <Flex h={FULL_HEIGHT}>
                <Sidebar>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path={USERS} element={<ListUsers />} />
                    <Route path={COLLECTIONS} element={<ListCollections />} />
                    <Route path={ADD_COLLECTION} element={<AddCollection />} />
                    <Route path={COLLECTION} element={<EditCollection />} />
                    <Route path={PRODUCTS} element={<ListProducts />} />
                    <Route path={ADD_PRODUCT} element={<AddProduct />} />
                    <Route path={PRODUCT} element={<EditProduct />} />
                    <Route path={ORDERS} element={<ListOrders />} />
                    <Route path={PAYMENTS} element={<ListPayments />} />
                    <Route path={SHIPPING} element={<ListShipping />} />
                  </Routes>
                </Sidebar>
              </Flex>
            </Guard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
