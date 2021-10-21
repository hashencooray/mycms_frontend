import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddEditUser from "./AddEditUser";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
          <Route exact path="/user/add">
            <AddEditUser />
          </Route>
      </Switch>
    </BrowserRouter>
  );
}
