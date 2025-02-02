"use client";
import React, { useState } from "react";
// import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/services/user.service";

const FloatingLabelInput = ({ id, label, type, value, setValue }: any) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (value === "") {
      setIsFocused(false);
    }
  };

  return (
    <div className="relative mb-6">
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`text-dark100_light500 w-full border-b-2 bg-transparent p-2 transition-all duration-200 ${
          isFocused || value ? "pt-5" : "pt-2"
        }`}
        placeholder=" "
        required
      />
      <label
        htmlFor={id}
        className={`absolute left-2 transition-all duration-200 ${
          isFocused || value
            ? "text-dark100_light500 top-0 text-xs"
            : "text-dark100_light500 top-2 text-sm"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const userData = { phoneNumber, password };

    try {
      const user = await login(userData);

      if (user) {
        const userRoles = user.roles || [];
        if (userRoles.includes("admin")) {
          localStorage.setItem("token", user.token);
          const decodedToken = JSON.parse(atob(user.token.split(".")[1]));
          localStorage.setItem("loginTime", String(Date.now()));
          const userId = decodedToken?.id;
          localStorage.setItem("userId", userId);
          router.push("/");
        } else {
          setErrorMessage("You do not have access!");
        }
      } else {
        setErrorMessage("Login failed!");
      }
    } catch (error: any) {
      console.error("Error login:", error);
      setErrorMessage(error.message || "Error.");
    }
  };

  return (
    <div className="background-light800_dark400 flex h-screen w-full items-center justify-center">
      <div className="background-light700_dark300 my-[110px] w-[549px] rounded-lg px-[55px] py-[51px] shadow-md">
        <h2 className="text-dark100_light500 mb-6 text-center text-2xl font-bold">
          Login
        </h2>

        {/* {error && <p className="text-center text-red-500">{error}</p>} */}
        {errorMessage && (
          <p className="text-center text-red-500">{errorMessage}</p>
        )}
        <form className="mt-[74px]" onSubmit={handleSubmit}>
          <FloatingLabelInput
            id="username"
            label="Phone number"
            type="text"
            value={phoneNumber}
            setValue={setPhoneNumber}
          />
          <FloatingLabelInput
            id="password"
            label="Password"
            type="password"
            value={password}
            setValue={setPassword}
          />
          <button
            type="submit"
            className="mt-5 w-full rounded-lg bg-primary-100 py-2 text-white transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-2 text-end">
          <a href="#" className="text-dark100_light500 text-sm hover:underline">
            Forget password ?
          </a>
        </div>

        {/* <div className="mt-4 flex items-center justify-between">
          <hr className="grow border-gray-300" />
          <span className="mx-2 text-gray-500">hoặc</span>
          <hr className="grow border-gray-300" />
        </div>
        <div className="mt-4 flex justify-center">
          <button className="text-dark100_light500 background-light800_dark400 flex w-32 items-center justify-center rounded-lg p-2 transition duration-200 hover:bg-gray-300">
            <Icon icon="logos:google-icon" className="mr-2" />
            Google
          </button>
          <button className="text-dark100_light500 background-light800_dark400 ml-2 flex w-32 items-center justify-center rounded-lg p-2 transition duration-200 hover:bg-gray-300">
            <Icon icon="logos:facebook" className="mr-2 " />
            Facebook
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-dark100_light500 text-sm">
            Chưa có tài khoản?{" "}
            <a href="/sign-up" className="text-primary-100 hover:underline">
              Đăng ký
            </a>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default function Page() {
  return <SignIn />;
}
