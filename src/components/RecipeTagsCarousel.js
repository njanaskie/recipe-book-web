import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import RecipeCarousel from './RecipeCarousel'

const RecipeTagsCarousel = ({ tags }) => {
    return (
        <RecipeCarousel items={tags}>
            {tags &&
                tags.map(tag =>
                    <div key={tag} className='slider-item'>
                        <Label size='medium' circular color='purple'>
                            {tag}
                        </Label>
                    </div>
                )
            }
        </RecipeCarousel>
    )
}

export default RecipeTagsCarousel;