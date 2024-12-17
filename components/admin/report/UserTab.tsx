"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Link from "next/link";
import PaginationUI from "@/components/shared/Pagination";
import { PaginationProps } from "@/types/pagination";
import MyButton from "@/components/shared/MyButton";
import Table from "@/components/shared/Table";
import { fetchReport } from "@/lib/services/report.service";
import { ReportResponseDTO } from "@/dtos/ReportDTO";

type UserTable = {
  postedUser: string;
  createdDate: Date; // Kiểu Date để chứa ngày kết thúc
  content: string; // Mảng của kiểu Time chứa thông tin về các thời gian
  reportId: number; // Có thể là trạng thái hoạt động, ví dụ: 1 = Active, 2 = Inactive
  status: number; // Có thể là trạng thái hoạt động, ví dụ: 1 = Active, 2 = Inactive
};

const columns = [
  {
    header: "Created User",
    accessor: "createdById.id",
    className: " text-lg font-md",
  },
  {
    header: "User ID",
    accessor: "reportId",
    className: "hidden md:table-cell text-lg font-md",
  },
  {
    header: "Fullname",
    accessor: "name",
    className: " text-lg font-md",
  },
  {
    header: "Created Date",
    accessor: "createdDate",
    className: " text-lg font-md",
  },

  {
    header: "Report Content",
    accessor: "content",
    className: " text-lg font-md",
  },
  { header: "Status", accessor: "status", className: " text-lg font-md" },
];

const UserTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [isReportUser, setIsReportUser] = useState<ReportResponseDTO[]>([]);

  useEffect(() => {
    const fetchReportUser = async () => {
      try {
        const data = await fetchReport();

        // Lọc những báo cáo có entityType là 'user' (so với chữ thường)
        const filteredReports = data.filter(
          (report) => report.entityType.toLowerCase() === "user"
        );

        setIsReportUser(filteredReports);
      } catch (error) {
        console.error("Error fetching report user", error);
      }
    };

    fetchReportUser();
  }, []); // Bỏ `isReportUser` khỏi dependency array

  const [sortConfig, setSortConfig] = useState<{
    key: SortableKeys;
    direction: "ascending" | "descending";
  }>({
    key: "reportId",
    direction: "ascending",
  });
  type SortableKeys = "name" | "reportId" | "createdDate" | "status";

  const getValueByKey = (item: (typeof isReportUser)[0], key: SortableKeys) => {
    switch (key) {
      case "name":
        return `${item.createdById.firstName} ${item.createdById.lastName} `;
      case "reportId":
        return item.createdById.id;
      case "createdDate":
        return item.createdAt;
      case "status":
        return item.status;
      default:
        return "";
    }
  };

  const sorted = [...isReportUser].sort((a, b) => {
    const aValue = getValueByKey(a, sortConfig.key);
    const bValue = getValueByKey(b, sortConfig.key);

    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: SortableKeys) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filterData = isReportUser.filter((item) => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    // Kiểm tra tồn tại và lọc theo searchQuery
    const matchesSearch =
      item.title?.toLowerCase().includes(lowerCaseQuery) ||
      false || // Kiểm tra tồn tại của item.title
      item.content?.toLowerCase().includes(lowerCaseQuery) ||
      false || // Kiểm tra tồn tại của item.content
      (item.createdAt &&
        format(new Date(item.createdAt), "dd/MM/yyyy")
          .toLowerCase()
          .includes(lowerCaseQuery)); // Kiểm tra tồn tại và định dạng createdAt

    // Lọc theo giá trị bộ lọc được chọn
    const matchesFilter =
      (filterOption === "pending" && item.status === 0) ||
      (filterOption === "confirm" && item.status === 1) ||
      (filterOption === "reject" && item.status === 2) ||
      !filterOption; // Không có bộ lọc nào được chọn thì hiển thị tất cả

    return matchesSearch && matchesFilter;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filterData.slice(startIndex, endIndex);
  const [isMounted, setIsMounted] = useState(false);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginationUI: PaginationProps = {
    currentPage,
    setCurrentPage,
    indexOfLastItem,
    indexOfFirstItem,
    totalPages: Math.ceil(filterData.length / itemsPerPage),
    dataLength: filterData.length,
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const renderRow = (item: ReportResponseDTO) => (
    <tr
      key={item._id}
      className="text-dark100_light500  mb-4 mt-3 border-t border-gray-300  text-sm "
    >
      <td className="px-4 py-2" key={item._id}>
        <Link href={`/report/${item._id}`}>
          <h3 className="text-base">{`${item.createdById.firstName} ${item.createdById.lastName}`}</h3>
          <p className="text-base text-gray-500">#00{item.createdById.id}</p>
        </Link>
      </td>

      <td className="hidden px-4 py-2 lg:table-cell" key={item._id}>
        <p className="text-base ">{item.reportedId.id}</p>
      </td>

      <td className="px-4 py-2" key={item._id}>
        <div>
          <h3 className="text-base">{`${item.reportedId.firstName} ${item.reportedId.lastName}`}</h3>
          {/* <p className="text-base text-gray-500">#00{item.reportedId.id}</p> */}
        </div>
      </td>

      <td className="hidden px-4 py-2 lg:table-cell" key={item._id}>
        <p className="text-base ">
          <div className="flex w-full flex-col ">
            <p>{format(item.createdAt, "PPP")}</p>
            <p className="pt-1 text-xs text-gray-500">
              {new Date(item.createdAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
        </p>
      </td>

      <td className="hidden px-4 py-2 lg:table-cell" key={item._id}>
        <p className="text-base ">{item.content}</p>
      </td>

      <td className="hidden px-4 py-2 lg:table-cell" key={item.status}>
        <p className="text-base text-gray-500">
          {item.status === 0 ? (
            <MyButton
              title="Pending"
              backgroundColor="bg-light-yellow"
              color="text-yellow-600"
              fontWeight="font-medium"
              fontSize="text-[12px]"
              height="h-[30px]"
              width="w-[143px]"
            />
          ) : item.status === 1 ? (
            <MyButton
              title="Confirmed"
              backgroundColor="bg-custom-green"
              color="text-green-500"
              fontWeight="font-medium"
              fontSize="text-[12px]"
              height="h-[30px]"
              width="w-[143px]"
            />
          ) : (
            <MyButton
              title="Rejected"
              backgroundColor="bg-light-red"
              color="text-red-500"
              fontWeight="font-medium"
              fontSize="text-[12px]"
              height="h-[30px]"
              width="w-[143px]"
            />
          )}
        </p>
      </td>
    </tr>
  );
  return (
    <div className="w-full">
      <div className="w-full px-4">
        <Table
          columns={columns}
          renderRow={renderRow}
          data={sorted} // Pass sorted data to the table
          onSort={(key: string) => requestSort(key as SortableKeys)} // Sorting function
        />
      </div>

      <div className="mt-4 flex items-center justify-center p-4 text-sm text-gray-500 md:justify-between">
        <PaginationUI paginationUI={paginationUI} />
      </div>
    </div>
  );
};

export default UserTab;
