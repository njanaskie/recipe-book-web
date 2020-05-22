import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import DishesContext from '../../../../context/dishes-context'
import useDish from '../../../hooks/useDish'
import useDishes from '../../../hooks/useDishes'
import DetailContent from './DetailContent'

const DetailHome = () => {
    const dishes = useDishes()
    const { id } = useParams()
    const dish = dishes.find((dish) => dish.id === id)

    return (
        <div>
            <DetailContent {...dish} />
        </div>
    )
}

export default DetailHome