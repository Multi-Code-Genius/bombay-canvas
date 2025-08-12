"use client";

import { Fragment } from "react";
import GlobalStyles from "/styles/GlobalStyles";
import "/styles/font.css";
import { QueryClientProvider } from "@tanstack/react-query";
import query from "config/query";

const ProviderLayout = ({ children }) => {
  return (
    <Fragment>
      <QueryClientProvider client={query}>
        <GlobalStyles />
        {children}
      </QueryClientProvider>
    </Fragment>
  );
};

export default ProviderLayout;
