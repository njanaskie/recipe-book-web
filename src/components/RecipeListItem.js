import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { ReactTinyLink } from 'react-tiny-link'
import { Button, Label, Segment, Dropdown, Menu, Confirm } from 'semantic-ui-react'
import { useFirebaseContext } from '../../context/firebase-context'
import { useRecipesContext } from '../../context/recipes-context'
import database from '../firebase/firebase'
import RecipeIngredientsCarousel from './RecipeIngredientsCarousel'
import RecipeCarousel from './RecipeCarousel'

const RecipeListItem = ({ recipe }) => {
    const [open, setOpen] = useState(false)
    const { user, isGuest } = useFirebaseContext()
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
                                    <Dropdown.Item as={Link} to={`/edit-recipe/${recipe.id}`} disabled={isGuest ? true : false}>
                                        Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={show} disabled={isGuest ? true : false}>
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
                                    <Label size='medium' circular color='teal'>
                                        {recipe.cuisine}
                                    </Label>
                                </div>
                            }
                            {recipe.type && 
                                <div className='recipe-group__tag-item'>
                                    <Label size='medium' circular color='teal'>
                                        {recipe.type}
                                    </Label>
                                </div>
                            }                            
                            {recipe.customTags &&
                                recipe.customTags.map(tag =>
                                    <div className='recipe-group__tag-item' key={tag}>
                                        <Label size='medium' circular color='purple'>
                                            {tag}
                                        </Label>
                                    </div>
                                )
                            }
                        </div>
                        <RecipeCarousel items={recipe.ingredients}>
                            {recipe.ingredients &&
                                recipe.ingredients.map(ingredient =>
                                    <div key={ingredient} className='slider-item'>
                                        <Label size='tiny'>
                                            {ingredient}
                                        </Label>
                                    </div>
                                )
                            }
                        </RecipeCarousel>
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