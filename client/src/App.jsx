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
import Check_aurh from "./components/check/Check_aurh";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth_slice";
import { Skeleton } from "@/components/ui/skeleton";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  const { user, isAuth, isLoading } = useSelector((state) => state.auth);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  console.log(isLoading, user);

  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white">
        <Routes>
          <Route
            path="/auth"
            element={
              <Check_aurh
                isAuthenticated={isAuth}
                user={user}
                isLoading={isLoading}
              >
                <AuthLayout></AuthLayout>
              </Check_aurh>
            }
          >
            <Route path="signin" element={<Signin></Signin>} />
            <Route path="signup" element={<Signup></Signup>} />
          </Route>

          <Route
            path="/admin"
            element={
              <Check_aurh
                isAuthenticated={isAuth}
                user={user}
                isLoading={isLoading}
              >
                <LayoutAdmin></LayoutAdmin>
              </Check_aurh>
            }
          >
            <Route path="dashboard" element={<Dashboard></Dashboard>} />
            <Route path="products" element={<AdminProduct></AdminProduct>} />

            <Route path="orders" element={<Order></Order>} />

            <Route path="features" element={<Featutres></Featutres>} />
          </Route>
          <Route
            path="/shop"
            element={
              <Check_aurh
                isAuthenticated={isAuth}
                user={user}
                isLoading={isLoading}
              >
                <LayoutShoping></LayoutShoping>
              </Check_aurh>
            }
          >
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
