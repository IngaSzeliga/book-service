import React, { PureComponent } from "react";
import axios from "axios";
import SearchBar from "../../components/SearchBar";
import NavBar from "../NavBar";
import AuthorsContainer from "../AuthorsContainer";
import BooksContainer from "../BooksContainer";
import { numberOfItemPerPage, mockTotal } from "../../config/constants";
import PaginationBar from "../../components/PaginationBar";
import ErrorPage from "../../components/ErrorPage";
import "./App.scss";

class App extends PureComponent {
  state = { displayComponent: "authors", data: [], total: 0, isError: false };

  componentDidMount() {
    const { displayComponent } = this.state;
    axios(`api/${displayComponent}?limit=${numberOfItemPerPage}`)
      .then(result => {
        const { data } = result;
        this.setState({ data, total: mockTotal, isError: false });
      })
      .catch(error => {
        this.setState({ isError: true });
      });
  }

  handleDisplayComponent = component => {
    this.setState({ displayComponent: component });

    axios(`api/${component}?limit=${numberOfItemPerPage}`)
      .then(result => {
        const { data } = result;
        this.setState({ data, total: mockTotal, isError: false });
      })
      .catch(error => {
        this.setState({ isError: true });
      });
  };

  handleSearch = searchValue => {
    const { displayComponent } = this.state;
    axios(
      `api/${displayComponent}?limit=${numberOfItemPerPage}&match=${searchValue}`
    )
      .then(result => {
        const { data } = result;

        this.setState({ data, total: data.length, isError: false });
      })
      .catch(error => {
        this.setState({ isError: true });
      });
  };

  changePage = offset => {
    const { displayComponent } = this.state;
    axios(
      `api/${displayComponent}?offset=${offset}&limit=${numberOfItemPerPage}`
    ).then(result => {
      const { data } = result;
      this.setState({ data, total: mockTotal });
    });
  };

  render() {
    const { displayComponent, data, total, isError } = this.state;
    return (
      <div className="App">
        <NavBar />
        <SearchBar
          handleDisplayComponent={this.handleDisplayComponent}
          handleSearch={this.handleSearch}
        />
        {displayComponent === "authors" ? (
          <AuthorsContainer authors={data} />
        ) : (
          <BooksContainer books={data} />
        )}
        {isError ? (
          <ErrorPage />
        ) : (
          <PaginationBar changePage={this.changePage} total={total} />
        )}
      </div>
    );
  }
}

export default App;
