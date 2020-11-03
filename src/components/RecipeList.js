import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Pagination } from 'semantic-ui-react'
import RecipeListPagination from './RecipeListPagination'
import RecipeListItem from './RecipeListItem'
import useRecipes from '../hooks/useRecipes'
import useNextRecipe from '../hooks/useNextRecipe'
import useFilteredRecipes from '../hooks/useFilteredRecipes'
import { useFiltersContext } from '../../context/filters-context'
import useAllRecipes from '../hooks/useAllRecipes'
import { config } from '../../config'
import selectRecipes from '../selectors/recipes'

export const RecipeList = (props) => {
    const initialFormState = {
        activePage: 1,
        // isNextPage: false,
        // isPreviousPage: false,
        // isNextButtonDisabled: false,
        // isPreviousButtonDisabled: false,
    }
    const [pageState, setPageState] = useState(initialFormState)
    const { filters } = useFiltersContext()
    // const results = useRecipes(pageState)
    // const nextResult = useNextRecipe(results)
    const results = useAllRecipes()
    const startIndex = (pageState.activePage * config.itemsPerPage) - config.itemsPerPage
    const endIndex = startIndex + config.itemsPerPage
    const selectedRecipes = selectRecipes(results.recipes, filters)
    const paginatedItems = selectedRecipes && selectedRecipes.slice(startIndex, endIndex)

    console.log(pageState.activePage)
    console.log(startIndex)
    console.log(endIndex)
    console.log(selectedRecipes)

    // if (results.lastVisible && results.nextHidden) {
    //     console.log(results.lastVisible.id)
    //     console.log(results.nextHidden.id)
    // }

    // React.useEffect(() => {
    //     if (pageState.isNextPage === true && pageState.activePage === 3) {
    //         setPageState({ ...pageState, isNextButtonDisabled: true })
    //     }
    // }, [])

    // React.useEffect(() => {
    //     if (pageState.activePage === 1) {
    //         setPageState({ ...pageState, isPreviousButtonDisabled: true })
    //     } 
    //     // else if (pageState.isNextPage === true && results.count < config.itemsFetched) {
    //     //     setPageState({ ...pageState, isNextButtonDisabled: true })
    //     //     console.log(pageState)
    //     //     console.log(results)
    //     // }
    // }, [pageState.activePage])
    
    // const onNextPage = () => {
    //     setPageState(prevState => ({
    //         activePage: prevState.activePage+1,
    //         isNextPage: true,
    //         isPreviousPage: false 
    //     }))
    // }

    // const onPreviousPage = () => {
    //     setPageState(prevState => ({
    //         activePage: prevState.activePage-1,
    //         isNextPage: false,
    //         isPreviousPage: true
    //     }))
    // }

    const handlePageChange = (e, { activePage }) => setPageState({ activePage })

    if (!selectedRecipes || !selectedRecipes.length) {
        return <div className='content-container'><span className="list-item--message">No recipes</span></div>
    }

    const tableItems = paginatedItems.map((recipe) => {
        return (
            <RecipeListItem key={recipe.id} recipe={recipe} />
        )
    })


//     <RecipeListPagination
//     activePage={pageState.activePage}
//     onNextPage={onNextPage}
//     onPreviousPage={onPreviousPage}
//     isNextButtonDisabled={pageState.isNextButtonDisabled}
//     isPreviousButtonDisabled={pageState.isPreviousButtonDisabled}
//     // totalPages={10}
// />
    
    return (
        <div className="content-container">
                <div className='dish-table'>
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