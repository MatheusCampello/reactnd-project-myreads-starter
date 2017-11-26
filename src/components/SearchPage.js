import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book'

class SearchPage extends Component {

  updateQuery = (event) => {
    const query = event;
    if(query.length >= 2){
      this.props.updateSearch(query);
    }
  }

  render() {
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
                <Book
                  book={book}
                  changeShelf={this.props.updateBooks}
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
  updateSearch: PropTypes.func.isRequired,
  updateBooks: PropTypes.func.isRequired,
}

export default SearchPage;
