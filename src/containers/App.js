import React from "react";
import { Component } from "react";
import CardList from "../components/CardList";
import Scroll from "../components/Scroll";
import SearchBox from "../components/SearchBox";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ robots: users }));
  }

  SearchedRobots = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter((robots) =>
      robots.name.toLowerCase().includes(searchfield.toLowerCase())
    );
    return !robots.length ? (
      <div className="tc">
        <h1 className="f1">Loading</h1>
      </div>
    ) : (
      <div className="tc">
        <Scroll>
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange={this.SearchedRobots} />
        </Scroll>
        <CardList robots={filteredRobots} />
      </div>
    );
  }
}

export default App;
