import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import NavigationUtil from "../navigation/NavigationUtil";
export default class UserScreen extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => NavigationUtil.goBack()}
        children={<Text children="quay ve" />}
      />
    );
  }
}
