import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  LogBox
} from "react-native";

import BottomSheet from "react-native-bottomsheet-reanimated";
import { Audio } from "expo-av";
import * as Linking from "expo-linking";
import { Feather } from "@expo/vector-icons";



LogBox.ignoreAllLogs();

const { width, height } = Dimensions.get("window");
const snapPoints = [0, height / 2, "70%", "100%"];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: null,
      isListening: false,
      isVisible: false
    };
  }

  displayModal(show) {
    this.setState({ isVisible: show })
  }

  onOpenBottomSheetHandler = (index) => {
    this.refs.BottomSheet.snapTo(index);
  };

  render() {
    // // Spotify API
    // let getTrack = async (id) => {
    //   console.log("ID<<>>>", id);
    //   try {
    //     const api = `https://api.spotify.com/v1/tracks/${id}`;
    //     let res = await fetch(api, {
    //       method: "GET",
    //       headers: {
    //         Authorization:
    //           "Bearer SPOTIFY_TOKEN_HERE",
    //       },
    //     });
    //     console.log("SPOTIFY", res);
    //     if (res.ok) {
    //       this.setState({ isListening: false });
    //       let json = await res.json();
    //       this.setState({ song: json });
    //       this.onOpenBottomSheetHandler(1);
    //       console.log(json);
    //     } else {
    //       alert("Spotify Song not found.");
    //       this.setState({ isListening: false });
    //     }
    //   } catch (e) {
    //     this.setState({ isListening: false });
    //     console.log(e);
    //   }
    // };

    // // ACR CLOUD API
    // let record = async () => {
    //   this.setState({ isListening: true });
    //   console.log("<<<<<<<<<<<<< START >>>>>>>>>>>>>>>");
    //   let gratend = await Audio.requestPermissionsAsync();
    //   // console.log(gratend);
    //   if (gratend.granted) {
    //     const recording = new Audio.Recording();
    //     try {
    //       await recording.prepareToRecordAsync(
    //         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
    //       );
    //       await recording.startAsync();
          
    //       setTimeout(async () => {
    //         await recording.stopAndUnloadAsync();
    //         let uri = await recording.getURI();

    //         console.log("Audio Clip Ready:",uri);

    //         const api = "https://soundreg.herokuapp.com/api/v1/song"; // Python Flask API
    //         let data = new FormData();
    //         data.append("file", {
    //           uri: uri,
    //           name: "file.m4a",
    //           type: "audio/m4a",
    //         });

    //         let res = await fetch(api, {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "multipart/form-data",
    //           },
    //           body: data,
    //         });

    //         if (res.ok) {
    //           let json = await res.json();
    //           if (json.status.msg == "Success") {
    //             getTrack(
    //               json.metadata.music[0].external_metadata.spotify.track.id
    //             );
    //             console.log("ACR Cloud", json);
    //           } else {
    //             this.setState({ song: null });
    //             alert("Song not found.");
    //             this.setState({ isListening: false });
    //           }
    //         } else {
    //           this.setState({ isListening: false });
    //           alert("Song not found.");
    //         }
    //       }, 10000);
    //     } catch (error) {
    //       // An error occurred!
    //       console.log("err<<<>> ", error);
    //       this.setState({ isListening: false });
    //       alert("Song not found.");
    //     }
    //   } else {
    //     console.log("permission error");
    //     alert("Permission Needed");
    //   }
    // };

    return (
      <SafeAreaView style={styles.container}>
        <Modal
          style={styles.body}
          animationType={"slide"}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed')
          }}
        >
          <View>
            <Text> Demo Form </Text>
            <Text
              style={styles.closeText}
              onPress={() => {
              this.displayModal(!this.state.isVisible);}}
            >
              Close Modal
            </Text>
          </View>

        </Modal>
        <TouchableOpacity
          style={{ padding: 20 }}
          onPress={() => this.displayModal(true)}
        >
          <Feather name="plus-circle" size={100} color='#3eb489'/>
        </TouchableOpacity>

        <BottomSheet
          bottomSheerColor="#FFFFFF"
          ref="BottomSheet"
          initialPosition={0}
          snapPoints={snapPoints}
          isBackDrop={true}
          isBackDropDismissByPress={true}
          isRoundBorderWithTipHeader={true}
          containerStyle={{ backgroundColor: "white" }}
          body={
            <View>
              {this.state.song ? (
                <View style={styles.body}>
                  <Text style={styles.text2}>{this.state.song.name}</Text>
                  <Text style={styles.text}>
                    {this.state.song.album.artists[0].name}
                  </Text>

                  <Image
                    source={{ uri: this.state.song.album.images[1].url }}
                    style={{
                      width: 150,
                      height: 150,
                      backgroundColor: "white",
                      marginVertical: 15,
                    }}
                  />

                  <TouchableOpacity
                    onPress={() => Linking.openURL(this.state.song.uri)}
                  >
                    <Image
                      source={require("./assets/spotify.png")}
                      style={{ width: 130, height: 32.2 }}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          }
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  boxWrapper: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
  text2: {
    fontSize: 21,
    fontWeight: "bold",
  },
  closeText: {
    fontSize: 24,
    color: '#00479e',
    textAlign: 'center',
  }
  
});

export default App;