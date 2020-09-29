import React from 'react'
import { Link } from 'react-router-dom';
import { ReactTinyLink } from 'react-tiny-link'
import { Button } from 'semantic-ui-react'
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
            <div className='recipe-group__link'>
                <ReactTinyLink
                    // cardSize="large"
                    url={recipe.url}
                    width='100%'
                >
                    {recipe.url}
                </ReactTinyLink>
            </div>
            <div className='recipe-group__button'>
                <Button as={Link} to={`/edit-recipe/${recipe.id}`} basic>Edit</Button>
                <Button basic color='red' onClick={removeRecipe}>Remove</Button>
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