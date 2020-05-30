import { useContext, useEffect, useRef } from 'react'
import database from '../firebase/firebase'
import FirebaseContext from '../../context/firebase-context'
import PantryContext from '../../context/pantry-context'

const usePantryIngredients = () => {
    const isCurrent = useRef(true)
    const { user } = useContext(FirebaseContext)
    const { pantryIngredients, pantryDispatch } = useContext(PantryContext)

    const uid = user.uid

    useEffect(() => {
        return () => {
            isCurrent.current = false
        }
    }, [])

    useEffect(() => {
        const unsubscribe = database.collection('users').doc(uid).collection('pantry')
        .onSnapshot((snapshot) => {
            if (isCurrent.current) {
                const pantryIngredients = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                    }))
            
                pantryDispatch({ type: 'SET_PANTRY_INGREDIENTS', pantryIngredients})
                console.log('usePantryIngredients current')
            }
        })

        return () => unsubscribe()

    }, [])

    return pantryIngredients
}

export default usePantryIngredients