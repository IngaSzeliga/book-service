import React, { PureComponent } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import MenuItem from "@material-ui/core/MenuItem";
import "./SearchBar.scss";

class SearchBar extends PureComponent {
  state = {
    selectSearch: "authors"
  };

  handleChange = event => {
    this.setState({ selectSearch: event.target.value });
  };

  render() {
    const { selectSearch } = this.state;
    return (
      <div className="search-select-container">
        <form>
          <TextField
            className="search-select-component"
            select
            defaultValue="Authors"
            value={selectSearch}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          >
            <MenuItem value="authors">Authors</MenuItem>
            <MenuItem value="books">Books</MenuItem>
          </TextField>
          <TextField
            className="search-bar-component"
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
  }
}

export default SearchBar;
