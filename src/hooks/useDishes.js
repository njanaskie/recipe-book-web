import { useContext, useEffect, useRef } from 'react'
import database from '../firebase/firebase'
import DishesContext from '../../context/dishes-context'

const useDishes = () => {
    const isCurrent = useRef(true)
    const { dishes, dishDispatch } = useContext(DishesContext)

    useEffect(() => {
        return () => {
            isCurrent.current = false
        }
    }, [])

    useEffect(() => {
        database.collection('dishes')
        .get()
        .then((snapshot) => {
            if (isCurrent.current) {
                const dishes = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                    }))
    
                dishDispatch({ type: 'SET_DISHES', dishes})
            }
        });
    }, [])

    return dishes
}

export default useDishes