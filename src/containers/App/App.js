import React from "react";
import Header from "../../containers/Header";
import NavBar from "../../components/NavBar";
import AuthorsContainer from "../AuthorsContainer/AuthorsContainer";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Header />
      <AuthorsContainer />
    </div>
  );
}

export default App;
