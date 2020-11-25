import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import RecipeCarousel from './RecipeCarousel'

const RecipeIngredientsCarousel = ({ ingredients }) => (
    <RecipeCarousel items={ingredients}>
        {ingredients &&
            ingredients.map(ingredient =>
                <div key={ingredient} className='slider-item'>
                    <Label size='tiny'>
                        {ingredient}
                    </Label>
                </div>
            )
        }
    </RecipeCarousel>
)

export default RecipeIngredientsCarousel;