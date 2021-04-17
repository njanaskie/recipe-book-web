import React, { useState } from 'react'
import { Dimensions, StyleSheet, Image, Text, TextInput, TouchableOpacity, View, Button, SafeAreaView, FlatList } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/firebase';
import { colorPack } from '../styles/styles';
import Tag from './Tag'
import { Divider, Title, Subheading } from 'react-native-paper';
import { AntDesign } from "@expo/vector-icons";
import EditRecipe from './EditRecipe';
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get("window");

export default function RecipeDetailsScreen ({ recipe, urlData, closeModal }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const topLevelTags = [recipe.type, recipe.cuisine].concat(recipe.customTags);

    console.log(topLevelTags)

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
      };

    const closeEditModal = () => {
        setIsModalVisible(false);
    };

    const renderItem = ({item}) => (
        <Tag item={item} />
    )

    return (
        <View style={styles.container}>
            <Image source={{ uri: urlData.image }} style={styles.image} />
            <Title style={styles.title}>Tags</Title>
            <View>
                <FlatList
                    horizontal
                    data={topLevelTags}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                    style={styles.tags}
                />
            </View>
            <Title style={styles.title}>Ingredients</Title>
            <View>
                <FlatList
                    horizontal
                    data={recipe.ingredients}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                    style={styles.tags}
                />
            </View>
            <View style={styles.topLeftButton}>
                <AntDesign name="close" size={28} color={colorPack.darkgrey} onPress={closeModal}/>
            </View>
            <View style={styles.topRightButton}>
                <AntDesign name="edit" size={28} color={colorPack.darkgrey} onPress={toggleModal}/>
            </View>
            <Modal
                isVisible={isModalVisible}
                style={{ margin: 0 }}
            >
              <View style={{ flex: 1, backgroundColor: colorPack.backgroundColor, borderRadius: 5 }}>
                <EditRecipe recipe={recipe} closeEditModal={closeEditModal}/>
                <Button title="Hide modal" onPress={toggleModal} />
              </View>
            </Modal>
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
    tags: {
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
        borderRadius: 40 / 2,
        height: 40, 
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topRightButton: {
        position: 'absolute',
        bottom: '88%',
        right: 15,
        backgroundColor: 'white',
        borderRadius: 40 / 2,
        height: 40, 
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    }
})