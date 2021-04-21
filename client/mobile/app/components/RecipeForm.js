import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    SafeAreaView,
    Button,
    Dimensions,
    Platform,
    TouchableOpacity,
    FlatList,
    StatusBar,
    Text,
    TextInput
    } from "react-native";
import { useFirebaseContext } from '../context/firebase-context'
import recipeTypes from '../fixtures/recipeTypes'
import recipeCuisines from '../fixtures/recipeCuisines'
import selectCustomTags from '../selectors/custom-tags'
import { useIngredientsContext } from '../context/ingredients-context'
import { useRecipesContext } from '../context/recipes-context'
// import { TextInput } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MultiSelect from 'react-native-multiple-select';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import { Feather } from "@expo/vector-icons";
import { Divider, Title, Subheading } from 'react-native-paper';
import MultiSelectForm from './MultiSelectForm';
import { colorPack } from '../styles/styles';
import Clipboard, { useClipboard } from '@react-native-clipboard/clipboard';
import Tag from './Tag';
import {Picker} from '@react-native-picker/picker';

const { width, height } = Dimensions.get("window");

export default RecipeForm = (props) => {
    const { isGuest, user } = useFirebaseContext()
    const { recipes } = useRecipesContext()
    const formResults = props.results ? props.results : recipes
    const initialFormState = {
        url: '',
        ingredients: [],
        type: '',
        cuisine: '',
        // createdAt: '',
        customTags: [],
        savedBy: '',
        error: '',
        customTagOptions: []
    }
    const [state, setState] = useState(initialFormState)
    const { ingredients } = useIngredientsContext()
    const allCustomTags = formResults ? selectCustomTags(formResults) : []
    const uid = user.uid
    const [isTagModalVisible, setIsTagModalVisible] = useState(false);
    const [isIngredientModalVisible, setIsIngredientTagModalVisible] = useState(false);
    const [copiedText, setCopiedText] = useState('');
    const [data, setString] = useClipboard();

    // useEffect(() => {
    //     setString('hello world');
    //   }, []);

    // const copyToClipboard = () => {
    //   Clipboard.setString('hello world');
    // };
  
    // const fetchCopiedText = async () => {
    //   const text = await Clipboard.getString();
    //   setCopiedText(text);
    // };

    // console.log('copied', copiedText)
    console.log(state)
    
    const toggleTagModal = () => {
        setIsTagModalVisible(!isTagModalVisible);
      };
    
    const toggleIngredientModal = () => {
        setIsIngredientTagModalVisible(!isIngredientModalVisible);
    };

    useEffect(() => {
        setState({
            url: props.url || 'https://www.youtube.com/watch?v=6GHPxpQcn_o',
            ingredients: props.ingredients || [],
            type: props.type || '',
            cuisine: props.cuisine || '',
            // createdAt: moment(props.createdAt) || moment(),
            savedBy: props.savedBy || uid,
            customTags: props.customTags || [],
            customTagOptions: props.customTagOptions || allCustomTags,
            error: '',
        })
    }, [props])

    const onSubmit = (e) => {
        e.preventDefault()

        const recipe = {
            url: state.url,
            ingredients: state.ingredients,
            type: state.type.toLocaleString(),
            cuisine: state.cuisine.toLocaleString(),
            // createdAt: state.createdAt.valueOf(),
            customTags: state.customTags,
            savedBy: state.savedBy
        }

        if (!state.url) {
            setState({ ...state, error: 'Please provide recipe URL' })
        } else {
            props.onSubmit(recipe)
            setState(initialFormState)
        }
    }

    const onAddCustomTag = (newItem) => {
        // console.log(newItem, 'vs', state.customTagOptions)
        if (newItem.every(tag => state.customTagOptions.includes(tag))) {
            // console.log('1')
            setState({ ...state, customTags: newItem })
        } else {
            // console.log('2')
            setState((prevState) => ({
                ...state,
                customTagOptions: [...prevState.customTagOptions, newItem[newItem.length - 1]]
            }))
        }
    }

    clearSelectedTypes = () => {
        _multiSelectType._removeAllItems();
    };

    clearSelectedCuisines = () => {
        _multiSelectCuisine._removeAllItems();
     };

    const renderItem = ({item}) => (
        <Tag item={item} />
    )

    return (
        <SafeAreaView style={styles.container} onSubmit={onSubmit}>
            <Title style={styles.title}>I want to save...</Title>
            {/* <Text>{data}</Text>
            <View >
                <TouchableOpacity onPress={copyToClipboard}>
                    <Text>Click here to copy to Clipboard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={fetchCopiedText}>
                    <Text>View copied text</Text>
                </TouchableOpacity>

                <Text>{copiedText}</Text>
            </View> */}
            <Text style={styles.subtitle}>Copy the recipe URL link into the text bar</Text>
            <TextInput
                style={styles.input}
                placeholder='Insert URL'
                // placeholderTextColor="#aaaaaa"
                onChangeText={(url) => setState({ ...state, url })}
                value={state.url}
                // underlineColorAndroid="transparent"
                // autoCapitalize="none"
            />
            <View style={styles.subtitleGroup}>
                <Text style={styles.subtitle}>Add the type of recipe</Text>
                <TouchableOpacity onPress={clearSelectedTypes}>
                    <Text style={styles.clearButton} >Clear selection</Text>
                </TouchableOpacity>
            </View>
            <Picker 
                onValueChange={value => setState({ ...state, type: value })}
                selectedValue={state.type}
                style={styles.picker}
                itemStyle={styles.pickerItem}
            >
                {recipeTypes.map(recipeType => {
                    return (
                        <Picker.Item label={recipeType} value={recipeType} />
                    )
                })}
            </Picker>
            {/* <MultiSelect
                single
                items={recipeTypes.map(recipeType => {
                    return {
                        id: recipeType,
                        name: recipeType
                    }
                })}
                ref={c => _multiSelectType = c}
                uniqueKey="id"
                onSelectedItemsChange={(selectedItems) => setState({ ...state, type: selectedItems })}
                selectedItems={state.type}
                selectText="Select Type"
                // searchInputPlaceholderText="Search Type"
                tagRemoveIconColor="#3eb489"
                tagBorderColor="#3eb489"
                tagTextColor="#3eb489"
                selectedItemTextColor="#3eb489"
                selectedItemIconColor="#3eb489"
                // displayKey="name"
                styleMainWrapper={styles.multiSelectContainer, { marginLeft: 20, marginRight: 20 }}
                styleInputGroup={styles.multiSelectInputGroup}
                searchInputStyle={styles.multiSelectSearchInputStyle}
                styleDropdownMenu={styles.multiSelectDropdownMenu}
                styleSelectorContainer={styles.multiSelectSelector}
                styleTextDropdown={styles.multiSelectTextDropdown}
                hideSubmitButton={true}
                textInputProps={{ editable: false, autoFocus: false, }}
                searchIcon={false}
                hideDropdown={true}
                fixedHeight
                submitButtonColor="#3eb489"
            /> */}
                <View style={styles.subtitleGroup}>
                    <Text style={styles.subtitle}>Add the recipe cuisine</Text>
                    <TouchableOpacity onPress={clearSelectedCuisines}>
                        <Text style={styles.clearButton} >Clear selection</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={{ height: 20}}> */}
                    <Picker 
                        onValueChange={value => setState({ ...state, cuisine: value })}
                        selectedValue={state.cuisine}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                    >
                        {recipeCuisines.map(recipeCuisine => {
                            return (
                                <Picker.Item label={recipeCuisine} value={recipeCuisine} />
                            )
                        })}
                    </Picker>

                {/* </View> */}
                {/* <MultiSelect
                    single
                    items={recipeCuisines.map(recipeCuisine => {
                        return {
                            id: recipeCuisine,
                            name: recipeCuisine
                        }
                    })}
                    ref={c => _multiSelectCuisine = c}
                    uniqueKey="id"
                    onSelectedItemsChange={(selectedItems) => setState({ ...state, cuisine: selectedItems })}
                    selectedItems={state.cuisine}
                    selectText="Select Cuisine"
                    // searchInputPlaceholderText="Search Cuisine"
                    tagRemoveIconColor="#3eb489"
                    tagBorderColor="#3eb489"
                    tagTextColor="#3eb489"
                    selectedItemTextColor="#3eb489"
                    selectedItemIconColor="#3eb489"
                    // displayKey="name"
                    styleMainWrapper={styles.multiSelectContainer, { marginLeft: 20, marginRight: 20 }}
                    styleInputGroup={styles.multiSelectInputGroup}
                    searchInputStyle={styles.multiSelectSearchInputStyle}
                    styleDropdownMenu={styles.multiSelectDropdownMenu}
                    styleSelectorContainer={styles.multiSelectSelector}
                    styleTextDropdown={styles.multiSelectTextDropdown}
                    hideSubmitButton={true}
                    textInputProps={{ editable: false, autoFocus: false, }}
                    searchIcon={false}
                    hideDropdown={true}
                    fixedHeight
                    submitButtonColor="#3eb489"
                /> */}
            <Text style={styles.subtitle}>Add all or some of the ingredients used in the recipe. This can be used to search for recipes in the future.</Text>
            <Button title='Add ingredients' onPress={toggleIngredientModal}/>
            <Modal
                isVisible={isIngredientModalVisible}
                onBackdropPress={toggleIngredientModal}
                style={styles.modal}
            >
                <View style={styles.header}>
                    <View style={styles.panelHeader}>
                        <Text style={styles.panelText}>Add Ingredients...</Text>
                        <Button title='Done' onPress={toggleIngredientModal}/>
                    </View>
                </View>
                <View style={styles.modalView}>
                    <MultiSelect
                        items={ingredients || []}
                        uniqueKey="name"
                        onSelectedItemsChange={(selectedItems) => setState({ ...state, ingredients: selectedItems })}
                        selectedItems={state.ingredients}
                        selectText="Select Ingredients"
                        searchInputPlaceholderText="Search Ingredients..."
                        tagRemoveIconColor="#3eb489"
                        tagBorderColor="#3eb489"
                        tagTextColor="#3eb489"
                        selectedItemTextColor="#3eb489"
                        selectedItemIconColor="#3eb489"
                        styleMainWrapper={styles.multiSelectContainer}
                        styleInputGroup={styles.multiSelectInputGroup}
                        searchInputStyle={styles.multiSelectSearchInputStyle}
                        styleTextDropdown={styles.multiSelectTextDropdown}
                        styleListContainer={{ height: 680 }}
                        hideDropdown={true}
                        textInputProps={{ autoFocus: false }}
                        fixedHeight
                        submitButtonColor="#3eb489"
                    />
                </View>
            </Modal>
            <View>
                <FlatList
                    horizontal
                    data={state.ingredients}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                />
            </View>
            <Text style={styles.subtitle}>Add your own tags to categorize recipes however you want</Text>
            <Button title='Add tags' onPress={toggleTagModal}/>
            <Modal
                isVisible={isTagModalVisible}
                onBackdropPress={toggleTagModal}
                style={styles.modal}
            >
                <View style={styles.header}>
                    <View style={styles.panelHeader}>
                        <Text style={styles.panelText}>Add Tags...</Text>
                        <Button title='Done' onPress={toggleTagModal}/>
                    </View>
                </View>
                <View style={styles.modalView}>
                    <MultiSelect
                        items={state.customTagOptions.map(option => {
                            return {
                                id: option,
                                name: option
                            }
                        })}
                        uniqueKey="id"
                        onSelectedItemsChange={onAddCustomTag}
                        selectedItems={state.customTags}
                        canAddItems={true}
                        // onAddItem={(newItem) => setState({ ...state, customTagOptions: newItem })}
                        selectText="Select Custom Tags"
                        searchInputPlaceholderText="Search Custom Tags..."
                        tagRemoveIconColor="#3eb489"
                        tagBorderColor="#3eb489"
                        tagTextColor="#3eb489"
                        selectedItemTextColor="#3eb489"
                        selectedItemIconColor="#3eb489"
                        styleMainWrapper={styles.multiSelectContainer}
                        styleInputGroup={styles.multiSelectInputGroup}
                        searchInputStyle={styles.multiSelectSearchInputStyle}
                        styleTextDropdown={styles.multiSelectTextDropdown}
                        styleListContainer={{ height: 680 }}
                        hideDropdown={true}
                        textInputProps={{ autoFocus: false }}
                        fixedHeight
                        submitButtonColor="#3eb489"
                    />
                </View>
            </Modal>
            <View>
                <FlatList
                    horizontal
                    data={state.customTags}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                />
            </View>
            <Button onPress={onSubmit} title='Submit' />
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
        // backgroundColor: 'black'
    },
    clearButton: {
        flex: 3,
        fontSize: 12,
        color: 'darkgrey',
        marginRight: 16,
        marginTop: 10
    },
    title: {
        alignSelf: 'center'
    },
    line: {
        alignSelf: 'center',
        borderBottomColor: '#101010',
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingTop: 60,
        width: '80%'
    },
    logo: {
        flex: 1,
        height: 120,
        width: 120,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        // marginBottom: 30,
        marginRight: 20,
        marginLeft: 20,
        paddingLeft: 16,
    },
    modal: {
        margin: 0,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 35,
    },
    modalView: {
        flex: 1,
        backgroundColor: colorPack.backgroundColor,
        // borderRadius: 5,
        paddingTop: 10
        // // alignItems: 'center',
        // justifyContent: 'center'
    },
    closeText: {
        fontSize: 24,
        color: '#00479e',
        textAlign: 'center',
    },
    multiSelectContainer: {
        // borderRadius: 5,
        // overflow: 'hidden',
        // backgroundColor: 'black',
        // marginBottom: 30,
        paddingRight: 10,
        paddingLeft: 10,
        // paddingTop: 10,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    multiSelectInputGroup: {
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 10,
        justifyContent: 'center',
        height: 40,
        // backgroundColor: 'orange',
    },
    multiSelectDropdownMenu: {
        justifyContent: 'center',
        // alignItems: 'center',
        // marginRight: 16,
        // marginLeft: 16,
        marginTop: 10,
        marginBottom: 10,
    },
    multiSelectSelector: {
        justifyContent: 'center',
        marginRight: 16,
        marginLeft: 16,
        marginTop: 16,
    },
    multiSelectSearchInputStyle: {
        // fontSize: 16,
        // lineHeight: 16,
    },
    multiSelectTextDropdown: {
        // fontSize: 16,
        // lineHeight: 16,
        // paddingLeft: 8,
    },
    selectedItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingTop: 3,
        paddingRight: 3,
        paddingBottom: 3,
        margin: 3,
        borderRadius: 20,
        borderWidth: 2,
    },
    subtitle: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10
    },
    subtitleGroup: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10
    },    
    header: {
        backgroundColor: colorPack.backgroundColor,
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10
    },
    panelText: {
        marginLeft: 10,
        fontSize: 18
    },
    picker: {
        paddingRight: 10,
        paddingLeft: 10,
        height: 100
    },
    pickerItem: {
        fontSize: 18,
        height: 120
    }
})