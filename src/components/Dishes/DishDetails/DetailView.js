import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import DishesContext from '../../../../context/dishes-context'
import useDish from '../../../hooks/useDish'
import useDishes from '../../../hooks/useDishes'
import DetailContent from '../DishDetails/DetailContent'

const DetailView = () => {
    const dishes = useDishes()
    const { id } = useParams()
    const dish = dishes.find((dish) => dish.id === id)

    console.log(dishes)
    console.log(dish)

    return (
        <div>
            <h3>Details</h3>
            <DetailContent {...dish} />
        </div>
    )
}

export default DetailView