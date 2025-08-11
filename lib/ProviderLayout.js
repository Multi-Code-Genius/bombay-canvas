"use client";

import { Fragment } from "react";
import GlobalStyles from "/styles/GlobalStyles";
import "/styles/font.css";

const ProviderLayout = ({ children }) => {
  return (
    <Fragment>
      <GlobalStyles />
      {children}
    </Fragment>
  );
};

export default ProviderLayout;
