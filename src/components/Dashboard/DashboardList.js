import React, { useCallback, useState, useEffect, useMemo, useContext, useRef } from 'react'
import DishesContext from '../../../context/dishes-context'
import DishListItem from '../Dishes/DishListItem'
import useDishes from '../../hooks/useDishes'
import usePantryDishes from '../../hooks/usePantryDishes'
import { Input } from 'semantic-ui-react'
import DashboardListFilters from './DashboardListFilters'
import FiltersContext from '../../../context/filters-context'

const DashboardList = () => {
    const isCurrent = useRef(true)
    const { filters } = useContext(FiltersContext)
    const pantryDishes = usePantryDishes()
    const [filteredList, setFilteredList] = useState([])

    // console.log(pantryDishes)
    // useEffect(() => {
    //     return () => {
    //         isCurrent.current = false
    //     }
    // }, [])
    
    // useEffect(() => {
    //     if (!isCurrent.current) {
    //         setFilteredList(pantryDishes)
    //         console.log('DashboardList current', isCurrent)
    //     }
    // }, [])

    // useMemo(() => {
    //     const list = pantryDishes.filter(dish => dish.name.toLowerCase().includes(filters.text.toLowerCase()))
    //     setFilteredList(list)
    // }, [filters])

    // // const onTextChange = useCallback((e) => {
    // //     setTextFilter(e.target.value)
    // // }, [])

    // // console.log(textFilter)
    // // console.log(pantryDishes)
    // // console.log(filteredList)
    // // const data = filteredList
    // // console.log(filteredList)
    // // console.log(unfilteredList)
    // console.log(pantryDishes)

    return (
        <div>
            <DashboardListFilters filters={filters}/>
            {
                pantryDishes.length === 0 ? (
                    <div>
                        <span>No dishes</span>
                    </div>
                ) : (
                    pantryDishes.map((dish) => 
                        <DishListItem key={dish.id} dish={dish} />
                    )
                )
            }
        </div>
    )
}

export default DashboardList