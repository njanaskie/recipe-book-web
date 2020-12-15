import React  from 'react'
import { List } from 'semantic-ui-react'
import IngredientListItem from './IngredientListItem'
import { useIngredientsContext } from '../../context/ingredients-context'
import selectIngredients from '../selectors/ingredients'

export const IngredientsList = () => {
    const { ingredients } = useIngredientsContext()
    const selectedIngredients = selectIngredients(ingredients)

    return (
        <div className="content-container">
            <List divided verticalAlign='middle'>
                {
                    selectedIngredients ? (
                        selectedIngredients.map((ingredient, id) => (
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