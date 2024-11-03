import { Route, Routes } from "react-router-dom";
import { AuthLayout } from "./components/auth/Layout";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import AdminProduct from "./pages/admin-view/Product";
import Dashboard from "./pages/admin-view/Dashboard";
import Order from "./pages/admin-view/Order";
import Featutres from "./pages/admin-view/Featutres";
import LayoutAdmin from "./components/admin-view/Layout";
import LayoutShoping from "./components/shopping-view/Layout";
import LayoutNotfound from "./components/not-found/Layout";
import AccountShopping from "./pages/shopping-view/Account";
import CheckoutShopping from "./pages/shopping-view/Checkout";
import HomeShopping from "./pages/shopping-view/Home";
import ListProductShopping from "./pages/shopping-view/ListProduct";

function App() {
  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white">
        <Routes>
          <Route path="/auth" element={<AuthLayout></AuthLayout>}>
            <Route path="signin" element={<Signin></Signin>} />
            <Route path="signup" element={<Signup></Signup>} />
          </Route>

          <Route path="/admin" element={<LayoutAdmin></LayoutAdmin>}>
            <Route path="dashboard" element={<Dashboard></Dashboard>} />
            <Route path="products" element={<AdminProduct></AdminProduct>} />

            <Route path="orders" element={<Order></Order>} />

            <Route path="features" element={<Featutres></Featutres>} />
          </Route>
          <Route path="/shop" element={<LayoutShoping></LayoutShoping>}>
            <Route
              path="accountshop"
              element={<AccountShopping></AccountShopping>}
            />

            <Route
              path="checkoutshop"
              element={<CheckoutShopping></CheckoutShopping>}
            />

            <Route path="homeshop" element={<HomeShopping></HomeShopping>} />
            <Route
              path="listshop"
              element={<ListProductShopping></ListProductShopping>}
            />
          </Route>
          <Route path="*" element={<LayoutNotfound></LayoutNotfound>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
