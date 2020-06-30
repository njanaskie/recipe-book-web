import { useContext, useEffect, useRef } from 'react'
import database from '../firebase/firebase'
import FirebaseContext from '../../context/firebase-context'
import RecipesContext from '../../context/recipes-context'

const useUserRecipes = (dish = {}) => {
    const isCurrent = useRef(true)
    const { user } = useContext(FirebaseContext)
    const { recipes, recipeDispatch } = useContext(RecipesContext)

    useEffect(() => {
        return () => {
            isCurrent.current = false
        }
    }, [])

    useEffect(() => {
        if (dish.id) {
            const unsubscribe = database.collection('users').doc(user.uid).collection('recipes').where('recipeDish', '==', dish.name)
            .onSnapshot((snapshot) => {
                if (isCurrent.current) {
                    const recipes = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                        }))
                
                    recipeDispatch({ type: 'SET_RECIPES', recipes })
                }
            })
    
            return () => unsubscribe()
        }
    }, [dish])

    recipes.filter(recipe => recipe.id !== undefined )

    return recipes
}

export default useUserRecipes