import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Debounce } from 'react-throttle';
import PropTypes from 'prop-types';
import Book from './Book'

class SearchPage extends Component {

  updateQuery = (event) => {
    const query = event;
    if(query.length >= 2){
      this.props.onUpdateSearch(query);
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="100" handler="onChange">
              <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateQuery(event.target.value)}/>
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.searchList && this.props.searchList.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  onChangeShelf={this.props.onUpdateBooks}
                  shelf={
                    this.props.bookList.some(b => {return b.id === book.id}) ? this.props.bookList.find(b => {return b.id === book.id}).shelf : 'select'
                  }
                />
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
  onUpdateSearch: PropTypes.func.isRequired,
  onUpdateBooks: PropTypes.func.isRequired,
}

export default SearchPage;
