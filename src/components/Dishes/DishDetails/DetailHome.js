import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import useIngredients from '../../../hooks/useIngredients'
import useDishes from '../../../hooks/useDishes'
import DetailContent from './DetailContent'
import useUserRecipes from '../../../hooks/useUserRecipes'

const DetailHome = () => {
    const dishes = useDishes()
    const userRecipes = useUserRecipes()
    const ingredients = useIngredients()
    const { id } = useParams()
    const dish = dishes.find((dish) => dish.id === id)

    return (
        <div>
            <DetailContent
                dish={dish}
                userRecipes={userRecipes}
                ingredients={ingredients}
            />
        </div>
    )
}

export default DetailHome