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
    calories: "",
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
    resultArray: ["Milk", "Eggs", "Fish", "Soy", "Shellfish", "Peanuts", "Tree Nuts", "Gluten"],
    healthArray: ["Trans Fat", "Corn Syrup", "Artificial Flavors", "Sodium", "Sugar"]
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
          style={{ backgroundColor: "#ffffff", height: 91, width: 400 }}>
                  <CardItem header bordered>
                    <Text>Product Name</Text>
                  </CardItem>
                  <List>
                    <ListItem>
                      <Text>
                        {this.state.productName}
                      </Text>
                    </ListItem>
                  </List>
                </Card>
          </Grid>
            <Grid>
              <Col
                style={{ backgroundColor: "#ffffff", height: 91, width: 139 }}
              >
                <Card>
                  <CardItem header bordered>
                    <Text>Calories </Text>
                  </CardItem>
                  <List>
                    <ListItem>
                      <Text style={{ fontSize: 30 }}>
                        {this.state.calories}
                      </Text>
                    </ListItem>
                  </List>
                </Card>
              </Col>
              <Col
                style={{
                  backgroundColor: "#ffffff",
                  height: 120
                }}
              >
                <Card>
                  <CardItem header bordered>
                    <Text>Recommendation</Text>
                  </CardItem>
                  <List>
                    <ListItem>
                      <Text style={{ fontSize: 30 }}>
                        {this.state.recommendationStatus}
                      </Text>
                    </ListItem>
                  </List>
                </Card>
              </Col>
            </Grid>
            <Grid>
            <Col style={{ backgroundColor: "#ffffff", height: 500, width: 140 }}>
                <Card>
                  <CardItem header bordered>
                    <Text>Allergies </Text>
                  </CardItem>
                    <List
                    dataArray={this.state.resultArray}
                    renderRow={(item, index) => (
                      <ListItem>
                        <Body>
                          <Text>{item}</Text>
                        </Body>
                      </ListItem>
                    )}
                    >
                    </List>
                </Card>
                </Col>
              <Col style={{ backgroundColor: "#ffffff", height: 500 }}>
                <Card>
                  <CardItem header bordered>
                    <Text>Healthiness</Text>
                  </CardItem>
                  <List
                    dataArray={this.state.healthArray}
                    renderRow={(item, index) => (
                      <ListItem>
                        <Body>
                          <Text>{item}</Text>
                        </Body>
                      </ListItem>
                    )}
                  >
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
        var allergens = result.product.allergens_hierarchy;
        if (allergens.length !== 0) {
          var temp = allergens.map(s => s.substring(3).toLowerCase().split(' ').map(function(word) {
            return word.replace(word[0], word[0].toUpperCase());
          }).join(' '));
          this.setState({resultArray:temp});
        } else {
          this.setState({resultArray:["None"]});
        }

        var name = result.product.product_name.toLowerCase().split(' ').map(function(word) {
          return word.replace(word[0], word[0].toUpperCase());
        }).join(' ');

        this.setState({ productName:name });
        
        var cal = result.product.nutriments.energy_value;
        try {
          result.product.nutriments.energy_value.toLowerCase();
        } catch (ex) {
          cal = 0;
        }
        this.setState({ calories:cal })

        //--------------------

        var healths = [];
        var hcount = 0;
        // if (parseInt(result.product.nutriments.trans-fat, 10) !== 0) {
        //   healths.push("Trans Fat");
        // }
        if (parseInt(result.product.nutriments.sugars_value, 10) > 9) {
          healths.push("Sugar");
          hcount++;
        }
        if (parseInt(result.product.nutriments.sodium_value, 10) > 100 && result.product.nutriments.sodium_unit == 'mg') {
          healths.push("Sodium");
          hcount++;
        }
        try {
          if (result.product.ingredients_text_en.toLowerCase().includes("artificial flavor")) {
            healths.push("Artificial Flavors");
            hcount += 2;
          }
          if (result.product.ingredients_text_en.toLowerCase().includes("corn syrup")) {
            healths.push("Corn Syrup");
            hcount += 3;
          }
        } catch(ex) {
          //do nothing
        }

        if (hcount === 0) {
          this.setState({healthArray:["None"]});
          this.setState({recommendationStatus:"Great!"});
        } else {
          this.setState({healthArray:healths});
          if (hcount === 1 || hcount === 2) {
            this.setState({recommendationStatus:"Good."});
          } else if (hcount === 3) {
            this.setState({recommendationStatus:"Ok."});
          } else {
            this.setState({recommendationStatus:"Poor."});
          }
        }

        //--------------------
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
