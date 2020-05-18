import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import NavigationUtil from "../navigation/NavigationUtil";
export default class HomeScreen extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => NavigationUtil.navigation("/user")}
        children={<Text children="dm quoc anh an Lon" />}
      />
    );
  }
}
