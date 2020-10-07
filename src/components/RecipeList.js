import React, { useState } from 'react'
import { Pagination } from 'semantic-ui-react'
import RecipeListItem from './RecipeListItem'
import useRecipes from '../hooks/useRecipes'
import useFilteredRecipes from '../hooks/useFilteredRecipes'

export const RecipeList = (props) => {
    const [activePage, setActivePage] = useState(1);
    const recipes = useRecipes(activePage)
    // const recipes = useFilteredRecipes()

    console.log(activePage)

    const onPageChange = (e, data) => {
        setActivePage(data.activePage)
    }

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
                <Pagination
                    activePage={activePage}
                    onPageChange={onPageChange}
                    totalPages={10}
                />
            </div>
        </div>
    )
}

export default RecipeList