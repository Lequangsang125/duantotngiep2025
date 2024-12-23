import Form from "@/components/check/Form";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { signinFormControll } from "@/config";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { signinUser } from "@/store/auth_slice";

const initialState = {
  email: "",
  password: "",
};
const Signin = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  console.log(signinFormControll);
  function onSubmit(e) {
    e.preventDefault();

    dispatch(signinUser(formData)).then((data) => {
      console.log(data)
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Đăng nhập
        </h1>
        <p className="mt-2">
          Bạn không có account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Signup
          </Link>
        </p>
      </div>
      <Form
        formControll={signinFormControll}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Signin;
