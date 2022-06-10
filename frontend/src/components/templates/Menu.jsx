import React from "react";
import './Menu.css';
import MenuItens from "./MenuItens";


// eslint-disable-next-line import/no-anonymous-default-export
export default props =>
  <aside className="menu-area">
    <MenuItens {...props} />
  </aside>

