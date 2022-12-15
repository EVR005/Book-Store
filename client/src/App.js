import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import CreateBook from "./components/CreateBook";
import UpdateBookInfo from "./components/UpdateBookInfo";
import ShowBookDetails from "./components/ShowBookDetails";
import ShowBookList from "./components/ShowBookList";
import ViewStats from "./components/ViewStats";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<ShowBookList />} />
            <Route path="/create-book" element={<CreateBook />} />
            <Route path="/edit-book/:id" element={<UpdateBookInfo />} />
            <Route path="/show-book/:id" element={<ShowBookDetails />} />
            <Route path="/view-stats" element={<ViewStats />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
