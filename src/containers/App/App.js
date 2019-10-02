import React, { PureComponent } from "react";
import SearchBar from "../../components/SearchBar";
import NavBar from "../../components/NavBar";
import AuthorsContainer from "../AuthorsContainer";
import BooksContainer from "../BooksContainer";
import "./App.scss";

class App extends PureComponent {
  state = { displayComponent: "authors" };

  handleDisplayComponent = component => {
    this.setState({ displayComponent: component });
  };

  render() {
    const { displayComponent } = this.state;
    return (
      <div className="App">
        <NavBar />
        <SearchBar handleDisplayComponent={this.handleDisplayComponent} />
        {displayComponent === "authors" ? (
          <AuthorsContainer />
        ) : (
          <BooksContainer />
        )}
      </div>
    );
  }
}

export default App;
