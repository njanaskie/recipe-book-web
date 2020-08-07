import React, { useContext, useEffect, useRef } from 'react'
import database from '../firebase/firebase'
import { useDishesContext } from '../../context/dishes-context'
import FiltersContext from '../../context/filters-context'

const useDishes = () => {
    const isCurrent = useRef(true)
    const { dishes, dishDispatch } = useDishesContext()

    React.useEffect(() => {
        return () => {
            isCurrent.current = false
        }
    }, [])

    React.useEffect(() => {
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