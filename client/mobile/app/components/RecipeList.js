import React, { useState } from 'react'
import RecipeListItem from './RecipeListItem'
// import { useFiltersContext } from '../context/filters-context'
import { config } from '../config/config'
// import selectRecipes from '../selectors/recipes'
import { useRecipesContext } from '../context/recipes-context'
import { FlatList, StyleSheet, Text, View } from 'react-native'


export const RecipeList = () => {
    const initialFormState = {
        activePage: 1,
    }
    const [pageState, setPageState] = useState(initialFormState)
    // const { filters } = useFiltersContext()
    const { recipes } = useRecipesContext()
    // const startIndex = (pageState.activePage * config.itemsPerPage) - config.itemsPerPage
    // const endIndex = startIndex + config.itemsPerPage
    // const selectedRecipes = selectRecipes(recipes, filters)
    // const paginatedItems = selectedRecipes && selectedRecipes.slice(startIndex, endIndex)

    // const handlePageChange = (e, { activePage }) => setPageState({ activePage })

    if (!recipes || !recipes.length) {
        return <Text>No recipes</Text>
    }

    const tableItems = recipes.map((recipe) => {
        return (
            <RecipeListItem key={recipe.id} recipe={recipe} />
        )
    })
    
    return (
        // <View>
        //     {tableItems}
        // </View>
        // <View style={styles.containter}>
            <FlatList 
                data={recipes}
                renderItem={({ item }) => <RecipeListItem recipe={item} />}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={styles.containter}
            />
        // </View>
    )
}

const styles = StyleSheet.create({
    containter: {
        // justifyContent: 'center',
        // alignItems: 'center',
        marginRight: 10,
        marginLeft: 10,
        // flex: 1,
        // flexGrow: 0,
        // minHeight: 100,
    },
})

export default RecipeList