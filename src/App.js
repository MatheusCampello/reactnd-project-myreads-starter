import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom';
import BookList from './BookList';
import SearchPage from './SearchPage';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      booksList: [],
      searchList: [],
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        booksList: books
      });
    });
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(result => {
      this.setState({
        booksList: this.state.booksList.map(b => b.id === book.id ? Object.assign({}, b, {shelf: shelf}) : b)
      });
    });
  }

  updateSearch = (query) => {
    let searchList = []
    BooksAPI.search(query, 20).then(res => {
      if(res.error) {
        searchList = [];
      } else {
        searchList = res
      }
      this.setState({
        searchList
      });
    });
  }

  updateBooks = (book, shelf) => {
    BooksAPI.update(book, shelf).then(result => {
        let booksList = this.state.booksList;
        const found = booksList.some(b => {
          return book.id === b.id
        });
        if (!found) {
          // Add the new book if he is not there
          booksList.push(Object.assign({}, book, {shelf: shelf}));
        } else {
          // Change shelf of existing book
          booksList = booksList.map(b => b.id === book.id ? Object.assign({}, b, {shelf: shelf}) : b);
        }
        this.setState({ booksList });
    })
  }

  render() {
    const { booksList, searchList } = this.state;
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookList changeShelf={this.changeShelf} bookList={booksList.filter((book) => book.shelf === "currentlyReading")} title='Currently Reading'/>
                  <BookList changeShelf={this.changeShelf} bookList={booksList.filter((book) => book.shelf === "wantToRead")} title='Want to Read'/>
                  <BookList changeShelf={this.changeShelf} bookList={booksList.filter((book) => book.shelf === "read")} title='Read'/>
                </div>
              </div>
              <div className="open-search">
                <Link
                  to="/search"
                  className="open-search"
                />
              </div>
            </div>
        )}/>
        <Route path="/search" render={({ history }) => (
          <SearchPage bookList={booksList} searchList={searchList} updateSearch={this.updateSearch} updateBooks={this.updateBooks}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
