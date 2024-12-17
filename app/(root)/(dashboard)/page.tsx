"use client";
import React, { useEffect } from "react";
import HeaderNoButton from "../../../components/header/HeaderNoButton";
import BodyCard from "../../../components/admin/dashboard/BodyCard";
import BodyTable from "../../../components/admin/dashboard/BodyTable";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/sign-in");
    }
  }, []);
  return (
    <div className="background-light700_dark400 flex size-full flex-col p-4 pl-8">
      <HeaderNoButton />
      <BodyCard />
      <BodyTable />
    </div>
  );
};

export default Page;
