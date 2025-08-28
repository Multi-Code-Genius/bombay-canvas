import AboutPage from "imports/about/pages/AboutPage";
import React from "react";

const page = ({ params }) => {
  return <AboutPage videoId={params?.videoId} />;
};

export default page;
