import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import "./SearchBar.scss";

const SearchBar = () => {
  return (
    <div className="input-container">
      <form>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          label="Search"
          margin="normal"
          variant="outlined"
        />
      </form>
    </div>
  );
};

export default React.memo(SearchBar);
