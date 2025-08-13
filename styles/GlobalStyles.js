import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`

html,
body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

  background: #181818;
  margin: 0;
  /* &::-webkit-scrollbar-thumb {
      background-color: #5651e5;
    }

  &::-webkit-scrollbar {
      background-color: white;
      color: #aca496;
      width: 3px;
    } */
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

.Slider {
/* margin-bottom: 31px; */
position: relative;
}



 .slick-prev:before, .slick-next:before {
  display: none;
 }

`;

export default GlobalStyles;
