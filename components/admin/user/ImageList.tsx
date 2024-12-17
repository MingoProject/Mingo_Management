import { getMediaByMediaId } from "@/lib/services/media.service";
import Image from "next/image";
import React, { useState } from "react";
import DetailsImage from "./DetailsImage";

const ImageList = ({ imagesData, profileUser }: any) => {
  const [detailSelectedImage, setDetailSelectedImage] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const handleClick = async (image: any) => {
    try {
      const data = await getMediaByMediaId(image._id);
      setDetailSelectedImage(data);
      setOpenModal(true);
    } catch (error) {
      console.error("Error loading image details:", error);
    }
  };
  return (
    <div className="mt-8 flex flex-wrap gap-2 px-3">
      {imagesData.map((image: any) => (
        <div key={image._id}>
          <Image
            onClick={() => handleClick(image)}
            src={image.url}
            alt={`Image ${image._id}`}
            width={100}
            height={100}
            className="size-40 rounded-md object-cover"
          />
          {openModal && (
            <DetailsImage
              image={detailSelectedImage}
              onClose={() => setOpenModal(false)}
              profileUser={profileUser}
              //   me={me}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageList;
