import React, { Component } from "react"
import { Navigator } from "react-native"

export default class NavigationBar extends Navigator.NavigationBar {
  render() {
    var routes = this.props.navState.routeStack;

    if (routes.length) {
      var route = routes[routes.length - 1];

      if (route.displayNavbar === false) {
        return null;
      }
    }

    return super.render();
  }
}
