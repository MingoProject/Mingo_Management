"use client";
import Image from "next/image";
import React, { useState } from "react";
import { format } from "date-fns"; // Import format từ date-fns
import LableValue from "@/components/header/LableValue";
import { ReportResponseDTO } from "@/dtos/ReportDTO";

const UserReportInformation = ({ item }: { item: ReportResponseDTO }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="w-full flex flex-col gap-4 ">
      <div className="w-full flex gap-60 p-4 pb-0">
        <div className="flex flex-col self-start">
          <LableValue label="Report ID" value={item._id.toString()} />
          <LableValue label="Content" value={item.content} />
        </div>
        <div className="flex flex-col self-center ">
          <LableValue
            label="Create Time"
            value={format(item.createdAt, "dd/MM/yyyy 'at' HH:mm")}
          />
          <LableValue
            label="Report Time"
            value={format(item.createdAt, "dd/MM/yyyy 'at' HH:mm")}
          />
        </div>
      </div>
      <div className="w-full px-4 flex flex-col gap-4">
        <LableValue label="Proof" />
        <div className="grid grid-cols-5 gap-4">
          {item.attachments
            ?.slice(0, showAll ? item.attachments.length : 15)
            .map((attachment, index) => {
              console.log("Rendering attachment:", attachment); // Debug line
              return (
                <Image
                  key={index}
                  src={attachment}
                  height={165}
                  width={195}
                  alt="attachment"
                  className="w-full h-auto object-cover"
                />
              );
            })}
        </div>
        {item.attachments?.length ? (
          item.attachments?.length > 15 &&
          !showAll && (
            <button
              className="mt-4 text-blue-500"
              onClick={() => setShowAll(true)}
            >
              Show All
            </button>
          )
        ) : (
          <div>Không có đính kèm</div>
        )}
        {showAll && (
          <button
            className="mt-4 text-blue-500"
            onClick={() => setShowAll(false)}
          >
            <p className="text-primary-100">Ẩn bớt</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default UserReportInformation;
