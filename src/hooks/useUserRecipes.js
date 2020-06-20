import { useContext, useEffect, useRef } from 'react'
import database from '../firebase/firebase'
import FirebaseContext from '../../context/firebase-context'
import RecipesContext from '../../context/recipes-context'

const useUserRecipes = () => {
    const isCurrent = useRef(true)
    const { user } = useContext(FirebaseContext)
    const { recipes, recipeDispatch } = useContext(RecipesContext)


    useEffect(() => {
        return () => {
            isCurrent.current = false
        }
    }, [])

    useEffect(() => {
        const unsubscribe = database.collection('users').doc(user.uid).collection('recipes')
        .onSnapshot((snapshot) => {
            if (isCurrent.current) {
                const userRecipes = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                    }))
            
                recipeDispatch({ type: 'SET_RECIPES', recipes: userRecipes})
            }
        })

        return () => unsubscribe()

    }, [])

    return recipes
}

export default useUserRecipes