import React, { useState } from 'react'
import AliquotDesign from './AliquotDesign.js'
import makeAliquotPlan from './AliquotPlan.js'
import AliquotPlanDisplay from './AliquotPlanDisplay.js'

const AliquotCalculator = () => {
  const [plan, setPlan] = useState(makeAliquotPlan)

  const updatePlan = newState => {
    setPlan(plan.update(newState))
  }

  return (
    <>
      <AliquotDesign plan={plan} updatePlan={updatePlan} />
      <AliquotPlanDisplay plan={plan} />
    </>
  )
}

export default AliquotCalculator
