import Creator from "imports/creator/pages/Creator";
import React from "react";

const page = ({ params }) => {
  return <Creator params={params?.creatorId} />;
};

export default page;
