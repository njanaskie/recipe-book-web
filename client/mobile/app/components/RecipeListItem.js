import React, { useState } from 'react'
import { useFirebaseContext } from '../context/firebase-context'
import { useRecipesContext } from '../context/recipes-context'
import EditRecipe from './EditRecipe'
import { removeRecipeService } from '../services/recipeServices'
import { Text, View } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const RecipeListItem = ({ recipe }) => {
    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const { user, isGuest } = useFirebaseContext()
    const { removeRecipe, recipeDispatch } = useRecipesContext()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const show = () => setOpen(true)

    const handleConfirm = () => {
        setOpen(false)
        removeRecipeService({ id: recipe.id })
        recipeDispatch({ type: 'REMOVE_RECIPE', id: recipe.id })
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
        <Card>
            <Card.Title title={recipe.urlTitle} />
            <Card.Content>
                <Title>
                    {recipe.urlTitle}
                </Title>
            </Card.Content>
            <Card.Cover source={{ uri: recipe.urlImage }} />
        </Card>
    )
}

export default RecipeListItem