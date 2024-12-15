"use client";
import React, { useEffect, useState } from "react";
import { userData, posts } from "@/components/shared/data";
import HeaderWithButton from "@/components/header/HeaderWithButton";
import TilteIcon from "@/components/header/TilteIcon";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import PostedUser from "@/components/admin/content/PostedUser";
import UserReportInformation from "@/components/admin/report/UserReportInformation";
import { ReportResponseDTO } from "@/dtos/ReportDTO";
import { fetchReport } from "@/lib/services/report.service";

interface Params {
  id: number;
}

const Page = ({ params }: { params: Params }) => {
  const { id } = params;

  const [isReport, setIsReport] = useState<ReportResponseDTO[]>([]);

  useEffect(() => {
    const fetchRepor = async () => {
      try {
        const data = await fetchReport();

        // Lọc những báo cáo có entityType là 'user' (so với chữ thường)
        const filteredReports = data.filter(
          (report) => report.entityType.toLowerCase() === "post"
        );

        setIsReport(filteredReports);
      } catch (error) {
        console.error("Error fetching report user", error);
      }
    };

    fetchRepor();
  }, []); // Bỏ `isReport` khỏi dependency array

  const reportDetail = isReport.find((user) => user._id === id.toString());

  if (!reportDetail) {
    return (
      <div className="w-[100%] h-screen items-center justify-center flex">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div className="text-dark100_light500 background-light700_dark400 flex size-full flex-col p-4">
      <HeaderWithButton title="Report User Detail" type={2} />
      <div className="w-full rounded-[10px] p-4 shadow-sm">
        <TilteIcon title="Created User" icon={faAddressCard} />
        <PostedUser item={reportDetail.createdById} />
        <TilteIcon title="Reported User" icon={faAddressCard} />
        <PostedUser item={reportDetail.reportedId} />
        <TilteIcon title="Report Information" icon={faAddressCard} />
        {reportDetail ? (
          <UserReportInformation item={reportDetail} />
        ) : (
          <div>Post not found</div>
        )}
      </div>
    </div>
  );
};

export default Page;
