import React from "react";

const VideoList = ({ videosData }: any) => {
  return (
    <div className="mt-8 flex flex-wrap gap-2 px-3">
      {videosData.map((video: any) => (
        <div key={video._id} className="h-64">
          <video width={300} height={300} controls>
            <source src={video?.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
