"use client";
import React from "react";
import MyButton from "../shared/MyButton";
import { useRouter } from "next/navigation";

const TotalCard = ({
  route,
  title,
  amount,
  plus,
}: {
  route: string;
  title: string;
  amount: number;
  plus: number;
}) => {
  const router = useRouter();

  const handleSeeDeatail = () => {
    router.push(route);
  };
  return (
    <div className=" flex h-56 w-52 flex-col items-center justify-between rounded-[10px] border  p-4 shadow-md ">
      <div className="flex w-full flex-col items-center gap-3">
        <p className="text-dark100_light500 text-[20px] font-medium">
          Total {title}
        </p>
        <p className="text-dark100_light500 text-[20px] font-bold">{amount}</p>
        <p className="text-[14px] text-primary-100">
          + {plus} {title.toLowerCase()} today
        </p>
      </div>

      <MyButton
        title="See detail"
        border="border"
        onClick={handleSeeDeatail}
        backgroundColor="bg-primary-100"
        color="text-white"
        fontSize="text-[16px]"
        width="w-40"
        height="h-[40px]"
      />
    </div>
  );
};

export default TotalCard;
