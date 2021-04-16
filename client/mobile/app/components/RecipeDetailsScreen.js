import React, { useState } from 'react'
import { Dimensions, StyleSheet, Image, Text, TextInput, TouchableOpacity, View, Button, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/firebase';
import { colorPack } from '../styles/styles';
import Tag from './Tag'
import { Divider, Title, Subheading } from 'react-native-paper';
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function RecipeDetailsScreen ({ recipe, urlData, closeModal }) {
    
    return (
        <View style={styles.container}>
            <Image source={{ uri: urlData.image }} style={styles.image} />
            <Title style={styles.title}>Tags</Title>
            <View style={styles.basicTags}>
                <Tag item={recipe.cuisine} />
                <Tag item={recipe.type} />
            </View>
            <Title style={styles.title}>Ingredients</Title>
            {recipe.ingredients && recipe.ingredients.map(ingredient => <Tag item={ingredient} />)}
            <View style={styles.topLeftButton}>
                <AntDesign name="close" size={30} color={colorPack.darkgrey} onPress={closeModal}/>
            </View>
            <View style={styles.topRightButton}>
                <AntDesign name="edit" size={30} color={colorPack.darkgrey} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorPack.backgroundColor,
        flex: 1,
        height: height
    },
    image: {
        // flex: 1,
        // marginTop: 90,
        height: 400,
        width: width,
        alignSelf: 'center',
        opacity: .8
    },
    basicTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10
    },
    title: {
        paddingTop: 10,
        paddingLeft: 10,
        color: colorPack.darkgrey
    },
    topLeftButton: {
        position: 'absolute',
        bottom: '88%',
        left: 15,
        backgroundColor: 'white',
        borderRadius: 50 / 2,
        height: 50, 
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topRightButton: {
        position: 'absolute',
        bottom: '88%',
        right: 15,
        backgroundColor: 'white',
        borderRadius: 50 / 2,
        height: 50, 
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
})