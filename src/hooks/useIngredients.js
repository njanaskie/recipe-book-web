import { useContext, useEffect } from 'react'
import database from '../firebase/firebase'
import { useIngredientsContext } from '../../context/ingredients-context'

const useIngredients = () => {
    const { ingredients, dispatch } = useIngredientsContext()

    useEffect(() => {
        const unsubscribe = database.collection('ingredients').orderBy("category", "asc")
        .onSnapshot((snapshot) => {
            const ingredients = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
                }))

            dispatch({ type: 'SET_INGREDIENTS', ingredients})
        });

        return () => unsubscribe()
        
    }, [])

    return ingredients.sort((a,b) => a.name.localeCompare(b.name))
}

export default useIngredients