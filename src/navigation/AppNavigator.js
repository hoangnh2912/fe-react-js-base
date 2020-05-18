import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import UserScreen from "../screens/UserScreen";
import HomeScreen from "../screens/HomeScreen";
import { setHistory } from "../navigation/NavigationUtil";
export class AppNavigator extends Component {
  render() {
    return (
      <BrowserRouter ref={setHistory}>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/user" exact component={UserScreen} />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
