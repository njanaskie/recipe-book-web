import React, { useState, useEffect, useContext } from 'react'
import { Input, Dropdown } from 'semantic-ui-react'
import { useFiltersContext } from '../../context/filters-context'
// import { usePantryContext } from '../../../context/pantry-context'
import recipeCuisines from '../fixtures/recipeCuisines'
import recipeTypes from '../fixtures/recipeTypes'
import useIngredients from '../hooks/useIngredients'

export const RecipeListFilters = () => {
    const { filters, filtersDispatch } = useFiltersContext()
    const allIngredients = useIngredients()
    // const { pantryIngredients } = usePantryContext()

    const onTextChange = (e) => {
        filtersDispatch({ type: 'SET_TEXT_FILTER', text: e.target.value })
    }

    const onIngredientChange = (e, result) => {
        const { value } = result || e.target
        filtersDispatch({ type: 'SET_INGREDIENT_FILTER', ingredients: value })
    }

    const onCuisineChange = (e, result) => {
        const { value } = result || e.target
        filtersDispatch({ type: 'SET_CUISINE_FILTER', cuisine: value })
    }

    const onTypeChange = (e, result) => {
        const { value } = result || e.target
        filtersDispatch({ type: 'SET_RECIPE_TYPE_FILTER', recipeType: value })
    }

//     <div className="input-group__input">                
//     <Input
//         placeholder='Search...'
//         size='big'
//         value={filters ? filters.text : ''}
//         onChange={onTextChange}
//         style={{ width:"100%" }}
//     />
// </div>

    return (
        <div className="content-container">
            <div className="input-group">
                <div className="input-group__dropdowns">
                    <div className="input-group__item">
                        <Dropdown
                            placeholder='Select ingredient'
                            name='ingredient'
                            clearable={true}
                            fluid multiple selection
                            multiple={true}
                            value={filters ? filters.ingredients : []}
                            onChange={onIngredientChange}
                            options={allIngredients.map(ingredient => {
                                return {
                                    key: ingredient.id,
                                    text: ingredient.name,
                                    value: ingredient.name
                                }
                            })}
                        />
                    </div>
                    <div className="input-group__item">
                        <Dropdown
                            placeholder='Select cuisine'
                            name='cuisine'
                            clearable={true}
                            fluid selection
                            value={filters ? filters.cuisine : ''}
                            onChange={onCuisineChange}
                            options={recipeCuisines.map(recipeCuisine => {
                                return {
                                    key: recipeCuisine,
                                    text: recipeCuisine,
                                    value: recipeCuisine
                                }
                            })}
                        />
                    </div>
                    <div className="input-group__item">
                        <Dropdown
                            placeholder='Select type'
                            name='recipeType'
                            clearable={true}
                            fluid selection
                            value={filters ? filters.recipeType : ''}
                            onChange={onTypeChange}
                            options={recipeTypes.map(recipeType => {
                                return {
                                    key: recipeType,
                                    text: recipeType,
                                    value: recipeType
                                }
                            })}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeListFilters