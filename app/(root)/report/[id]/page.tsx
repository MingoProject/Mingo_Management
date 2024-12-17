"use client";
import React, { useEffect, useState } from "react";
import { userData, posts } from "@/components/shared/data";
import HeaderWithButton from "@/components/header/HeaderWithButton";
import TilteIcon from "@/components/header/TilteIcon";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import PostedUser from "@/components/admin/content/PostedUser";
import UserReportInformation from "@/components/admin/report/UserReportInformation";
import { ReportResponseDTO } from "@/dtos/ReportDTO";
import { fetchReport, UpdateStatusReport } from "@/lib/services/report.service";
import { createNotification } from "@/lib/services/notification.service";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();

  const [isReportUser, setIsReport] = useState<ReportResponseDTO[]>([]);

  useEffect(() => {
    const fetchRepor = async () => {
      try {
        const data = await fetchReport();

        // Lọc những báo cáo có entityType là 'user' (so với chữ thường)
        const filteredReports = data.filter(
          (report) => report.entityType.toLowerCase() === "user"
        );

        setIsReport(filteredReports);
      } catch (error) {
        console.error("Error fetching report user", error);
      }
    };

    fetchRepor();
  }, []); // Bỏ `isReportUser` khỏi dependency array

  const reportDetail = isReportUser.find((user) => user._id === id.toString());

  if (!reportDetail) {
    return (
      <div className="w-[100%] h-screen items-center justify-center flex">
        <div className="loader"></div>
      </div>
    );
  }

  const handleConfirm = async () => {
    try {
      const data = {
        reportId: id,
        status: 1,
      };

      const param = {
        senderId: "6728699364c0871fd44f1c94",
        receiverId: reportDetail.reportedId.id,
        type: "report_post",
        postId: id[0],
      };

      const rs = await UpdateStatusReport(data);

      if (rs) {
        // Giả sử API trả về một thuộc tính `success` khi thành công

        alert("Cập nhật trạng thái thành công!");
      } else {
        alert("Cập nhật trạng thái thất bại. Vui lòng thử lại!");
      }

      console.log(rs);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại sau!");
    }
  };

  const handleReject = async () => {
    try {
      const data = {
        reportId: id,
        status: 2, // Trạng thái từ chối
      };

      const rs = await UpdateStatusReport(data);

      // Kiểm tra kết quả từ API
      if (rs) {
        // Giả sử API trả về `success: true` nếu thành công
        alert("Từ chối báo cáo thành công!");
      } else {
        alert("Không thể từ chối báo cáo. Vui lòng thử lại!");
      }

      console.log(rs); // Log kết quả để kiểm tra chi tiết
    } catch (error) {
      console.error("Lỗi khi từ chối báo cáo:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại sau!");
    }
  };

  return (
    <div className="text-dark100_light500 background-light700_dark400 flex size-full flex-col p-4">
      <HeaderWithButton
        title="Report User Detail"
        type={2}
        onConfirm={handleConfirm}
        onReject={handleReject}
      />
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
