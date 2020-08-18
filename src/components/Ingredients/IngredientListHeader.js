import React from 'react'

const IngredientListHeader= ({ category }) => {

  return (
    <div>
      <h4>{category && category.toUpperCase()}</h4>
    </div>
  )
}

export { IngredientListHeader as default }