import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`

html,
body {

  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

    background: rgb(236 240 243/1);
    margin: 0;
    &::-webkit-scrollbar-thumb {
      background-color: #5651e5;
    }

  &::-webkit-scrollbar {
      background-color: white;
      color: #aca496;
      width: 3px;
    }
  }

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}
`;

export default GlobalStyles;
