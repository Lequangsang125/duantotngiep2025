import Form from "@/components/check/Form";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { signinUser, signupUser } from "@/store/auth_slice";

import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const initialState = {
    userName: "",
    email: "",
    password: "",
  };
  function onSubmit(e) {
    e.preventDefault();
    // dispatch được sử dụng để gửi các hành động (actions) đến store
    dispatch(signupUser(formData)).then((data) => {
      console.log("Response data:", data);

      if (data?.payload.success) {
        toast({
          title: data?.payload.message,
        });
        navigate("/auth/signin");
      } else {
        toast({
          title: data?.payload.message,
          variant: "destructive",
        });
      }
    });
  }
  const [formData, setFormData] = useState(initialState);
  console.log(formData);

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
