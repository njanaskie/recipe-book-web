import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import DishesContext from '../../../context/dishes-context'
import DishForm from '../Dishes/DishForm'
import useDishes from '../../hooks/useDishes'
import database from '../../firebase/firebase'

const AddDishHome = () => {
    const { dishDispatch } = useContext(DishesContext)
    const history = useHistory()

    const onSubmit = (dish) => {
        database.collection('dishes').add(dish).then((ref) => {
            dishDispatch({ type: 'ADD_DISH', dish: {id: ref.key, ...dish} })
            history.push('/dishes')
        })
    }

    return (
        <div>
            <DishForm
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default AddDishHome