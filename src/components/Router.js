import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";
import Header from "./Header";
import UsersTable from "./UsersTable";

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
          <Route exact path="/user/add">
            <AddUser />
          </Route>
          <Route exact path="/user/edit">
            <EditUser />
          </Route>
          <Route exact path="/user/delete">
            <DeleteUser />
          </Route>
          <Route exact path="/user/users">
            <UsersTable />
          </Route>
      </Switch>
    </BrowserRouter>
  );
}
