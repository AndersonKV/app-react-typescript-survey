import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/layout/Home";
import Survey from "./components/survey/Survey";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/survey" component={Survey} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/result/:id" component={Result} />
      </Switch>
    </BrowserRouter>
  );
}

//<Route path="/:id" component={Form} />
