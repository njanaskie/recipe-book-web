import React, { useState } from 'react'
import { ReactTinyLink } from 'react-tiny-link'
import { Label, Segment, Dropdown, Confirm } from 'semantic-ui-react'
import { useFirebaseContext } from '../../context/firebase-context'
import { useRecipesContext } from '../../context/recipes-context'
import database from '../firebase/firebase'
import RecipeCarousel from './RecipeCarousel'
import RecipeInputModal from './RecipeInputModal';
import EditRecipe from './EditRecipe'

const RecipeListItem = ({ recipe }) => {
    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const { user, isGuest } = useFirebaseContext()
    const { recipeDispatch } = useRecipesContext()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const show = () => setOpen(true)

    const handleConfirm = () => {
        setOpen(false)
        database.collection('users').doc(user.uid).collection('recipes').doc(recipe.id).delete().then(() => {
            recipeDispatch({ type: 'REMOVE_RECIPE', id: recipe.id })
        })
    }
    const handleCancel = () => setOpen(false)

    const handleModalOpen = () => {
        setIsModalOpen(true)
        setIsEdit(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
        setIsEdit(false)
    }

    return (
        <div className='recipe-list-item'>
            <div className='recipe-segment'>
                <Segment>
                    <div className='recipe-dropdown'>
                        <Dropdown item icon='ellipsis horizontal' simple>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleModalOpen} disabled={isGuest ? true : false}>
                                    Edit
                                </Dropdown.Item>
                                <RecipeInputModal isModalOpen={isModalOpen} handleModalClose={handleModalClose} isEdit={isEdit}>
                                    <EditRecipe handleModalClose={handleModalClose} recipe={recipe}/>
                                </RecipeInputModal>
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
                    <div className='recipe-group__tiny-link'>
                        <ReactTinyLink
                            url={recipe.url}
                            width='100%'
                            defaultMedia="/images/image-placeholder.png"
                        >
                            {recipe.url}
                        </ReactTinyLink>
                    </div>
                    <div className='recipe-group__tags'>
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
    )
}

export default RecipeListItem