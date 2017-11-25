import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SearchPage extends Component {
  constructor(props) {
    super(props);
  }

  updateQuery = (event) => {
    const query = event;
    if(query.length >= 2){
      this.props.updateSearch(query);
    }
  }

  render() {
    console.log(this.props.searchList);
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">

            <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.searchList && this.props.searchList.map(book => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select>
                        <option value="select" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  {book.authors && book.authors.map(author => (
                      <div key={author} className="book-authors">{author}</div>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}


SearchPage.propTypes = {
  bookList: PropTypes.array.isRequired,
  searchList: PropTypes.array,
  updateSearch: PropTypes.func.isRequired,
}

export default SearchPage;
