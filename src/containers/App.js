import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import Scroll from "../components/Scroll";
import SearchBox from "../components/SearchBox";
import "./App.css";

function App() {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setRobots(users));
  }, [searchfield]);

  const SearchedRobots = (event) => {
    setSearchfield(event.target.value);
  };

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
        <SearchBox searchChange={SearchedRobots} />
      </Scroll>
      <CardList robots={filteredRobots} />
    </div>
  );
}

export default App;
