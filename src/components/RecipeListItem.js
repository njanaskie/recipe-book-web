import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { ReactTinyLink } from 'react-tiny-link'
import { Button, Label, Segment, Dropdown, Menu, Confirm } from 'semantic-ui-react'
import { useFirebaseContext } from '../../context/firebase-context'
import { useRecipesContext } from '../../context/recipes-context'
import database from '../firebase/firebase'

const RecipeListItem = ({ recipe }) => {
    const [open, setOpen] = useState(false)
    const { user } = useFirebaseContext()
    const { recipeDispatch } = useRecipesContext()
    const pathname = window.location.pathname

    const show = () => setOpen(true)

    const handleConfirm = () => {
        setOpen(false)
        database.collection('users').doc(user.uid).collection('recipes').doc(recipe.id).delete().then(() => {
            recipeDispatch({ type: 'REMOVE_RECIPE', id: recipe.id })
        })
    }
    const handleCancel = () => setOpen(false)

    // const removeRecipe = () => {
    // }

    return (
        <div className='recipe-group__list'>
            <div className='recipe-group__top'>
                <div className='recipe-group__link'>
                    <Segment>
                        <div className='recipe-group__dropdown'>
                            <Dropdown item icon='ellipsis horizontal' simple>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to={`/edit-recipe/${recipe.id}`}>
                                        Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={show}>
                                        Remove
                                    </Dropdown.Item>
                                    <Confirm
                                        open={open}
                                        onCancel={handleCancel}
                                        onConfirm={handleConfirm}
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

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
                                    <Label size='small' tag color='teal'>
                                        {recipe.cuisine}
                                    </Label>
                                </div>
                            }
                            {recipe.type && 
                                <div className='recipe-group__tag-item'>
                                    <Label size='small' tag color='teal'>
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