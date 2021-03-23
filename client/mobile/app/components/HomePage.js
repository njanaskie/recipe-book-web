// import React from 'react'
// import {
//     StyleSheet,
//     View,
//     SafeAreaView,
//     TouchableOpacity,
//   } from "react-native";
//   import Modal from 'react-native-modal';
// // import RecipeList from './RecipeList'
// // import RecipeListFilters from './RecipeListFilters'
// // import { useRecipesContext } from '../context/recipes-context'
// // import { useIngredientsContext } from '../context/ingredients-context'

// export default function HomePage() {
//     // const { recipes } = useRecipesContext()
//     // const { ingredients } = useIngredientsContext()

//     return (
//         <SafeAreaView style={styles.container}>
//             <View>
//                 <TouchableOpacity
//                     style={{ padding: 20 }}
//                     onPress={toggleModal}
//                 >
//                     <Feather name="plus-circle" size={150} color='#3eb489'/>
//                 </TouchableOpacity>
//                 <Modal
//                     isVisible={isModalVisible}
//                 >
//                     <AddRecipe />
//                 </Modal>
//             </View>
//             <BottomSheet
//                 enabledBottomInitialAnimation={true}
//                 ref={sheetRef}
//                 initialSnap={0}
//                 snapPoints={snapPoints}
//                 // borderRadius={10} 
//                 renderContent={renderContent}
//                 renderHeader={renderHeader}
//             />
//         </SafeAreaView>
//     )

// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     box: {
//       height: 50,
//       width: 50,
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "red",
//     },
//     boxWrapper: {
//       justifyContent: "space-around",
//       alignItems: "center",
//       flexDirection: "row",
//     },
//     body: {
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     text: {
//       fontSize: 18,
//     },
//     text2: {
//       fontSize: 21,
//       fontWeight: "bold",
//     },
//     closeText: {
//       fontSize: 24,
//       color: '#00479e',
//       textAlign: 'center',
//     },
//     modal: {
//       padding: 20,
//       backgroundColor: '#FFFFFF',
//       paddingTop: 20,
//       height: height
//     },
//     header: {
//       backgroundColor: '#FFFFFF',
//       shadowColor: '#333333',
//       shadowOffset: {width: -1, height: -3},
//       shadowRadius: 2,
//       shadowOpacity: 0.4,
//       // elevation: 5,
//       paddingTop: 20,
//       borderTopLeftRadius: 20,
//       borderTopRightRadius: 20,
//     },
//     panelHeader: {
//       alignItems: 'center',
//     },
//     panelHandle: {
//       width: 40,
//       height: 8,
//       borderRadius: 4,
//       backgroundColor: '#00000040',
//       marginBottom: 10,
//     },
    
//   });