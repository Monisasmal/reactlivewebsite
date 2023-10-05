import React from "react";

const Navbar = ({ filterItems, menuLists }) => {
  return (
    <>
      <nav className="navbar">
        <div className="btn-group">
          {menuLists.map((curElem) => {
            return (
              <button
                className="btn-group__item"
                onClick={() => filterItems(curElem)}>
              
                {curElem}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
