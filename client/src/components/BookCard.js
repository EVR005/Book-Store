import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const BookCard = (props) => {
  const book = props.book;

  return (
    <div className="card bg-dark border border-warning rounded-top pb-3">
      <div className="desc text-warning">
        <h2>
          <Link to={`/show-book/${book._id}`}>
            <b>{book.title}</b>
          </Link>
        </h2>
        <h3>
          <b>{book.author}</b>
        </h3>
        <p>
          <b>{book.description}</b>
        </p>
      </div>
    </div>
  );
};

export default BookCard;
