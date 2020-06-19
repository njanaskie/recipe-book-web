import { useContext, useEffect } from 'react'
import database from '../firebase/firebase'
import IngredientsContext from '../../context/ingredients-context'

const useIngredients = () => {
    const { ingredients, dispatch } = useContext(IngredientsContext)

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

    return ingredients
}

export default useIngredients