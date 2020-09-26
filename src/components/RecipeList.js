import React, { useContext } from 'react'
import RecipeListItem from './RecipeListItem'
import useRecipes from '../hooks/useRecipes'

export const RecipeList = (props) => {
    const recipes = useRecipes()

    if (!recipes || !recipes.length) {
        return <div><span>No recipes</span></div>
    }

    const tableItems = recipes && recipes.map((recipe) => {
        return (
            <RecipeListItem key={recipe.id} recipe={recipe} />
        )
    }
)
    
    return (
            <div className="content-container">
                <div className='dish-table'>
                    {tableItems}
                </div>
            </div>

    )
}

export default RecipeList