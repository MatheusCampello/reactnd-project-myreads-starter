import React from 'react';
import PropTypes from 'prop-types';

const BookList = ({ bookList, title, changeShelf }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {bookList.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select onChange={(event) => changeShelf(book, event.target.value)} value="select">
                    <option value="select" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors[0]}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </div>
);

BookList.propTypes = {
  bookList: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default BookList;
