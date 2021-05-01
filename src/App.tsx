import React from "react";
import Details from "./components/Details/Details";
import Favorite from "./components/Favorite/Favorite";
import Header from "./components/Header/Header";
import MainScreen from "./components/MainScreen/MainScreen";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={MainScreen} />
        <Route path="/favorite" component={Favorite} />
        <Route path="/bookcard/:bookId" component={Details} />
      </Switch>
    </div>
  );
}

export default App;
