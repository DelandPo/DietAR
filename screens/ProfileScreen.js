import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Content,
  ListItem,
  Body,
  Form,
  Label,
  Input,
  Item,
  List
} from "native-base";

import { CheckBox } from "react-native-elements";
export default class ProfileScreen extends Component {
  state = {
    eggCheck: false,
    milkCheck: false,
    peanutCheck: false,
    treenutCheck: false,
    fishCheck: false,
    shellfishCheck: false,
    glutenCheck: false,
    soyCheck: false
  };

  render() {
    return (
      <Container>
        <Content>
          <View style={styles.container}>
            <View style={styles.header} />
            <Image
              style={styles.avatar}
              source={{
                uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
              }}
            />
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <Text style={styles.name}>Ananda Poudel</Text>
              </View>
            </View>
          </View>

          <Form>
            <Item floatingLabel>
              <Label>Height (inches)</Label>
              <Input value={`70`} />
            </Item>
            <Item floatingLabel last>
              <Label>Weight (lbs)</Label>
              <Input value={"150"} />
            </Item>
            <Item floatingLabel last>
              <Label>Required Calories (kcal)</Label>
              <Input value={"2500"} />
            </Item>
          </Form>
          <List>
            <ListItem itemDivider>
              <Text>Allergies</Text>
            </ListItem>
            <ListItem style={{ marginTop: 10 }}>
              <CheckBox
                checked={this.state.eggCheck}
                onPress={() =>
                  this.setState({ eggCheck: !this.state.eggCheck })
                }
              />
              <Body>
                <Text>Eggs</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox
                checked={this.state.milkCheck}
                onPress={() =>
                  this.setState({ milkCheck: !this.state.milkCheck })
                }
              />
              <Body>
                <Text>Milk</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox
                checked={this.state.peanutCheck}
                onPress={() =>
                  this.setState({ peanutCheck: !this.state.peanutCheck })
                }
                color="green"
              />
              <Body>
                <Text>Peanuts</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox
                checked={this.state.treenutCheck}
                onPress={() =>
                  this.setState({ treenutCheck: !this.state.treenutCheck })
                }
                color="green"
              />
              <Body>
                <Text>Tree Nuts</Text>
              </Body>
            </ListItem>{" "}
            <ListItem>
              <CheckBox
                onPress={() =>
                  this.setState({ fishCheck: !this.state.fishCheck })
                }
                checked={this.state.fishCheck}
                color="green"
              />
              <Body>
                <Text>Fish</Text>
              </Body>
            </ListItem>{" "}
            <ListItem>
              <CheckBox
                checked={this.state.shellfishCheck}
                onPress={() =>
                  this.setState({ shellfishCheck: !this.state.shellfishCheck })
                }
                color="green"
              />
              <Body>
                <Text>Shellfish</Text>
              </Body>
            </ListItem>{" "}
            <ListItem>
              <CheckBox
                checked={this.state.glutenCheck}
                color="green"
                onPress={() =>
                  this.setState({ glutenCheck: !this.state.glutenCheck })
                }
              />
              <Body>
                <Text>Gluten</Text>
              </Body>
            </ListItem>{" "}
            <ListItem>
              <CheckBox
                checked={this.state.soyCheck}
                onPress={() =>
                  this.setState({ soyCheck: !this.state.soyCheck })
                }
                color="green"
              />
              <Body>
                <Text>Soy</Text>
              </Body>
            </ListItem>
          </List>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              alert("Sucess! Your informations is updated!");
            }}
          >
            <Text>Save</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#BAF2BB",
    height: 200
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
    alignSelf: "center",
    justifyContent: "center"
  },
  body: {
    marginTop: 40
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#BAD7F2"
  }
});
