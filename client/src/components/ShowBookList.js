import React, { useEffect } from "react";
import "../App.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import BookCard from "./BookCard";

const ShowBookList = (props) => {
  const [books, setBooks] = useState([]);
  const [textvalue, setTextValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/books")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log("Error from ShowBookList");
      });
  }, []);

  const setSearchQuery = (event) => {
    setTextValue(event.target.value);
    if (event.target.value === "") {
      axios
        .get("http://localhost:8082/api/books")
        .then((res) => {
          setBooks(res.data);
        })
        .catch((err) => {
          console.log("Error from ShowBookList");
        });
    }
  };

  // const setRangeQuery = (event) => {
  //   setTextValue(event.target.value);
  //   if (event.target.value === "") {
  //     axios
  //       .put("http://localhost:8082/api/books"+data)
  //       .then((res) => {
  //         setBooks(res.data);
  //       })
  //       .catch((err) => {
  //         console.log("Error from ShowBookList");
  //       });
  //   }
  // };

  const sendChoice = (event) => {
    axios
      .get(`http://localhost:8082/api/books/${textvalue}/${event.value}`)
      .then((res) => {
        setBooks(res.data);
        console.log(res.data);
        console.log(event.value + " : " + textvalue);
      })
      .catch((err) => {
        console.log("Error from ShowBookList");
      });
  };

  console.log("PrintBook: " + books);
  let bookList;

  if (books.length === 0) {
    bookList = "There is no such book record!";
  } else {
    bookList = books.map((book, k) => <BookCard book={book} key={k} />);
  }

  const options = [
    { value: "publisher", label: "Search by Publisher" },
    { value: "author", label: "Search By Author" },
    { value: "published_date", label: "Published After" },
    { value: "title", label: "Search by Title" },
    { value: "bookid", label: "Search by Book ID" },
  ];

  return (
    <div className="ShowBookList">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h2 className="display-4 text-center">Books List</h2>
            <br />
          </div>
          <div className="col-md-12">
            <form action="#">
              <div className="row form-group">
                <div className="col-md-3">
                  <input
                    className="form-control input-sm"
                    type="text"
                    name="query"
                    id="input"
                    onChange={setSearchQuery}
                  ></input>
                </div>
                {/* not existing */}
                {/* <div>
                  <input
                    className="form-control input-sm"
                    type="text"
                    name="range-query"
                    id="range"
                    onChange={setRangeQuery}
                  ></input>
                </div> */}
                {/* not existing */}
                <div className="col-md-3">
                  <Select
                    options={options}
                    id="choices"
                    name="choices"
                    onChange={sendChoice}
                    styles={{
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? "#E4A11B" : "white",
                        color: state.isFocused ? "white" : "black",
                      }),
                    }}
                  />
                </div>

                <div className="col-md-3">
                  <Link
                    to="/view-stats"
                    className="btn btn-outline-warning float-left"
                  >
                    View Stats
                  </Link>
                  <Link
                    to="/create-book"
                    className="btn btn-outline-warning float-right"
                  >
                    + Add New Book
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <br />
        <div className="list flex-wrap pb-4">{bookList}</div>
      </div>
    </div>
  );
};

export default ShowBookList;
