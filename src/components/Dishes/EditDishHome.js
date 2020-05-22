import React from 'react'
import { useParams } from 'react-router-dom'
import DishForm from '../Dishes/DishForm'
import useDishes from '../../hooks/useDishes'

const EditDishHome = () => {
    const dishes = useDishes()
    const { id } = useParams()
    const dish = dishes.find((dish) => dish.id === id)

    console.log(id)
    console.log(dish)

    // onSubmit = (dish) => {
    //     // dispatch edit expense
    // }

    return (
        <DishForm
            dish={dish}
            // onSubmit={onSubmit}
        />
    )
}

export default EditDishHome