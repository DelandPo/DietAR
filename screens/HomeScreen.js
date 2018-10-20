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
  Title
} from "native-base";
// import rp from "request-promise";
export default class HomeScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    alreadyRendered: false,
    checkMark: "✔️",
    crossMark: "❌",
    smileyFace: "😊",
    neutralFace: "😐",
    sadFace: "🙁",
    calories: "",
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
    previousBarcodeData: ""
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }
  render() {
    return (
      <React.Fragment>
        {/* <View style={{ flex: 0.2 }}>
          <Container>
            <Header>
              <Body>
                <Title>DietAR</Title>
              </Body>
            </Header>
          </Container>
        </View> */}
        <View style={{ backgroundColor: "#ffffff" }}>
          <Text
            style={{
              justifyContent: "center",
              alignSelf: "center",
              fontSize: 20,
              textAlignVertical: "center",
              backgroundColor: "#ffffff"
            }}
          >
            DietAR
          </Text>
        </View>
        <View style={{ flex: 0.7 }}>
          <BarCodeScanner
            onBarCodeScanned={this.handleBarCodeScanned}
            style={StyleSheet.absoluteFill}
          />
        </View>
        <Container>
          <Content padder>
            <Grid>
              <Col
                style={{ backgroundColor: "#ffffff", height: 80, width: 139 }}
              >
                <Card>
                  <CardItem header bordered>
                    <Text>Calories</Text>
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
              <Col
                style={{ backgroundColor: "#ffffff", height: 420, width: 139 }}
              >
                <Card>
                  <CardItem header bordered>
                    <Text>Allergies </Text>
                  </CardItem>
                  <List>
                    <ListItem>
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
                    </ListItem>
                  </List>
                </Card>
              </Col>
              <Col style={{ backgroundColor: "#ffffff", height: 400 }}>
                <Card>
                  <CardItem header bordered>
                    <Text>Healthiness</Text>
                  </CardItem>
                  <List>
                    <ListItem>
                      <Text>
                        {this.state.transFatState}
                        Trans Fat{" "}
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text>
                        {this.state.refinedGrainState}
                        Refined Grains
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text>
                        {this.state.syrupState}
                        Corn Syrup
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text>
                        {this.state.palmOilState}
                        Palm Oil
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text>
                        {this.state.msgState}
                        MSG
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text>
                        {this.state.sweetnerState}
                        Artificial Sweetner
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text>
                        {this.state.sodiumState}
                        Sodium
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text>{this.state.sugarState} Sugar</Text>
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
      alert(url);
      try {
        const response = await fetch(url);
      } catch (ex) {
        console.error(ex);
      }
      const result = await JSON.parse(response);
      if (result.status === 0) {
        alert("Not a HotDog!");
      } else {
        alert(
          `Lenght of Allergens! ${result.product.allergens_hierarchy.length}`
        );
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
