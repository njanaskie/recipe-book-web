import React, { useEffect, useState, useRef } from 'react'
import RecipeListItem from './RecipeListItem'
// import { useFiltersContext } from '../context/filters-context'
import { config } from '../config/config'
// import selectRecipes from '../selectors/recipes'
import { useRecipesContext } from '../context/recipes-context'
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import useAllRecipes from '../hooks/useAllRecipes'
import { getRecipesService } from '../services/recipeServices'


export const RecipeList = () => {
    const initialFormState = {
        itemsPerPage: 4,
        isListEnd: false,
        page: 1,
        loading: true,
        loadingMore: false,
        error: null
    }
    const [pageState, setPageState] = useState(initialFormState)
    // const { filters } = useFiltersContext()
    const { recipes, recipeDispatch } = useRecipesContext()
    const isCurrent = useRef(true)
    // const startIndex = (pageState.activePage * config.itemsPerPage) - config.itemsPerPage
    // const endIndex = startIndex + config.itemsPerPage
    // const selectedRecipes = selectRecipes(recipes, filters)
    // const paginatedItems = selectedRecipes && selectedRecipes.slice(startIndex, endIndex)
    // React.useEffect(() => {
    //     return () => {
    //         isCurrent.current = false
    //     }
    // }, []) 

    console.log('pageState', pageState)

    React.useEffect(() => {
        fetchRecipes()
    }, [pageState.page])

    fetchRecipes = async () => {
        // if (isCurrent.current) {
            const fetchedRecipes = await getRecipesService(pageState.page, pageState.itemsPerPage)
            if (fetchedRecipes.length > 0) {
                recipeDispatch({
                    type: 'SET_RECIPES',
                    recipes: pageState.page === 1
                        ? fetchedRecipes
                        : [...recipes, ...fetchedRecipes]
                })
                setPageState((prevState, nextProps) => ({
                    ...pageState,
                    loading: false,
                    loadingMore: false,
                }))
            } else {
                setPageState(() => ({
                    ...pageState,
                    isListEnd: true
                }))
            }
        // }
    }

    handleLoadMore = () => {
       console.log('load more')
       setPageState((prevState, nextProps) => ({
            ...pageState,
            page: prevState.page + 1,
            loadingMore: true
        }))
    }

    renderFooter = () => {
        if (!pageState.loadingMore) return null;
    
        return (
          <View
            style={{
              position: 'relative',
            //   width: width,
            //   height: height,
              paddingVertical: 20,
              borderTopWidth: 1,
              marginTop: 10,
              marginBottom: 10,
            //   borderColor: colors.veryLightPink
            }}
          >
            <ActivityIndicator animating size="large" />
          </View>
        );
      };

    if (!recipes || !recipes.length) {
        return <Text>No recipes</Text>
    }
    
    return (
        <FlatList 
            data={recipes}
            renderItem={({ item }) => <RecipeListItem recipe={item} />}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={styles.containter}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            // ListFooterComponent={renderFooter}
        />
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