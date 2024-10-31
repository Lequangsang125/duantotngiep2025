import { Route, Routes } from "react-router-dom";
import { AuthLayout } from "./components/auth/Layout";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";

function App() {
  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white">
        <h1> header</h1>
        <Routes>
          <Route path="/auth" element={<AuthLayout></AuthLayout>}>
            <Route path="signin" element={<Signin></Signin>} />
            <Route path="signup" element={<Signup></Signup>} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
