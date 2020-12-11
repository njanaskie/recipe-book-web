import React, { useContext, useEffect } from 'react'
import _ from 'lodash'
import { List } from 'semantic-ui-react'
import IngredientListItem from './IngredientListItem'
import { useIngredientsContext } from '../../context/ingredients-context'

export const IngredientsList = (props) => {
    const { ingredients } = useIngredientsContext()

    return (
        <div className="content-container">
            <List divided verticalAlign='middle'>
                {
                    ingredients ? (
                        ingredients.map((ingredient, id) => (
                                <IngredientListItem
                                    key={id}
                                    ingredient={ingredient}
                                />
                        ))
                    ) : (
                        <div>
                            <span>No ingredients</span>
                        </div>
                    )
                }
            </List>
        </div>
    )
}

export { IngredientsList as default }