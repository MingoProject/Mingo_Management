import { ReportResponseDTO } from "@/dtos/ReportDTO";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function fetchReport(): Promise<ReportResponseDTO[]> {
  try {
    console.log(`${BASE_URL}/report/get-all-report`, "this is report");
    const response = await fetch(`${BASE_URL}/report/get-all-report`);
    if (!response.ok) {
      throw new Error("Error fetching reportreport");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch report:", error);
    throw error;
  }
}
export async function UpdateStatusReport(param: any) {
  try {
    console.log(param, "this is param");
    const response = await fetch(`${BASE_URL}/report/update-status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // Đặt Content-Type để server biết dữ liệu là JSON
      },
      body: JSON.stringify(param), // Chuyển đổi đối tượng thành chuỗi JSON
    });

    if (!response.ok) {
      // Nếu phản hồi không thành công
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error; // Ném lỗi ra ngoài để dễ dàng debug ở nơi gọi hàm
  }
}

export async function countReports() {
  try {
    const response = await fetch(`${BASE_URL}/report/count`);
    if (!response.ok) {
      throw new Error("Error couting reports");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to count reports:", error);
    throw error;
  }
}

export async function countReportsByCreatedDate() {
  try {
    const response = await fetch(`${BASE_URL}/report/count-by-created-date`);
    if (!response.ok) {
      throw new Error("Error couting reports");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to count reports:", error);
    throw error;
  }
}
