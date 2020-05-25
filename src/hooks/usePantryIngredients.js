import { useContext, useEffect } from 'react'
import database from '../firebase/firebase'
import FirebaseContext from '../../context/firebase-context'
import PantryContext from '../../context/pantry-context'

const usePantryIngredients = () => {
    const { user } = useContext(FirebaseContext)
    const { pantryIngredients, pantryDispatch } = useContext(PantryContext)

    const uid = user.uid

    useEffect(() => {
        const unsubscribe = database.collection('users').doc(uid).collection('pantry')
        .onSnapshot((snapshot) => {
            const pantryIngredients = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
                }))
        
            pantryDispatch({ type: 'SET_PANTRY_INGREDIENTS', pantryIngredients})
        })

        return () => unsubscribe()

    }, [])

    return pantryIngredients
}

export default usePantryIngredients