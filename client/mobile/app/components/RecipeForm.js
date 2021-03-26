import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    } from "react-native";
import { useFirebaseContext } from '../context/firebase-context'
import recipeTypes from '../fixtures/recipeTypes'
import recipeCuisines from '../fixtures/recipeCuisines'
import selectCustomTags from '../selectors/custom-tags'
import { useIngredientsContext } from '../context/ingredients-context'
import { useRecipesContext } from '../context/recipes-context'
import { TextInput } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MultiSelect from 'react-native-multiple-select';

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
    const allCustomTags = selectCustomTags(formResults)
    const uid = user.uid
    
    useEffect(() => {
        setState({
            url: props.url || '',
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
            type: state.type,
            cuisine: state.cuisine,
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

    const onURLChange = (e) => {
        const url = e.target.value
        if (url) {
            setState({ ...state, url })
        }
    }

    const onIngredientChange = (e, result) => {
        const { value } = result || e.target
        setState({ ...state, ingredients: value })
    }

    const onTypeChange = (e, result) => {
        const { value } = result || e.target
        setState({ ...state, type: value })
    }

    const onCuisineChange = (e, result) => {
        const { value } = result || e.target
        setState({ ...state, cuisine: value })
    }

    const onCustomTagChange = (e, result) => {
        const { value } = result || e.target
        setState({ ...state, customTags: value })
    }

    const onAddCustomTag = (e, result) => {
        const { value } = result || e.target
        setState((prevState) => ({
            ...state,
            customTagOptions: [...prevState.customTagOptions, value]
        }))
    }

    return (
        <View onSubmit={onSubmit}>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder='Insert URL'
                placeholderTextColor="#aaaaaa"
                onChangeText={(url) => setState({ ...state, url })}
                value={state.url}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <MultiSelect
                hideTags
                items={ingredients}
                uniqueKey="id"
                // ref={(component) => { this.multiSelect = component }}
                onSelectedItemsChange={(selectedItems) => setState({ ...state, ingredients: selectedItems })}
                selectedItems={state.ingredients}
                selectText="Pick Ingredients"
                searchInputPlaceholderText="Search Ingredients..."
                onChangeInput={ (text)=> console.log(text)}
                // altFontFamily="ProximaNova-Light"
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#CCC' }}
                submitButtonColor="#CCC"
                submitButtonText="Submit"
            />
                <Text
                    style={styles.closeText}
                    // onPress={toggleModal}
                >
                    Close Modal
                </Text>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {

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
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    closeText: {
        fontSize: 24,
        color: '#00479e',
        textAlign: 'center',
    }
})