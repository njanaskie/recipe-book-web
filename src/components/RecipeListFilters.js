import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { useFiltersContext } from '../../context/filters-context'
import recipeCuisines from '../fixtures/recipeCuisines'
import recipeTypes from '../fixtures/recipeTypes'
import selectCustomTags from '../selectors/custom-tags'
import { useRecipesContext } from '../../context/recipes-context'

export const RecipeListFilters = ({ allIngredients }) => {
    const { filters, filtersDispatch } = useFiltersContext()
    const { recipes } = useRecipesContext()
    const allCustomTags = selectCustomTags(recipes)
    
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

    const onCustomTagChange = (e, result) => {
        const { value } = result || e.target
        filtersDispatch({ type: 'SET_CUSTOM_TAG_FILTER', customTags: value })
    }

    return (
        <div className="content-container">
            <div className="input-group">
                <div className="input-group__dropdowns">
                    <div className="input-group__item">
                        <Dropdown
                            placeholder='Select ingredient'
                            name='ingredient'
                            clearable={true}
                            multiple search selection
                            multiple={true}
                            value={filters ? filters.ingredients.sort((a,b) => a.localeCompare(b)) : []}
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
                    <div className="input-group__item">
                        <Dropdown
                            placeholder='Select custom tag'
                            name='customTag'
                            clearable={true}
                            multiple search selection
                            multiple={true}
                            value={filters ? filters.customTags.sort((a,b) => a.localeCompare(b)) : []}
                            onChange={onCustomTagChange}
                            // options={[]}
                            options={allCustomTags.map(tag => {
                                return {
                                    key: tag,
                                    text: tag,
                                    value: tag.toLocaleString()
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