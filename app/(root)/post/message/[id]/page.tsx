"use client";
import { useEffect, useState } from "react";
import { PostData } from "@/components/shared/data";
import { format } from "date-fns";
import Link from "next/link";
import PaginationUI from "@/components/shared/Pagination";
import { PaginationProps } from "@/types/pagination";
import MyButton from "@/components/shared/MyButton";
import Table from "@/components/shared/Table";
import { getAllChat } from "@/lib/services/message.service";
import { useParams } from "next/navigation";
import { ResponseMessageDTO } from "@/dtos/MessageDTO";
import HeaderNoButton from "@/components/header/HeaderNoButton";
import TableSearch from "@/components/shared/TableSearch";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "@radix-ui/react-menubar";
import { Icon } from "@iconify/react/dist/iconify.js";
import HeaderWithButton from "@/components/header/HeaderWithButton";

const columns = [
  {
    header: "Sender User",
    accessor: "postedUser",
    className: " text-lg font-md",
  },
  {
    header: "Message ID",
    accessor: "postId",
    className: "hidden md:table-cell text-lg font-md",
  },
  { header: "Content", accessor: "content", className: " text-lg font-md" },
  {
    header: "Created Date",
    accessor: "createdDate",
    className: " text-lg font-md",
  },
  {
    header: "Content Type",
    accessor: "type",
    className: "hidden lg:table-cell text-lg font-md",
  },
];

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const [isReportUser, setIsReportUser] = useState<any[]>([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchChat = async () => {
      try {
        // Lấy dữ liệu bài viết
        const posts = await getAllChat(id.toString());
        console.log(posts);
        setIsReportUser(posts); // Cập nhật state
      } catch (error) {
        console.error("Error fetching report user", error);
      }
    };

    fetchChat();
  }, []); // Bỏ `isReportUser` khỏi dependency array

  const [sortConfig, setSortConfig] = useState<{
    key: SortableKeys;
    direction: "ascending" | "descending";
  }>({
    key: "postId",
    direction: "ascending",
  });
  type SortableKeys = "postedUser" | "postId" | "createdDate";

  const getValueByKey = (item: (typeof isReportUser)[0], key: SortableKeys) => {
    switch (key) {
      case "postedUser":
        return item.createBy;
      case "postId":
        return item.text;
      case "createdDate":
        return item.createAt;

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

    // Kiểm tra an toàn các thuộc tính và chỉ gọi toLowerCase khi các thuộc tính không phải là null hoặc undefined
    const matchesSearch =
      (item.id && item.id.toString().toLowerCase().includes(lowerCaseQuery)) ||
      (item.text && item.text.toLowerCase().includes(lowerCaseQuery)) ||
      (item.boxId &&
        item.boxId.toString().toLowerCase().includes(lowerCaseQuery)) ||
      (item.createAt &&
        format(item.createAt, "dd/MM/yyyy")
          .toLowerCase()
          .includes(lowerCaseQuery));

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

  const formatUrl = (url: any) => {
    try {
      const parsedUrl = new URL(url);
      const domain = parsedUrl.hostname; // Lấy tên miền
      return domain.length > 20 ? domain.slice(0, 20) + "..." : domain; // Rút ngắn nếu quá dài
    } catch (e) {
      return url; // Trả về URL gốc nếu không hợp lệ
    }
  };

  const renderRow = (item: ResponseMessageDTO) => (
    <tr
      key={item.boxId}
      className="text-dark100_light500  my-4 border-t border-gray-300  text-sm "
    >
      <td className="px-4 py-2" key={item.boxId}>
        <Link href={`/post/${item.boxId}`}>
          <h3 className="text-base">{item.createBy}</h3>
        </Link>
      </td>
      <td className="px-4 py-2" key={item.boxId}>
        <h3 className="text-base">{item.id}</h3>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell" key={item.boxId}>
        <p className="text-base">
          {item.text ? (
            item.text
          ) : (
            <a
              href={item.contentId?.url ? item.contentId.url : "undefined"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {formatUrl(
                item.contentId?.url ? item.contentId.url : "undefined"
              )}
            </a>
          )}
        </p>
      </td>

      <td className="hidden px-4 py-2 lg:table-cell" key={item.boxId}>
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
      <td className="hidden px-4 py-2 lg:table-cell" key={item.boxId}>
        <p className="text-base text-gray-500">
          {item.contentId ? (
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
              title="Text"
              backgroundColor="bg-light-yellow"
              color="text-yellow-500"
              fontWeight="font-medium"
              fontSize="text-[14px]"
              height="h-[30px]"
              width="w-[97px]"
            />
          )}
        </p>
      </td>
    </tr>
  );
  return (
    <div className="background-light700_dark400 flex size-full flex-col p-4">
      <HeaderWithButton title="Post Detail" type={0} />

      <div className="text-dark100_light500 mt-0 flex w-full flex-col items-center justify-between gap-4 rounded-md md:flex-row">
        <TableSearch onSearch={setSearchQuery} />
        <div className="flex items-center justify-between gap-4 p-4">
          <Menubar className="relative border-none bg-transparent p-4 shadow-none">
            <MenubarMenu>
              <MenubarTrigger className="flex items-center gap-2">
                <div className=" text-dark100_light500 flex h-[35px] items-center gap-1 rounded-lg border-2 px-4 py-2 text-sm shadow-md transition-opacity duration-300 hover:opacity-75">
                  <Icon
                    icon="tabler:adjustments-horizontal"
                    width={14}
                    height={14}
                    className="text-dark100_light500"
                  />
                  <p className="text-dark100_light500">Filter</p>
                </div>
              </MenubarTrigger>
              <MenubarContent className="text-dark100_light500 absolute -right-12 top-full z-50 mt-3 h-auto w-40 bg-gray-50 font-sans text-sm shadow-md">
                <MenubarItem
                  className="flex w-full cursor-pointer items-center justify-start px-2 text-center hover:bg-primary-100 hover:text-white"
                  onSelect={() => setFilterOption("image")}
                >
                  <p className="p-1 pb-2">Image</p>
                </MenubarItem>
                <MenubarItem
                  className="flex w-full cursor-pointer items-center justify-start px-2 text-center hover:bg-primary-100 hover:text-white"
                  onSelect={() => setFilterOption("video")}
                >
                  <p className="p-1 pb-2">Video</p>
                </MenubarItem>
                <MenubarItem
                  className="flex w-full cursor-pointer items-center justify-start px-2 text-center hover:bg-primary-100 hover:text-white"
                  onSelect={() => setFilterOption("status")}
                >
                  <p className="p-1 pb-2">Status</p>
                </MenubarItem>
                <MenubarItem
                  className="flex w-full cursor-pointer items-center justify-start px-2 text-center hover:bg-primary-100 hover:text-white"
                  onSelect={() => setFilterOption("post")}
                >
                  <p className="p-1 pb-2">Post</p>
                </MenubarItem>
                <MenubarSeparator />
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>

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
    </div>
  );
};

export default Page;
