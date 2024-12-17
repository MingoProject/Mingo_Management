"use client";
import { useEffect, useState } from "react";
import { PostData } from "@/components/shared/data";
import { format } from "date-fns";
import Link from "next/link";
import PaginationUI from "@/components/shared/Pagination";
import { PaginationProps } from "@/types/pagination";
import MyButton from "@/components/shared/MyButton";
import Table from "@/components/shared/Table";
import { ReportResponseDTO } from "@/dtos/ReportDTO";
import { fetchPosts, getAuthorByPostId } from "@/lib/services/post.service";

// type UserTable = {
//   postedUser: string;
//   createdDate: Date; // Kiểu Date để chứa ngày kết thúc
//   content: string; // Mảng của kiểu Time chứa thông tin về các thời gian
//   postId: number; // Có thể là trạng thái hoạt động, ví dụ: 1 = Active, 2 = Inactive
//   type: number; // Có thể là trạng thái hoạt động, ví dụ: 1 = Active, 2 = Inactive
// };

const columns = [
  {
    header: "Post User",
    accessor: "postedUser",
    className: " text-lg font-md",
  },
  {
    header: "PostId",
    accessor: "postId",
    className: "hidden md:table-cell text-lg font-md",
  },
  {
    header: "Type",
    accessor: "type",
    className: "hidden lg:table-cell text-lg font-md",
  },
  {
    header: "Created Date",
    accessor: "createdDate",
    className: " text-lg font-md",
  },
  { header: "Content", accessor: "content", className: " text-lg font-md" },
];

const PostTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const [isReportUser, setIsReportUser] = useState<any[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Lấy dữ liệu bài viết
        const posts = await fetchPosts();

        // Sử dụng Promise.all để lấy thông tin user cho từng bài viết
        const postUsers = await Promise.all(
          posts.map((post) => getAuthorByPostId(post._id))
        );

        // Định dạng lại dữ liệu
        const formatData = posts.map((post, index) => ({
          postedUser: `${postUsers[index].firstName} ${postUsers[index].lastName}`, // Thông tin user tương ứng với bài viết
          createdDate: new Date(post.createdAt), // Chuyển thành kiểu Date
          content: post.content, // Nội dung bài viết
          postId: post._id, // ID bài viết
          media: post.media, // Đính kèm (media) của bài viết
        }));

        setIsReportUser(formatData); // Cập nhật state
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
    key: "postId",
    direction: "ascending",
  });
  type SortableKeys = "postedUser" | "postId" | "createdDate" | "type";

  const getValueByKey = (item: (typeof isReportUser)[0], key: SortableKeys) => {
    switch (key) {
      case "postedUser":
        return item.postedUser;
      case "postId":
        return item.postId;
      case "createdDate":
        return item.createdDate;
      case "type":
        return item.type;
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

    // Lọc theo searchQuery với kiểm tra an toàn
    const matchesSearch =
      (item.postedUser &&
        item.postedUser.toLowerCase().includes(lowerCaseQuery)) ||
      (item.content && item.content.toLowerCase().includes(lowerCaseQuery)) ||
      (item.postId && item.postId.toLowerCase().includes(lowerCaseQuery)) ||
      (item.createdDate &&
        format(item.createdDate, "dd/MM/yyyy")
          .toLowerCase()
          .includes(lowerCaseQuery));

    // Lọc theo giá trị bộ lọc được chọn
    const matchesFilter =
      (filterOption === "status" && item.type === 0) ||
      (filterOption === "image" && item.type === 1) ||
      (filterOption === "video" && item.type === 2) ||
      (filterOption === "post" && item.type === 3) ||
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

  const renderRow = (item: any) => (
    <tr
      key={item.postId}
      className="text-dark100_light500 my-4 border-t border-gray-300 text-sm   "
    >
      <td className="px-4 py-2" key={item.postId}>
        <Link href={`/post/${item.postId}`}>
          <h3 className="text-base">{item.postedUser}</h3>
          <p className="text-base text-gray-500">#00{item.postId}</p>
        </Link>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell" key={item.postId}>
        <p className="text-base ">{item.postId}</p>
      </td>

      <td className="hidden px-4 py-2 lg:table-cell" key={item.postId}>
        <p className="text-base text-gray-500">
          {item.media.length > 0 ? (
            <MyButton
              title="Media"
              backgroundColor="bg-light-blue"
              color="text-blue-500"
              fontWeight="font-medium"
              fontSize="text-[14px]"
              height="h-[30px]"
              width="w-[97px]"
            />
          ) : (
            <MyButton
              title="Status"
              backgroundColor="bg-light-red"
              color="text-red-500"
              fontWeight="font-medium"
              fontSize="text-[14px]"
              height="h-[30px]"
              width="w-[97px]"
            />
          )}
        </p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell" key={item.postId}>
        <p className="text-base ">
          <div className="flex w-full flex-col ">
            <p>{format(item.createdDate, "PPP")}</p>
            <p className="pt-1 text-xs text-gray-500">
              {new Date(item.createdDate).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
        </p>
      </td>

      <td className="hidden px-4 py-2 lg:table-cell" key={item.postId}>
        <p className="text-base ">{item.content}</p>
      </td>
    </tr>
  );
  return (
    <div className="w-full">
      <div className="text-dark100_light500 w-full px-4">
        <Table
          columns={columns}
          renderRow={renderRow}
          data={currentData} // Pass sorted data to the table
          onSort={(key: string) => requestSort(key as SortableKeys)} // Sorting function
        />
      </div>

      <div className="text-dark100_light500 mt-4 flex items-center justify-center p-4 text-sm text-gray-500 md:justify-between">
        <PaginationUI paginationUI={paginationUI} />
      </div>
    </div>
  );
};

export default PostTab;
