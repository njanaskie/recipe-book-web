import React, { useState } from 'react'
// import { Pagination } from 'semantic-ui-react'
import RecipeListPagination from './RecipeListPagination'
import RecipeListItem from './RecipeListItem'
import useRecipes from '../hooks/useRecipes'
import useFilteredRecipes from '../hooks/useFilteredRecipes'

export const RecipeList = (props) => {
    const initialFormState = {
        activePage: 1,
        isNextPage: false,
        isPreviousPage: false
    }
    const [pageState, setPageState] = useState(initialFormState)
    const recipes = useRecipes(pageState)
    // const recipes = useFilteredRecipes()

    // console.log(activePage)

    const onNextPage = () => {
        setPageState(prevState => ({activePage: prevState.activePage+1, isNextPage: true, isPreviousPage: false }))
    }

    const onPreviousPage = () => {
        setPageState(prevState => ({ activePage: prevState.activePage-1, isNextPage: false, isPreviousPage: true }))
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
                <RecipeListPagination
                    activePage={pageState.activePage}
                    onNextPage={onNextPage}
                    onPreviousPage={onPreviousPage}
                    // totalPages={10}
                />
            </div>
        </div>
    )
}

export default RecipeList