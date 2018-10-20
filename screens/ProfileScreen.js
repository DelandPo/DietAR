import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Content,
  ListItem,
  CheckBox,
  Body,
  Form,
  Label,
  Input,
  Item,
  List
} from "native-base";

export default class ProfileScreen extends Component {
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
              <Label>Height(inches)</Label>
              <Input value={`70`} />
            </Item>
            <Item floatingLabel last>
              <Label>Weight(lbs)</Label>
              <Input value={"150"} />
            </Item>
          </Form>
          <List>
            <ListItem itemDivider>
              <Text>Allergies</Text>
            </ListItem>
            <ListItem style={{ marginTop: 10 }}>
              <CheckBox checked={true} />
              <Body>
                <Text>Eggs</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={false} />
              <Body>
                <Text>Milk</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={false} color="green" />
              <Body>
                <Text>Peanuts</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={false} color="green" />
              <Body>
                <Text>Tree Nuts</Text>
              </Body>
            </ListItem>{" "}
            <ListItem>
              <CheckBox checked={false} color="green" />
              <Body>
                <Text>Fish</Text>
              </Body>
            </ListItem>{" "}
            <ListItem>
              <CheckBox checked={false} color="green" />
              <Body>
                <Text>Shellfish</Text>
              </Body>
            </ListItem>{" "}
            <ListItem>
              <CheckBox checked={false} color="green" />
              <Body>
                <Text>Gluten</Text>
              </Body>
            </ListItem>{" "}
            <ListItem>
              <CheckBox checked={false} color="green" />
              <Body>
                <Text>Soy</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
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
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF"
  }
});
