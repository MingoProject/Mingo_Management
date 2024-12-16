"use client";
import { useEffect, useState } from "react";
import { PostData } from "@/components/shared/data";
import { format } from "date-fns";
import Link from "next/link";
import PaginationUI from "@/components/shared/Pagination";
import { PaginationProps } from "@/types/pagination";
import MyButton from "@/components/shared/MyButton";
import Table from "@/components/shared/Table";
import { getManagementListChat } from "@/lib/services/message.service";
import { ManagementMessageBoxDTO } from "@/dtos/MessageDTO";
import Image from "next/image";

type UserTable = {
  boxId: string;
  createdDate: Date; // Kiểu Date để chứa ngày kết thúc
  content: string; // Mảng của kiểu Time chứa thông tin về các thời gian
  member: number; // Có thể là trạng thái hoạt động, ví dụ: 1 = Active, 2 = Inactive
  type: number; // Có thể là trạng thái hoạt động, ví dụ: 1 = Active, 2 = Inactive
};

const columns = [
  {
    header: "Box ID",
    accessor: "boxId",
    className: " text-lg font-md",
  },
  {
    header: "Members",
    accessor: "member",
    className: "hidden md:table-cell text-lg font-md",
  },
  {
    header: "Created Date",
    accessor: "createdDate",
    className: " text-lg font-md",
  },
];

const MessageTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const [isReportUser, setIsReportUser] = useState<any[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Lấy dữ liệu bài viết
        const posts = await getManagementListChat();
        setIsReportUser(posts); // Cập nhật state
      } catch (error) {
        console.error("Error fetching report user", error);
      }
    };

    fetchPost();
  }, []); // Bỏ `isReportUser` khỏi dependency array

  const [sortConfig, setSortConfig] = useState<{
    key: SortableKeys;
    direction: "ascending" | "descending";
  }>({
    key: "member",
    direction: "ascending",
  });
  type SortableKeys = "boxId" | "member" | "createdDate";

  const getValueByKey = (item: (typeof isReportUser)[0], key: SortableKeys) => {
    switch (key) {
      case "boxId":
        return item.boxId;
      case "member":
        return item.member;
      case "createdDate":
        return item.createdDate;
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

  const filterData = sorted.filter((item) => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    // Kiểm tra và lọc theo searchQuery
    const matchesSearch =
      (item._id && item._id.toLowerCase().includes(lowerCaseQuery)) ||
      (item.createdDate &&
        format(item.createdDate, "dd/MM/yyyy")
          .toLowerCase()
          .includes(lowerCaseQuery));

    // Lọc theo giá trị bộ lọc được chọn

    return matchesSearch;
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

  const renderRow = (item: ManagementMessageBoxDTO) => (
    <tr
      key={item._id}
      className="text-dark100_light500  my-4 border-t border-gray-300  text-sm "
    >
      <td className="px-4 py-2" key={item._id}>
        <Link href={`/post/message/${item._id}`}>
          <h3 className="text-base">{item._id}</h3>
        </Link>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell" key={item._id}>
        {item.receiverIds.map((it) => (
          <div className="flex gap-2 items-center">
            <Link key={it.id} href={`/user/${it.id}`}>
              <Image
                src={it.avatar ? it.avatar : "/assets/images/default-user.png"}
                height={20}
                width={20}
                alt="user avatar"
                className="h-auto w-full object-cover rounded-full"
              />
            </Link>
            <p>{it.fullname}</p>
          </div>
        ))}
      </td>

      <td className="hidden px-4 py-2 lg:table-cell" key={item._id}>
        <p className="text-base ">
          <div className="flex w-full flex-col ">
            <p>{format(item.createAt, "PPP")}</p>
            <p className="pt-1 text-xs text-gray-500">
              {new Date(item.createAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
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
          data={currentData} // Pass sorted data to the table
          onSort={(key: string) => requestSort(key as SortableKeys)} // Sorting function
        />
      </div>

      <div className="dark:text-dark-360 mt-4 flex items-center justify-center p-4 text-sm text-gray-500 md:justify-between">
        <PaginationUI paginationUI={paginationUI} />
      </div>
    </div>
  );
};

export default MessageTab;
