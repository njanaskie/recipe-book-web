import React, { useContext } from 'react'
import RecipeListItem from './RecipeListItem'
import useRecipes from '../hooks/useRecipes'
import useFilteredRecipes from '../hooks/useFilteredRecipes'

export const RecipeList = (props) => {
    const recipes = useRecipes()
    // const recipes = useFilteredRecipes()

    if (!recipes || !recipes.length) {
        return <div className='content-container'><span className="list-item--message">No recipes</span></div>
    }

    const tableItems = recipes && recipes.map((recipe) => {
        return (
            <RecipeListItem key={recipe.id} recipe={recipe} />
        )
    })
    
    return (
        <div className="content-container">
            <div className='dish-table'>
                {tableItems}
            </div>
        </div>
    )
}

export default RecipeList