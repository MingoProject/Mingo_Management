import LabelValue from "@/components/header/LableValue";
import React from "react";

const OtherInformation = ({ item }: any) => {
  return (
    <div className="flex w-full flex-col py-2">
      <LabelValue
        label="Status"
        value={item?.status === false ? "Inactive" : "Active"}
        valueColor={item?.status === false ? "text-red-500" : "text-green-500"} // Màu cho giá trị
      />
      <LabelValue valueColor="font-normal" label="Job" value={item?.job} />
      <LabelValue valueColor="font-normal" label="Bio" value={item?.bio} />
      <LabelValue
        valueColor="font-normal"
        label="Hobbies"
        value={item?.hobbies.join(", ")}
      />
    </div>
  );
};

export default OtherInformation;
