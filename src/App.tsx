import React, { useState } from "react";
import { Route, Router, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { RepositoryDetails } from "./pages/RepositoryDetails";
import { RepositorySearch } from "./pages/RepositorySearch";

function App() {
  const [repos, setRepos] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <RepositorySearch />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
