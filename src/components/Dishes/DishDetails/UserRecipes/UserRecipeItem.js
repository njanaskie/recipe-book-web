import React, { useContext, useState } from 'react'
import { ReactTinyLink } from 'react-tiny-link'
import {  Modal } from 'semantic-ui-react'
import EditUserRecipe from '../UserRecipes/EditUserRecipe'
import UserRecipeModal from '../UserRecipes/UserRecipeModal'
import FirebaseContext from '../../../../../context/firebase-context'
import RecipesContext from '../../../../../context/recipes-context'
import database from '../../../../firebase/firebase'

const UserRecipeItem = ({ recipe, dish, isModalOpen, handleModalOpen, handleModalClose }) => {
    const { user } = useContext(FirebaseContext)
    const { recipeDispatch } = useContext(RecipesContext)

    const removeUserRecipe = () => {
        database.collection('users').doc(user.uid).collection('recipes').doc(recipe.id).delete().then(() => {
            recipeDispatch({ type: 'REMOVE_RECIPE', id: recipe.id })
        })
    }

    // const handleModalOpen = () => {
    //     setIsModalOpen(true)
    // }
    
    return (
        <div>
            <ReactTinyLink
                url={recipe.url}
            >
                {recipe.url}
            </ReactTinyLink>
            <UserRecipeModal isModalOpen={isModalOpen} handleModalClose={handleModalClose}>
                <EditUserRecipe recipe={recipe} dish={dish} handleModalClose={handleModalClose}/>
            </UserRecipeModal>
            <button onClick={handleModalOpen}>Edit</button>
            <button onClick={removeUserRecipe}>Remove</button>
        </div>
    )
}

export default UserRecipeItem

