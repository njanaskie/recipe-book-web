import React, { useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import DishesContext from '../../../context/dishes-context'
import DishForm from '../Dishes/DishForm'
import useDishes from '../../hooks/useDishes'
import database from '../../firebase/firebase'

const EditDishHome = () => {
    const { dishDispatch } = useContext(DishesContext)
    const dishes = useDishes()
    const { id } = useParams()
    const history = useHistory()
    const dish = dishes.find((dish) => dish.id === id)

    console.log(id)
    console.log(dish)

    const onSubmit = (dish) => {

        const unsubscribe = database.collection('dishes').doc(id).update(dish).then(() => {
            dishDispatch({ type: 'EDIT_DISH', id: dish.id, dish })
        })
        history.push('/dishes')

        return () => unsubscribe()
    }

    return (
        <div>
            <DishForm
                {...dish}
                onSubmit={onSubmit}
            />
            <button>Remove Dish</button>
        </div>

        
    )
}

export default EditDishHome