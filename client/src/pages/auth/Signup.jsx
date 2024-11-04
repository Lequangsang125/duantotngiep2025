import Form from "@/components/check/Form";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { registerFormControls } from "@/config";

const Signup = () => {
  const initialState = {
    userName: "",
    email: "",
    password: "",
  };
  function onSubmit(){

  }
  const [formData, setFormData] = useState(initialState);
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Đăng kí
        </h1>
        <span className="mt-2">Bạn đã có account </span>
        <Link
          to="/auth/signin"
          className="font-medium text-primary hover:underline"
        >
          Signin
        </Link>
      </div>
      <Form
        formControll={registerFormControls}
        buttonText={"Signup"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      ></Form>
    </div>
  );
};

export default Signup;
