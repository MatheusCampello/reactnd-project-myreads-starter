import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import ListPage from './components/ListPage';
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
        searchList = res;
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
          <ListPage changeShelf={this.changeShelf} booksList={booksList}/>
        )}/>
        <Route path="/search" render={({ history }) => (
          <SearchPage bookList={booksList} searchList={searchList} updateSearch={this.updateSearch} updateBooks={this.updateBooks}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
