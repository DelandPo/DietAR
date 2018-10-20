import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";
import { BarCodeScanner, Permissions } from "expo";

export default class HomeScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    alreadyRendered: false,
    infostatus: {
      title: "Scanning",
      color: "#841584"
    }
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }
  render() {
    return (
      <React.Fragment>
        <View style={{ flex: 0.1 }}>
          <Button
            onPress={() => {}}
            style={StyleSheet.absoluteFill}
            title={this.state.infostatus.title}
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        <View style={{ flex: 0.9 }}>
          <BarCodeScanner
            onBarCodeScanned={this.handleBarCodeScanned}
            style={StyleSheet.absoluteFill}
          />
        </View>
      </React.Fragment>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    if (this.state.alreadyRendered === false) {
      this.setState({ alreadyRendered: true });
      alert(`Bar code with type has been scanned!`);
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

// import {
//   Image,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from "react-native";
// import { BarCodeScanner, Permissions } from "expo";
// import React from "react";
// import { AR } from "expo";
// // Let's alias ExpoTHREE.AR as ThreeAR so it doesn't collide with Expo.AR.
// import ExpoTHREE, { AR as ThreeAR, THREE } from "expo-three";
// // Let's also import `expo-graphics`
// // expo-graphics manages the setup/teardown of the gl context/ar session, creates a frame-loop, and observes size/orientation changes.
// // it also provides debug information with `isArCameraStateEnabled`
// import { View as GraphicsView } from "expo-graphics";

// export default class HomeScreen extends React.Component {
//   componentDidMount() {
//     // Turn off extra warnings
//     THREE.suppressExpoWarnings();
//   }
//   state = {
//     hasCameraPermission: null,
//     alreadyRendered: false,
//     infoAvailable: false
//   };

//   render() {
//     // You need to add the `isArEnabled` & `arTrackingConfiguration` props.
//     // `isArRunningStateEnabled` Will show us the play/pause button in the corner.
//     // `isArCameraStateEnabled` Will render the camera tracking information on the screen.
//     // `arTrackingConfiguration` denotes which camera the AR Session will use.
//     // World for rear, Face for front (iPhone X only)
//     return (
//       <React.Fragment>
//         {this.state.infoAvailable && (
//           <GraphicsView
//             style={{ flex: 1 }}
//             onContextCreate={this.onContextCreate}
//             onRender={this.onRender}
//             onResize={this.onResize}
//             isArEnabled
//             isArRunningStateEnabled
//             isArCameraStateEnabled
//             arTrackingConfiguration={AR.TrackingConfigurations.World}
//           />
//         )}
//         {!this.state.alreadyRendered && (
//           <BarCodeScanner
//             onBarCodeScanned={this.handleBarCodeScanned}
//             style={StyleSheet.absoluteFill}
//           />
//         )}
//       </React.Fragment>
//     );
//   }

//   // When our context is built we can start coding 3D things.
//   onContextCreate = async ({ gl, scale: pixelRatio, width, height }) => {
//     // This will allow ARKit to collect Horizontal surfaces
//     AR.setPlaneDetection(AR.PlaneDetectionTypes.Horizontal);

//     // Create a 3D renderer
//     this.renderer = new ExpoTHREE.Renderer({
//       gl,
//       pixelRatio,
//       width,
//       height
//     });

//     // We will add all of our meshes to this scene.
//     this.scene = new THREE.Scene();
//     // This will create a camera texture and use it as the background for our scene
//     this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);
//     // Now we make a camera that matches the device orientation.
//     // Ex: When we look down this camera will rotate to look down too!
//     this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);
//     // Make a cube - notice that each unit is 1 meter in real life, we will make our box 0.1 meters
//     const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
//     // Simple color material
//     const material = new THREE.MeshPhongMaterial({
//       color: 0xff00ff
//     });

//     // Combine our geometry and material
//     this.cube = new THREE.Mesh(geometry, material);
//     // Place the box 0.4 meters in front of us.
//     this.cube.position.z = -0.1;
//     // Add the cube to the scene
//     this.scene.add(this.cube);
//     // Setup a light so we can see the cube color
//     // AmbientLight colors all things in the scene equally.
//     this.scene.add(new THREE.AmbientLight(0xffffff));
//   };

//   // When the phone rotates, or the view changes size, this method will be called.
//   onResize = ({ x, y, scale, width, height }) => {
//     // Let's stop the function if we haven't setup our scene yet
//     if (!this.renderer) {
//       return;
//     }
//     this.camera.aspect = width / height;
//     this.camera.updateProjectionMatrix();
//     this.renderer.setPixelRatio(scale);
//     this.renderer.setSize(width, height);
//   };

//   handleBarCodeScanned = ({ type, data }) => {
//     if (this.state.alreadyRendered === false) {
//       this.setState({ alreadyRendered: true });
//       this.setState({ infoAvailable: true });
//       alert(`Bar code with type has been scanned!`);
//     }
//   };

//   // Called every frame.
//   onRender = () => {
//     // Finally render the scene with the AR Camera
//     this.renderer.render(this.scene, this.camera);
//   };
// }
