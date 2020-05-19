import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import DishesContext from '../../../../context/dishes-context'
import useDishes from '../../../hooks/useDishes'

const DetailView = () => {
    const dishes = useDishes()
    const { id } = useParams()

    console.log(dishes)
    const dish = dishes.find((dish) => dish.id === id)
    console.log(dish)
    console.log(id)

    return (
        <div>
            <h1>Details</h1>
            <p>{dish.name}</p>
            {/* <p>{dish.keyIngredients}</p> */}
        </div>
    )
}

export default DetailView