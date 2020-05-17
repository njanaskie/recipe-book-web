import { useContext, useEffect } from 'react'
import database from '../firebase/firebase'
import DishesContext from '../../context/dishes-context'

const useDishes = () => {
    const { dishes, dishDispatch } = useContext(DishesContext)

    useEffect(() => {
        database.collection('dishes')
        .get()
        .then((snapshot) => {
            const dishes = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
                }))

            dishDispatch({ type: 'SET_DISHES', dishes})
        });
        
    }, [])

    return dishes
}

export default useDishes