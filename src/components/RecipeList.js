import React, { useState } from 'react'
import { Pagination } from 'semantic-ui-react'
import RecipeListItem from './RecipeListItem'
import { useFiltersContext } from '../context/filters-context'
import { config } from '../config/config'
import selectRecipes from '../selectors/recipes'
import { useRecipesContext } from '../context/recipes-context'

export const RecipeList = () => {
    const initialFormState = {
        activePage: 1,
    }
    const [pageState, setPageState] = useState(initialFormState)
    const { filters } = useFiltersContext()
    const { recipes } = useRecipesContext()
    const startIndex = (pageState.activePage * config.itemsPerPage) - config.itemsPerPage
    const endIndex = startIndex + config.itemsPerPage
    const selectedRecipes = selectRecipes(recipes, filters)
    const paginatedItems = selectedRecipes && selectedRecipes.slice(startIndex, endIndex)

    const handlePageChange = (e, { activePage }) => setPageState({ activePage })

    if (!selectedRecipes || !selectedRecipes.length) {
        return <div className='content-container'><span className="list-item--message">No recipes</span></div>
    }

    const tableItems = paginatedItems.map((recipe) => {
        return (
            <RecipeListItem key={recipe.id} recipe={recipe} />
        )
    })
    
    return (
        <div className="content-container">
                <div className='recipe-table'>
                    {tableItems}
                </div>
                <div className='list-pagination'>
                    <Pagination
                        activePage={pageState.activePage}
                        onPageChange={handlePageChange}
                        totalPages={Math.ceil(selectedRecipes.length / config.itemsPerPage)}
                    />
                </div>
        </div>
    )
}

export default RecipeList