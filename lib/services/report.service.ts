import { ReportResponseDTO } from "@/dtos/ReportDTO";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// export async function fetchReport() {
//   console.log(`${BASE_URL}/report/get-all-report`, "get report url");
//   try {
//     const response = await fetch(`${BASE_URL}/report/get-all-report`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (!response.ok) {
//       throw new Error("Error fetching report");
//     }
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.error("Failed to fetch posts:", error);
//     throw error;
//   }
// }

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
