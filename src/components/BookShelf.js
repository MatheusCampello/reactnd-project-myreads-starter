import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book'

const BookShelf = ({ bookList, title, onChangeShelf }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {bookList.map((book) => (
          <li key={book.id}>
            <Book book={book} onChangeShelf={onChangeShelf} shelf={book.shelf}/>
          </li>
        ))}
      </ol>
    </div>
  </div>
);

BookShelf.propTypes = {
  bookList: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};

export default BookShelf;
