import React, { useContext, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDishesContext } from '../../../context/dishes-context'
import DishForm from '../Dishes/DishForm'
import useDishes from '../../hooks/useDishes'
import database from '../../firebase/firebase'

export const EditDishHome = (props) => {
    const { dishDispatch } = useDishesContext()
    const dishes = useDishes()
    const { id } = useParams()
    const history = useHistory()
    const dish = dishes.find((dish) => dish.id === id)

    const onSubmit = (dish) => {
        database.collection('dishes').doc(id).update(dish).then(() => {
            dishDispatch({ type: 'EDIT_DISH', id: dish.id, dish })
            history.push('/dishes')
        })
    }

    const onRemove = () => {
        database.collection('dishes').doc(id).delete().then(() => {
            dishDispatch({ type: 'REMOVE_DISH', id })
            history.push('/dishes')
          })
    }


    return (
        <div>
            <DishForm
                {...dish}
                onSubmit={onSubmit}
            />
            <button onClick={onRemove}>Remove Dish</button>
        </div>

        
    )
}

export default EditDishHome