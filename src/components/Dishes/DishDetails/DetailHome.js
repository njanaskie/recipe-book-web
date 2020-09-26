// import React, { useContext } from 'react'
// import { useParams } from 'react-router-dom'
// import useIngredients from '../../../hooks/useIngredients'
// import useDishes from '../../../hooks/useDishes'
// import DetailContent from './DetailContent'
// import useUserRecipes from '../../../hooks/useUserRecipes'

// const DetailHome = () => {
//     const dishes = useDishes()
//     const { id } = useParams()
//     const dish = dishes.find((dish) => dish.id === id)
//     const userRecipes = useUserRecipes(dish)

//     return (
//         <div>
//             <DetailContent
//                 dish={dish}
//                 userRecipes={userRecipes.filter(recipe => recipe.id !== undefined )}
//             />
//         </div>
//     )
// }

// export default DetailHome