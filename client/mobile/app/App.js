import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  LogBox,
  TextInput
} from "react-native";

import BottomSheet from "react-native-bottomsheet-reanimated";
import { Audio } from "expo-av";
import * as Linking from "expo-linking";
import { Feather } from "@expo/vector-icons";

// import RecipeForm from './components/RecipeForm'



LogBox.ignoreAllLogs();

const { width, height } = Dimensions.get("window");
const snapPoints = ["10%", "90%"];

export default function App() {
  const initialState = { 
    song: null,
    isListening: false,
    isVisible: false
  }
  const [state, setState] = useState(initialState);

  displayModal = (show) => {
    setState({ isVisible: show });
  };

  onOpenBottomSheetHandler = (index) => {
    BottomSheet.snapTo(index);
  };

//   <BottomSheet
//   bottomSheerColor="#FFFFFF"
//   ref="BottomSheet"
//   initialPosition={0}
//   snapPoints={snapPoints}
//   isBackDrop={true}
//   isBackDropDismissByPress={true}
//   isRoundBorderWithTipHeader={true}
//   containerStyle={{ backgroundColor: "white" }}
//   body={
//     <View>
//       {state.song ? (
//         <View style={styles.body}>
//           <Text style={styles.text2}>{state.song.name}</Text>
//           <Text style={styles.text}>
//             {state.song.album.artists[0].name}
//           </Text>

//           <Image
//             source={{ uri: state.song.album.images[1].url }}
//             style={{
//               width: 150,
//               height: 150,
//               backgroundColor: "white",
//               marginVertical: 15,
//             }}
//           />

//           <TouchableOpacity
//             onPress={() => Linking.openURL(state.song.uri)}
//           >
//             <Image
//               source={require("../assets/spotify.png")}
//               style={{ width: 130, height: 32.2 }}
//             />
//           </TouchableOpacity>
//         </View>
//       ) : null}
//     </View>
//   }
// />

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modal}>
        <Text> Add to your recipe book... </Text>
          <View>
            <TextInput placeholder='Enter' />
          </View>
        <Text
          style={styles.closeText}
          onPress={() => {
          displayModal(!state.isVisible);}}
        >
          Close Modal
        </Text>
      </View>
      <TouchableOpacity
        style={{ padding: 20 }}
        onPress={() => displayModal(true)}
      >
        <Feather name="plus-circle" size={100} color='#3eb489'/>
      </TouchableOpacity>

      <BottomSheet
          bottomSheerColor="#FFFFFF"
          initialPosition={'10%'}
          snapPoints={snapPoints}
          isBackDrop={true}
          isBackDropDismissByPress={true}
          isRoundBorderWithTipHeader={true}
          containerStyle={{ backgroundColor: "white" }}
          body={
            <View>
              <Text>List items here</Text>
            </View>
          }
      />
    </SafeAreaView>
  );
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
  },
  modal: {
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
  }
  
});