import React, { useEffect, useState } from 'react'
import { useFirebaseContext } from '../context/firebase-context'
import { useRecipesContext } from '../context/recipes-context'
import EditRecipe from './EditRecipe'
import { removeRecipeService } from '../services/recipeServices'
import { Image, Text, View, StyleSheet } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import RNUrlPreview from 'react-native-url-preview'
import { LinkPreview, getPreviewData } from '@flyerhq/react-native-link-preview'
import { database } from 'firebase'

const RecipeListItem = ({ recipe }) => {
    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const { user, isGuest } = useFirebaseContext()
    const { removeRecipe, recipeDispatch } = useRecipesContext()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [urlData, setUrlData] = useState({ title: '', image: null })

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

    useEffect(() => 
        getPreviewData(recipe.url).then(data => setUrlData({ title: data.title, image: data.image.url }))
    ,[])

    return (
        <Card style={styles.containter} >
            <Card.Cover source={{ uri: urlData.image }} style={styles.image}/>
            <Card.Title title={urlData.title} titleStyle={styles.title} titleNumberOfLines={3}/>
        </Card>
    )
}

const styles = StyleSheet.create({
    containter: {
        height: 200,
        width: 150,
        marginBottom: 10,
        marginTop: 10,
        // justifyContent: 'center',
        // alignSelf: 'center',
    },
    preview: {
        flexGrow: 1
    },
    image: {
        height: '60%',
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    title: {
        overflow: 'hidden',
        fontSize: 12,
        lineHeight: 20,
        marginRight: 10,
        marginTop: 5,
    },
    description: {
        display: 'none'
    }
})

export default RecipeListItem