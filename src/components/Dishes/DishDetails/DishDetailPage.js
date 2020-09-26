// import React, { useReducer } from 'react'
// import dishesReducer from '../../../reducers/dishes'
// import DishesContext from '../../../../context/dishes-context'
// import RecipesContext from '../../../../context/recipes-context'
// import IngredientsContext from '../../../../context/ingredients-context'
// import recipesReducer from '../../../reducers/recipes'
// import ingredientsReducer from '../../../reducers/ingredients'
// import DetailHome from './DetailHome'

// const DishDetailPage = () => {
//     const [dishes, dishDispatch] = useReducer(dishesReducer, [])
//     const [recipes, recipeDispatch] = useReducer(recipesReducer, [])
//     const [ingredients, dispatch] = useReducer(ingredientsReducer, [])

//     return (
//         <DishesContext.Provider value={{ dishes, dishDispatch }}>
//             <RecipesContext.Provider value={{ recipes, recipeDispatch}}>
//                 <IngredientsContext.Provider value={{ ingredients, dispatch }}>
//                     <DetailHome />
//                 </IngredientsContext.Provider>
//             </RecipesContext.Provider>
//         </DishesContext.Provider>
//     )

// };

// export default DishDetailPage;