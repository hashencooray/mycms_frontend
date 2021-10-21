import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddEditUser from "./AddEditUser";
import Header from "./Header";
import UsersTable from "./UsersTable";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
          <Route exact path="/user/add">
            <AddEditUser />
          </Route>
          <Route exact path="/user/header">
            <Header />
          </Route>
          <Route exact path="/user/users-table">
            <UsersTable />
          </Route>
      </Switch>
    </BrowserRouter>
  );
}
