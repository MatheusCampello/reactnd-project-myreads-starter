import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

const ListPage = ({ booksList, onChangeShelf }) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        <BookShelf onChangeShelf={onChangeShelf} bookList={booksList.filter((book) => book.shelf === "currentlyReading")} title='Currently Reading'/>
        <BookShelf onChangeShelf={onChangeShelf} bookList={booksList.filter((book) => book.shelf === "wantToRead")} title='Want to Read'/>
        <BookShelf onChangeShelf={onChangeShelf} bookList={booksList.filter((book) => book.shelf === "read")} title='Read'/>
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
  onChangeShelf: PropTypes.func.isRequired,
};

export default ListPage;
