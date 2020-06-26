import React, { useContext, useState } from 'react'
import { ReactTinyLink } from 'react-tiny-link'
import {  Modal } from 'semantic-ui-react'
import EditUserRecipe from '../UserRecipes/EditUserRecipe'
import FirebaseContext from '../../../../../context/firebase-context'
import RecipesContext from '../../../../../context/recipes-context'
import database from '../../../../firebase/firebase'

const UserRecipeItem = ({ recipe }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { user } = useContext(FirebaseContext)
    const { recipeDispatch } = useContext(RecipesContext)

    const removeUserRecipe = () => {
        database.collection('users').doc(user.uid).collection('recipes').doc(recipe.id).delete().then(() => {
            recipeDispatch({ type: 'REMOVE_RECIPE', id: recipe.id })
        })
    }

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }
    
    return (
        <div>
            <ReactTinyLink
                url={recipe.url}
            >
                {recipe.url}
            </ReactTinyLink>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false) }>
                <Modal.Header>Add Recipe</Modal.Header>
                <Modal.Content>
                    <EditUserRecipe recipe={recipe} />
                </Modal.Content>
            </Modal>
            <button onClick={handleModalOpen}>Edit</button>
            <button onClick={removeUserRecipe}>Remove</button>
        </div>
    )
}

export default UserRecipeItem

