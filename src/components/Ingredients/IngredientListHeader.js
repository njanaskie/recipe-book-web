import React from 'react'

const IngredientListHeader= ({ category }) => {

  return (
    <div>
      <h3>{category && category.toUpperCase()}</h3>
    </div>
  )
}

export { IngredientListHeader as default }