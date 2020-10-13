import React, { useState } from 'react'
// import { Pagination } from 'semantic-ui-react'
import RecipeListPagination from './RecipeListPagination'
import RecipeListItem from './RecipeListItem'
import useRecipes from '../hooks/useRecipes'
import useNextRecipe from '../hooks/useNextRecipe'
import useFilteredRecipes from '../hooks/useFilteredRecipes'

export const RecipeList = (props) => {
    const initialFormState = {
        activePage: 1,
        isNextPage: false,
        isPreviousPage: false,
        isNextButtonDisabled: false,
        isPreviousButtonDisabled: false,
    }
    const [pageState, setPageState] = useState(initialFormState)
    const results = useRecipes(pageState)
    const nextResult = useNextRecipe(results)
    // const recipes = useFilteredRecipes()

    console.log(nextResult)

    const onNextPage = () => {
        setPageState(prevState => ({activePage: prevState.activePage+1, isNextPage: true, isPreviousPage: false }))
    }

    React.useEffect(() => {
        if (pageState.activePage === 1) {
            setPageState({ ...pageState, isPreviousButtonDisabled: true })
        }
    }, [pageState.activePage])



    const onPreviousPage = () => {
        setPageState(prevState => ({ activePage: prevState.activePage-1, isNextPage: false, isPreviousPage: true }))
    }

    if (!results.recipes || !results.recipes.length) {
        return <div className='content-container'><span className="list-item--message">No recipes</span></div>
    }

    const tableItems = results.recipes && results.recipes.slice(0,2).map((recipe) => {
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
                    isPreviousButtonDisabled={pageState.isPreviousButtonDisabled}
                    // totalPages={10}
                />
            </div>
        </div>
    )
}

export default RecipeList