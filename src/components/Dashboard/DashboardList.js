import React, { useCallback, useState, useEffect, useMemo } from 'react'
import DishesContext from '../../../context/dishes-context'
import DishListItem from '../Dishes/DishListItem'
import useDishes from '../../hooks/useDishes'
import usePantryDishes from '../../hooks/usePantryDishes'
import { Input } from 'semantic-ui-react'
import DashboardListFilters from './DashboardListFilters'

const DashboardList = () => {
    const pantryDishes = usePantryDishes()
    const [textFilter, setTextFilter] = useState('')
    const [filteredList, setFilteredList] = useState([])
    
    useEffect(() => {
        if (!filteredList) {
            setFilteredList(pantryDishes)
        } else {
        }
        
        // const timer = setTimeout(() => {
        //     setFilteredList(pantryDishes)
        //     console.log('should set filtered list: ', filteredList)
        // }, 3000)

        // return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const list = pantryDishes.filter(dish => dish.name.toLowerCase().includes(textFilter.toLowerCase()))
        setFilteredList(list)
    }, [textFilter])

    const onTextChange = useCallback((e) => {
        setTextFilter(e.target.value)
    }, [])

    console.log(textFilter)
    console.log(pantryDishes)
    console.log(filteredList)
    const data = filteredList
    
    return (
        <div>
            <Input
                placeholder='Search...'
                size='big'
                value={textFilter}
                onChange={onTextChange}
            />
            {
                data.length === 0 ? (
                    <div>
                        <span>No dishes</span>
                    </div>
                ) : (
                    data.map((dish) => 
                        <DishListItem key={dish.id} dish={dish} />
                    )
                )
            }
        </div>
    )
}

export default DashboardList