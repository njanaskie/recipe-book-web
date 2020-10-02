import React from 'react'
import { Link } from 'react-router-dom';
import { ReactTinyLink } from 'react-tiny-link'
import { Button, Label, Segment } from 'semantic-ui-react'
import { useFirebaseContext } from '../../context/firebase-context'
import { useRecipesContext } from '../../context/recipes-context'
import database from '../firebase/firebase'

const RecipeListItem = ({ recipe }) => {
    const { user } = useFirebaseContext()
    const { recipeDispatch } = useRecipesContext()
    const pathname = window.location.pathname

    const removeRecipe = () => {
        database.collection('users').doc(user.uid).collection('recipes').doc(recipe.id).delete().then(() => {
            recipeDispatch({ type: 'REMOVE_RECIPE', id: recipe.id })
        })
    }

    return (
        <div className='recipe-group__list'>
            <div className='recipe-group__top'>
                <div className='recipe-group__link'>
                    <Segment>
                        <ReactTinyLink
                            // cardSize="large"
                            url={recipe.url}
                            width='100%'
                            defaultMedia="/images/image-placeholder.png"
                        >
                            {recipe.url}
                        </ReactTinyLink>
                        <div className='recipe-group__tag-group'>
                            {recipe.cuisine && 
                                <div className='recipe-group__tag-item'>
                                    <Label tag color='teal'>
                                        {recipe.cuisine}
                                    </Label>
                                </div>
                            }
                            {recipe.type && 
                                <div className='recipe-group__tag-item'>
                                    <Label tag color='teal'>
                                        {recipe.type}
                                    </Label>
                                </div>
                            }
                        </div>
                        <div className='recipe-group__ingredient-group'>
                            {recipe.ingredients &&
                                recipe.ingredients.map(ingredient =>
                                    <div className='recipe-group__ingredient-item' key={ingredient}>
                                        <Label size='tiny'>
                                            {ingredient}
                                        </Label>
                                    </div>
                                )
                            }
                        </div>
                    </Segment>
                </div>
            </div>
            <div className='recipe-group__button'>
                <Button as={Link} to={`/edit-recipe/${recipe.id}`} basic icon='edit'></Button>
                <Button basic color='red' onClick={removeRecipe} icon='remove'></Button>
            </div>
        </div>

        // <Link to={`/recipe/${recipe.id}`}>
        //     <div className='dish-preview'>
        //         <div className='image-container'>
        //             <Image size='small' rounded src="/images/image-placeholder.png" />
        //             <div className='dish-label'>
        //                 <span>{recipe.name}</span>
        //             </div>
        //         </div>
        //     </div>
        // </Link>



    )
}

export default RecipeListItem