import React from 'react'

const IngredientListHeader= ({ category }) => {

  return (
    <div>
      <h3>{category}</h3>
    </div>
  )
}

export { IngredientListHeader as default }