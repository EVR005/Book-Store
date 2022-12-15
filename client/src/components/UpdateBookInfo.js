import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function UpdateBookInfo(props) {
  const [title_0, setTitle] = useState("");
  const [isbn_0, setIsbn] = useState("");
  const [author_0, setAuthor] = useState("");
  const [description_0, setDescription] = useState("");
  const [published_date_0, setPublished_date] = useState("");
  const [publisher_0, setPublisher] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get("http://localhost:8082/api/books/" + id)
      .then((res) => {
        // this.setState({...this.state, book: res.data})
        setTitle(res.data.title);
        setIsbn(res.data.isbn);
        setAuthor(res.data.author);
        setDescription(res.data.description);
        setPublished_date(res.data.published_date);
        setPublisher(res.data.publisher);
      })
      .catch((err) => {
        console.log("Error from UpdateBookInfo");
      });
  }, []);

  function onChangeTitle(e) {
    setTitle(e.target.value);
  }

  function onChangeIsbn(e) {
    setIsbn(e.target.value);
  }

  function onChangeAuthor(e) {
    setAuthor(e.target.value);
  }

  function onChangeDescription(e) {
    setDescription(e.target.value);
  }

  function onChangePublished_date(e) {
    setPublished_date(e.target.value);
  }

  function onChangePublisher(e) {
    setPublisher(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    const data = {
      title: title_0,
      isbn: isbn_0,
      author: author_0,
      description: description_0,
      published_date: published_date_0,
      publisher: publisher_0,
    };

    axios
      .put("http://localhost:8082/api/books/" + id, data)
      .then((res) => {
        navigate("/show-book/" + id);
      })
      .catch((err) => {
        console.log("Error in UpdateBookInfo!");
      });
  }

  return (
    <div className="UpdateBookInfo">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
              Show BooK List
            </Link>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Edit Book</h1>
            <p className="lead text-center">Update Book's Info</p>
          </div>
        </div>

        <div className="col-md-8 m-auto">
          <form noValidate onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Title of the Book"
                name="title"
                className="form-control"
                value={title_0}
                onChange={onChangeTitle}
              />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                placeholder="ISBN"
                name="isbn"
                className="form-control"
                value={isbn_0}
                onChange={onChangeIsbn}
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                placeholder="Author"
                name="author"
                className="form-control"
                value={author_0}
                onChange={onChangeAuthor}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                placeholder="Describe this book"
                name="description"
                className="form-control"
                value={description_0}
                onChange={onChangeDescription}
              />
            </div>

            <div className="form-group">
              <label htmlFor="published_date">Published Date</label>
              <input
                type="date"
                placeholder="published_date"
                name="published_date"
                className="form-control"
                value={published_date_0}
                onChange={onChangePublished_date}
              />
            </div>
            <div className="form-group">
              <label htmlFor="publisher">Publisher</label>
              <input
                type="text"
                placeholder="Publisher of this Book"
                name="publisher"
                className="form-control"
                value={publisher_0}
                onChange={onChangePublisher}
              />
            </div>

            <button
              type="submit"
              className="btn btn-outline-info btn-lg btn-block"
            >
              Update Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateBookInfo;
