// import React, { useState, useEffect } from 'react'
// import { Input } from 'semantic-ui-react'
// import DishesContext from '../../../context/dishes-context'

// const DashboardListFilters = ({ dishes }) => {
//     const [textFilter, setTextFilter] = useState('')
//     const [filteredList, setFilteredList] = useState([])

//     useEffect(() => {
//         const list = dishes.filter(dish => dish.name.toLowerCase().includes(textFilter.toLowerCase()))
//         setFilteredList(list)
//     }, [textFilter])

//     const onTextChange = (e) => {
//         setTextFilter(e.target.value)
//         console.log('dishes', dishes, ' and text', textFilter)
//     }

//     return (
//         <Input
//             placeholder='Search...'
//             size='big'
//             value={textFilter}
//             onChange={onTextChange}
//         />
//     )
// }

// export default DashboardListFilters