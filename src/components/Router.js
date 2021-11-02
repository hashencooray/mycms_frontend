import { Grid } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";
import Footer from "./Footer";
import Header from "./Header";
import {makeStyles} from '@material-ui/core/styles'
import TestSocket from "../pages/TestSocket";
import ContentManager from "../pages/ContentManager";

const useStyles = makeStyles( (theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "100vh"
  },
  content: {
    flexGrow: 1,
    marginTop: 50
  }
}));


export default function Router() {

  const classes = useStyles();

  return (
    <Grid container className={classes.wrapper}>
      <BrowserRouter>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12} className={classes.content}>
          <Switch>
          <Route exact path="/test">
              <TestSocket />
            </Route>
            <Route exact path="/user/add">
              <AddUser />
            </Route>
            <Route exact path="/user/edit">
              <EditUser />
            </Route>
            <Route exact path="/user/delete">
              <DeleteUser />
            </Route>
            <Route exact path="/:tabletype">
              <ContentManager />
            </Route>
          </Switch>
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </BrowserRouter>
    </Grid>
  );
}
