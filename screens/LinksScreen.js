import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import PlanAR from "./PlanAR";

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "DietAR"
  };

  render() {
    return <PlanAR />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
