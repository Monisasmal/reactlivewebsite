import React, { useState } from "react";
import "./style.css";
import Menu from "./menuApi.js";
import MenuCard from "./MenuCard";
import Navbar from "./Navbar";

const uniqueList = [
  ...new Set(
    Menu.map((curElem) => {
      return curElem.category;
    })
  ),
  "All",
];

const Restaurant = () => {
  const [menuData, setMenuData] = useState(Menu);
  const [menuList, setMenuList] = useState(uniqueList)
  const filterItem = (category) => {
    if( category === "All"){
      setMenuData(Menu);
      return;
    }
    const UpdatedList = Menu.filter((curElem) => {
      return curElem.category === category;
    });
    setMenuData(UpdatedList);
  };
  return (
    <>
      < Navbar  filterItems ={filterItem} menuLists = {menuList}/>
      <MenuCard menuDatas={menuData} />
    </>
  );
};

export default Restaurant;
