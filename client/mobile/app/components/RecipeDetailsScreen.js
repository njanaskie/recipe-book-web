import React, { useState } from 'react'
import { Dimensions, StyleSheet, Image, Text, TextInput, TouchableOpacity, View, SafeAreaView, FlatList, Linking } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/firebase';
import { colorPack } from '../styles/styles';
import Tag from './Tag'
import { Divider, Title, Subheading, Button } from 'react-native-paper';
import { Feather } from "@expo/vector-icons";
import EditRecipe from './EditRecipe';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import { LinkPreview } from '@flyerhq/react-native-link-preview';

const { width, height } = Dimensions.get("window");

export default function RecipeDetailsScreen ({ recipe, urlData, closeModal }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const topLevelTags = [recipe.type, recipe.cuisine].concat(recipe.customTags);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
      };

    const closeEditModal = () => {
        setIsModalVisible(false);
    };

    const renderItem = ({item}) => (
        // <View style={{marginRight: 10}}>
            <Tag item={item}/>
        // </View>
    )

    return (
        <View style={styles.container}>
            <Image source={{ uri: urlData.image }} style={styles.image}/>
            <LinearGradient colors={['white', colorPack.backgroundColor]} style={styles.linearGradient}/>
            <Title style={styles.title} numberOfLines={2}>{urlData.title}</Title>
            {/* <Divider /> */}
            <View >
                {/* <Subheading style={styles.subTitle}>Tags</Subheading> */}
                {/* <View> */}
                    <FlatList
                        horizontal
                        data={topLevelTags}
                        renderItem={({item}) => (
                            <Text style={{ color: colorPack.darkgrey, }}>{item}</Text>
                        )}
                        keyExtractor={item => item}
                        contentContainerStyle={styles.topLevelTags}
                        ItemSeparatorComponent={() => <Text> • </Text>}
                        ListEmptyComponent={<Text style={styles.emptyMessage}>No Tags</Text>}
                    />
                {/* </View> */}
            </View>
            {/* <Divider /> */}
            <Subheading style={styles.subTitle}>Ingredients</Subheading>
            <View>
                <FlatList
                    horizontal
                    data={recipe.ingredients}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                    style={styles.ingredients}
                    ListFooterComponent={<View style={{width:15}}></View>}
                    ListEmptyComponent={<Text style={styles.emptyMessage}>No Ingredients</Text>}
                />
            </View>
            {/* <Divider /> */}
            <Button icon='open-in-new' mode='outlined' color='white' style={styles.link} onPress={() => Linking.openURL(recipe.url)}>Go To Recipe</Button>
            <View style={styles.topLeftButton}>
                <Feather name="x" size={24} color={colorPack.darkgrey} onPress={closeModal}/>
            </View>
            <View style={styles.topRightButton}>
                <Feather name="edit" size={24} color={colorPack.darkgrey} onPress={toggleModal}/>
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
        height: height,
    },
    image: {
        // flex: 1,
        // marginTop: 90,
        height: 400,
        width: width,
        alignSelf: 'center',
        // opacity: .8,
    },
    imageContainer: {
        shadowColor: 'white',
        shadowOffset: {width: 0, height: 8},
        shadowRadius: 10,
        shadowOpacity: 8,
        // elevation: 16
    },
    linearGradient: {
        width,
        height: 30,
        // top: -10,
    },
    topLevelTags: {
        bottom: 10,
        paddingBottom: 0,
        padding: 10,
        marginRight: 10
    },
    ingredients: {
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    title: {
        paddingTop: 10,
        // paddingBottom: -10,
        color: colorPack.darkgrey,
        fontWeight: 'bold',
        paddingHorizontal: 10
    },
    subTitle: {
        color: colorPack.darkgrey,
        paddingLeft: 10,
        paddingTop: 10
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
    },
    link: {
        position: 'absolute',
        bottom: '10%',
        width: '50%',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: colorPack.mint,
        borderColor: colorPack.mint
    },
    emptyMessage: {
        color: colorPack.darkgrey,
        fontSize: 12,
        fontWeight: '200'
    }
})