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

 input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1); 
}




::-webkit-scrollbar {
  width: 8px;              
  height: 4px;            
}

::-webkit-scrollbar-track {

  background: #888;   
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #f1f1f1;    
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #e1e1e1;       
}


`;

export default GlobalStyles;
