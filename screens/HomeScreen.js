import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Button
} from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import {
  Container,
  Header,
  Content,
  Badge,
  Text,
  Grid,
  Icon,
  Col,
  Row,
  Card,
  CardItem,
  List,
  ListItem,
  Body,
  Title,
  Item
} from "native-base";
import FileSystem from "react-native-filesystem";
// import rp from "request-promise";
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "DietAR",
    headerStyle: {
      backgroundColor: "#BAF2BB"
    }
  };
  state = {
    hasCameraPermission: null,
    alreadyRendered: false,
    checkMark: "✅",
    crossMark: "❌",
    smileyFace: "😊",
    neutralFace: "😐",
    sadFace: "🙁",
    calories: "",
    productName: "",
    recommendationStatus: "",
    eggState: "",
    milkState: "",
    peanutState: "",
    treeNutState: "",
    fishState: "",
    shellFishState: "",
    gluetenState: "",
    soyState: "",
    transFatState: "",
    refinedGrainState: "",
    syrupState: "",
    sweetnerState: "",
    sugarState: "",
    sodiumState: "",
    palmOilState: "",
    msgState: "",
    previousBarcodeData: "",
    resultArray: [
      "Milk",
      "Eggs",
      "Fish",
      "Soy",
      "Shellfish",
      "Peanuts",
      "Tree Nuts",
      "Gluten"
    ],
    healthArray: [
      "Trans Fat",
      "Corn Syrup",
      "Artificial Flavors",
      "Sodium",
      "Sugar"
    ],
    userProfile: null
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }
  render() {
    return (
      <React.Fragment>
        <View style={{ flex: 0.7 }}>
          <BarCodeScanner
            onBarCodeScanned={this.handleBarCodeScanned}
            style={StyleSheet.absoluteFill}
          />
        </View>
        <Container>
          <Content padder>
            <Grid>
              <Card style={{ backgroundColor: "#BAF2BB", width: 390 }}>
                <CardItem
                  style={{ backgroundColor: "#BAF2BB" }}
                  header
                  bordered
                >
                  <Text style={{ fontSize: 18, color: "#837E7C" }}>
                    Product Name
                  </Text>
                </CardItem>
                <List>
                  <ListItem>
                    <Text style={{ fontSize: 18, color: "#837E7C" }}>
                      {this.state.productName}
                    </Text>
                  </ListItem>
                </List>
              </Card>
            </Grid>
            <Grid>
              <Col style={{ backgroundColor: "#ffffff", width: 140 }}>
                <Card style={{ backgroundColor: "#BAF2D8" }}>
                  <CardItem
                    style={{ backgroundColor: "#BAF2D8" }}
                    header
                    bordered
                  >
                    <Text style={{ fontSize: 18, color: "#837E7C" }}>
                      Calories
                    </Text>
                  </CardItem>
                  <List>
                    <ListItem>
                      <Text style={{ fontSize: 30, color: "#837E7C" }}>
                        {this.state.calories}
                      </Text>
                    </ListItem>
                  </List>
                </Card>
              </Col>
              <Col style={{ backgroundColor: "#ffffff" }}>
                <Card style={{ backgroundColor: "#BAD7F2" }}>
                  <CardItem
                    style={{ backgroundColor: "#BAD7F2" }}
                    header
                    bordered
                  >
                    <Text style={{ fontSize: 18, color: "#837E7C" }}>
                      Recommendation
                    </Text>
                  </CardItem>
                  <List>
                    <ListItem>
                      <Text
                        style={{
                          fontSize: 30,
                          color: "#837E7C",
                          alignItems: "center"
                        }}
                      >
                        {this.state.recommendationStatus}
                      </Text>
                    </ListItem>
                  </List>
                </Card>
              </Col>
            </Grid>
            <Grid>
              <Col style={{ backgroundColor: "#ffffff" }}>
                <Card style={{ backgroundColor: "#F2BAC9" }}>
                  <CardItem
                    style={{ backgroundColor: "#F2BAC9" }}
                    header
                    bordered
                  >
                    <Text style={{ fontSize: 18, color: "#837E7C" }}>
                      Allergens{" "}
                    </Text>
                  </CardItem>
                  <List
                    dataArray={this.state.resultArray}
                    renderRow={(item, index) => (
                      <ListItem>
                        <Body>
                          <Text style={{ fontSize: 18, color: "#837E7C" }}>
                            {item}
                          </Text>
                        </Body>
                      </ListItem>
                    )}
                  />
                </Card>
              </Col>
            </Grid>
            <Grid>
              <Col style={{ backgroundColor: "#ffffff" }}>
                <Card style={{ backgroundColor: "#F2E2BA" }}>
                  <CardItem
                    style={{ backgroundColor: "#F2E2BA" }}
                    header
                    bordered
                  >
                    <Text style={{ fontSize: 18, color: "#837E7C" }}>
                      Unhealthy Ingredients
                    </Text>
                  </CardItem>
                  <List
                    dataArray={this.state.healthArray}
                    renderRow={(item, index) => (
                      <ListItem>
                        <Body>
                          <Text style={{ fontSize: 18, color: "#837E7C" }}>
                            {item}
                          </Text>
                        </Body>
                      </ListItem>
                    )}
                  />
                </Card>
              </Col>
            </Grid>
          </Content>
        </Container>
      </React.Fragment>
    );
  }

  handleBarCodeScanned = async ({ type, data }) => {
    if (this.state.previousBarcodeData !== data) {
      if (!this.state.userProfile) {
        const preferences = await getData();
        this.setState({ userProfile: preferences });
      }
      this.setState({ previousBarcodeData: data });
      const url = `https://world.openfoodfacts.org/api/v0/product/${data}.json`;
      let response = {};
      try {
        response = await fetch(url);
      } catch (ex) {
        console.error(ex);
      }
      const result = await response.json();
      if (result.status === 0) {
        alert("Not a HotDog!");
      } else {
        try {
          var allergens = result.product.allergens_hierarchy;
          if (allergens.length !== 0) {
            var temp = allergens.map(s =>
              s
                .substring(3)
                .toLowerCase()
                .split(" ")
                .map(function(word) {
                  return word.replace(word[0], word[0].toUpperCase());
                })
                .join(" ")
            );
            this.setState({ resultArray: temp });
          } else {
            this.setState({ resultArray: ["None"] });
          }
        } catch (ex) {
          //do nothing
        }

        var name = result.product.product_name
          .toLowerCase()
          .split(" ")
          .map(function(word) {
            return word.replace(word[0], word[0].toUpperCase());
          })
          .join(" ");

        this.setState({ productName: name });

        var cal = result.product.nutriments.energy_value;
        try {
          result.product.nutriments.energy_value.toLowerCase();
        } catch (ex) {
          cal = 0;
        }
        this.setState({ calories: cal });

        //--------------------

        var healths = [];
        var hcount = 0;
        // if (parseInt(result.product.nutriments.trans-fat, 10) !== 0) {
        //   healths.push("Trans Fat");
        // }
        if (parseInt(result.product.nutriments.sugars_value, 10) > 9) {
          healths.push("High Sugar");
          hcount++;
        }
        if (
          parseInt(result.product.nutriments.sodium_value, 10) > 100 &&
          result.product.nutriments.sodium_unit == "mg"
        ) {
          healths.push("High Sodium");
          hcount++;
        }
        try {
          if (
            result.product.ingredients_text_en
              .toLowerCase()
              .includes("artificial flavor")
          ) {
            healths.push("Artificial Flavors");
            hcount += 2;
          }
          if (
            result.product.ingredients_text_en
              .toLowerCase()
              .includes("corn syrup")
          ) {
            healths.push("Corn Syrup");
            hcount += 3;
          }
        } catch (ex) {
          //do nothing
        }

        if (hcount === 0) {
          this.setState({ healthArray: ["None"] });
          this.setState({ recommendationStatus: "😃Great" });
        } else {
          this.setState({ healthArray: healths });
          if (hcount === 1 || hcount === 2) {
            this.setState({ recommendationStatus: "😊Good" });
          } else if (hcount === 3) {
            this.setState({ recommendationStatus: "😐Ok" });
          } else {
            this.setState({ recommendationStatus: "🙁Poor" });
          }
        }

        //--------------------
      }
    }
  };
}

async function getData() {
  const url = `https://presentar-61bff.firebaseio.com/hackHarvard/.json`;
  let response = {};
  try {
    response = await fetch(url);
  } catch (ex) {
    console.error(ex);
  }
  const result = await response.json();
  return result;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
