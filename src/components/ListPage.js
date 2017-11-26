import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

const ListPage = ({ booksList, changeShelf }) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        <BookShelf changeShelf={changeShelf} bookList={booksList.filter((book) => book.shelf === "currentlyReading")} title='Currently Reading'/>
        <BookShelf changeShelf={changeShelf} bookList={booksList.filter((book) => book.shelf === "wantToRead")} title='Want to Read'/>
        <BookShelf changeShelf={changeShelf} bookList={booksList.filter((book) => book.shelf === "read")} title='Read'/>
      </div>
    </div>
    <div className="open-search">
      <Link
        to="/search"
        className="open-search"
      />
    </div>
  </div>
);

ListPage.propTypes = {
  booksList: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default ListPage;
