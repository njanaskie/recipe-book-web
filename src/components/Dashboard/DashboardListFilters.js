import React, { useState, useContext } from 'react'
import { Input } from 'semantic-ui-react'
import DishesContext from '../../../context/dishes-context'

const DashboardListFilters = ({ dishes }) => {
    const [text, setText] = useState('')

    const onTextChange = (e) => {
        setText(e.target.value)
        dishes.filter(dish => dish.name.toLowerCase().includes(text.toLowerCase()))
        console.log('dishes', dishes, ' and text', text)
    }

    return (
        <Input
            placeholder='Search...'
            size='big'
            value={text}
            onChange={onTextChange}
        />
    )
}

export default DashboardListFilters