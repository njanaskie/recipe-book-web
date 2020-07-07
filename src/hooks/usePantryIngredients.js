import { useContext, useEffect, useRef } from 'react'
import database from '../firebase/firebase'
import { useFirebaseContext } from '../../context/firebase-context'
import { usePantryContext } from '../../context/pantry-context'

const usePantryIngredients = () => {
    const isCurrent = useRef(true)
    const { user } = useFirebaseContext()
    const { pantryIngredients, pantryDispatch } = usePantryContext()
    
    useEffect(() => {
        return () => {
            isCurrent.current = false
        }
    }, [])

    useEffect(() => {
        const unsubscribe = database.collection('users').doc(user.uid).collection('pantry')
        .onSnapshot((snapshot) => {
            if (isCurrent.current) {
                const pantryIngredients = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                    }))
            
                pantryDispatch({ type: 'SET_PANTRY_INGREDIENTS', pantryIngredients})
            }
        })

        return () => unsubscribe()

    }, [])

    return pantryIngredients
}

export default usePantryIngredients