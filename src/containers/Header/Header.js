import React from "react";
import Title from "../../components/Title";
import SearchBar from "../../components/SearchBar";
import "./Header.scss";

const Header = () => {
  return (
    <div>
      <Title />
      <SearchBar />
    </div>
  );
};

export default React.memo(Header);
