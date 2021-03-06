import React from 'react';
import PropTypes from 'prop-types';

const ListPage = ({ book, onChangeShelf, shelf }) => (
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
      <div className="book-shelf-changer">
        <select onChange={(event) => onChangeShelf(book, event.target.value)} value={shelf}>
          <option value="select" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{book.title}</div>
    <div className="book-authors">
      {book.authors && book.authors.map(author => (
          <div key={author} className="book-authors">{author}</div>
      ))}
    </div>
  </div>
);

ListPage.propTypes = {
  book: PropTypes.object.isRequired,
  shelf: PropTypes.string.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};

export default ListPage;
