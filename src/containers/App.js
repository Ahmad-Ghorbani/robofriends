import React, { useEffect } from "react";
import CardList from "../components/CardList";
import Scroll from "../components/Scroll";
import SearchBox from "../components/SearchBox";
import "./App.css";
import { connect } from "react-redux";

import { setSearchField, requestRobots } from "../actions";

const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SearchedRobots: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots()),
  };
};

function App(store) {
  //const [robots, setRobots] = useState([]);
  //const [searchfield, setSearchfield] = useState("");

  useEffect(() => {
    store.onRequestRobots();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { searchField, SearchedRobots, robots, isPending } = store;

  const filteredRobots = robots.filter((robots) =>
    robots.name.toLowerCase().includes(searchField.toLowerCase())
  );

  return isPending ? (
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
