import React from "react";
import Title from "../../components/Title";
import SearchBar from "../../components/SearchBar";
import Menu from "../Menu";
import "./Header.scss";

const Header = () => {
  return (
    <div>
      <Title />
      <SearchBar />
      <Menu />
    </div>
  );
};

export default React.memo(Header);
