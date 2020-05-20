// // use id from match.params to pass into SET_DISH dispatch,
// // can probably use useDishes than the find function to get dish from array


// not needed for now but may be useful for performance, don't need to call all dishes everytime and have to loop through




// import { useContext, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import database from '../firebase/firebase'
// import useDishes from '../hooks/useDishes'
// import DishesContext from '../../context/dishes-context'


// const useDish = () => {
//     const { dishes, dishDispatch } = useContext(DishesContext)
//     const { id } = useParams()
//     // const dishesFromHook = useDishes()

//     // const dish = dishes.find((dish) => dish.id === id)
//     // console.log(dish)
//     console.log(dishes)
//     // console.log(id)
//     // console.log(dishesFromHook)

//     useEffect(() => {
//         database.collection('dishes')
//         .doc(id)
//         .get()
//         .then((doc) => {
//             const dish = {id: doc.id, ...doc.data()}

//             dishDispatch({ type: 'SET_DISH', dish})
            
//         })

//     }, [])

//     // return dish
    
// }

// export default useDish