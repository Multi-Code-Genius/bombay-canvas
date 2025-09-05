import VideoPage from "imports/video/pages/VideoPage";
import React from "react";

const page = ({ params }) => {
  return <VideoPage videoId={params?.videoId} />;
};

export default page;
