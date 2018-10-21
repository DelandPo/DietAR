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
// import rp from "request-promise";
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "DietAR"
  };
  state = {
    hasCameraPermission: null,
    alreadyRendered: false,
    checkMark: "✅",
    crossMark: "❌",
    smileyFace: "😊",
    neutralFace: "😐",
    sadFace: "🙁",
    calories: "160",
    productName:"",
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
    resultArray: ["Milk", "Eggs", "Fish", "Soy", "Shellfish", "Peanuts", "Tree Nuts", "Gluten"]

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
          <Card
          style={{ backgroundColor: "#BAF2BB", width: 350 }}>
                  <CardItem style = {{ backgroundColor: "#BAF2BB"}} header bordered>
                    <Text style={{ fontSize: 18, color: "#837E7C" }}>
                    Product Name</Text>
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
              <Col
                style={{ backgroundColor: "#ffffff", height: 120, width: 140 }}>
                <Card style = {{ backgroundColor: "#BAF2D8"}}>
                  <CardItem style = {{ backgroundColor: "#BAF2D8"}} header bordered>
                    <Text style={{ fontSize: 18, color: "#837E7C" }}>
                    Calories</Text>
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
              <Col style={{ backgroundColor: "#ffffff", height: 120 }}>
                <Card style = {{ backgroundColor: "#BAD7F2"}}>
                  <CardItem style = {{ backgroundColor: "#BAD7F2"}} header bordered>
                    <Text style={{ fontSize: 18, color: "#837E7C" }}>
                    Recommendation</Text>
                  </CardItem>
                  <List>
                    <ListItem>
                      <Text style={{ fontSize: 30, color: "#837E7C", alignItems: "center" }}>
                        {this.state.smileyFace}
                      </Text>
                    </ListItem>
                  </List>
                </Card>
              </Col>
            </Grid>
            <Grid>
            <Col style={{ backgroundColor: "#ffffff", width: 350 }}>
                <Card style = {{ backgroundColor: "#FCF5C7"}}>
                  <CardItem style = {{ backgroundColor: "#FCF5C7"}} header bordered>
                    <Text style={{ fontSize: 18, color: "#837E7C" }}>
                    Allergies </Text>
                  </CardItem>
                    <List
                    dataArray={this.state.resultArray}
                    renderRow={(item, index) => (
                      <ListItem>
                        <Body>
                          <Text style={{ fontSize: 18, color: "#837E7C" }}>
                          {item}</Text>
                        </Body>
                      </ListItem>
                    )}
                    >
                    {/* <ListItem>
                      <Text>
                        {this.state.eggState}
                        Eggs{" "}
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text>{this.state.milkState} Milk</Text>
                    </ListItem>
                    <ListItem>
                      <Text>{this.state.peanutState} Peanuts</Text>
                    </ListItem>
                    <ListItem>
                      <Text>{this.state.treeNutState} Tree Nuts</Text>
                    </ListItem>
                    <ListItem>
                      <Text>{this.state.fishState} Fish</Text>
                    </ListItem>
                    <ListItem>
                      <Text>{this.state.shellFishState} Shellfish</Text>
                    </ListItem>
                    <ListItem>
                      <Text>{this.state.gluetenState} Gluten</Text>
                    </ListItem>
                    <ListItem>
                      <Text>{this.state.soyState} Soy</Text>
                    </ListItem> */}
                  </List>
                </Card>
                </Col>
                </Grid>
                <Grid>
              <Col style={{ backgroundColor: "#ffffff" }}>
                <Card style = {{ backgroundColor: "#F2E2BA"}}>
                  <CardItem style = {{ backgroundColor: "#F2E2BA"}}header bordered>
                    <Text style={{ fontSize: 18, color: "#837E7C" }}>
                    Healthiness</Text>
                  </CardItem>
                  <List>
                    <ListItem>
                      <Text style={{ fontSize: 18, color: "#837E7C" }}>
                        {this.state.transFatState}
                        Trans Fat{" "}
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text style={{ fontSize: 18, color: "#837E7C" }}>
                        {this.state.refinedGrainState}
                        Refined Grains
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text style={{ fontSize: 18, color: "#837E7C" }}>
                        {this.state.syrupState}
                        Corn Syrup
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text style={{ fontSize: 18, color: "#837E7C" }}>
                        {this.state.palmOilState}
                        Palm Oil
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text style={{ fontSize: 18, color: "#837E7C" }}>
                        {this.state.msgState}
                        MSG
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text style={{ fontSize: 18, color: "#837E7C" }}>
                        {this.state.sweetnerState}
                        Artificial Sweetner
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text style={{ fontSize: 18, color: "#837E7C" }}>
                        {this.state.sodiumState}
                        Sodium
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text style={{ fontSize: 18, color: "#837E7C" }}>
                      {this.state.sugarState} Sugar</Text>
                    </ListItem>
                  </List>
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
        // alert(
        //   `Lenght of Allergens! ${result.product.allergens_hierarchy.length}`
        // );
        var allergens = result.product.allergens_hierarchy;
        var temp = allergens.map(s => s.substring(3).toLowerCase().split(' ').map(function(word) {
          return word.replace(word[0], word[0].toUpperCase());
        }).join(' '));
        this.setState({resultArray:temp});

        var name = result.product.product_name.toLowerCase().split(' ').map(function(word) {
          return word.replace(word[0], word[0].toUpperCase());
        }).join(' ');

        this.setState({ productName:name });

        // result.product.allergens_hierarchy.map(all => {
        //   if (all === "en:milk") {
        //     this.setState({ milkState: "✔️" });
        //   }
        // });
      }
    }
  };
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
