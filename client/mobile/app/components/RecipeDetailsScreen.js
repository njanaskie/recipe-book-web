import React, { useState } from 'react'
import { Dimensions, StyleSheet, Image, Text, TextInput, TouchableOpacity, View, Button, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/firebase';
import { colorPack } from '../styles/styles';

const { width, height } = Dimensions.get("window");

export default function RecipeDetailsScreen ({ recipe, urlData, closeModal }) {
    
    return (
        <View style={styles.container}>
            <Image source={{ uri: urlData.image }} style={styles.image} />
            {recipe.ingredients && recipe.ingredients.map(ingredient => <Text>{ingredient}</Text>)}
            <Text>{recipe.cuisine}</Text>
            <Text>{recipe.type}</Text>
            <Button title='Exit' onPress={closeModal}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorPack.backgroundColor,
        height: height
    },
    image: {
        // flex: 1,
        // marginTop: 90,
        height: 400,
        width: width,
        alignSelf: 'center',
        opacity: .8
    }
})