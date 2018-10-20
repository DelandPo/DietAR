import React from "react";
import { ExpoConfigView } from "@expo/samples";
import ProfileScreen from "./ProfileScreen";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "DietAR"
  };

  render() {
    return <ProfileScreen />;
  }
}
