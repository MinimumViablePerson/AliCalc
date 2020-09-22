import AliquotPlan from '../AliquotPlan.js'

describe('calculations', () => {
  it('match expected values for oxytocin', () => {
    let options = {
      compound: 'oxytocin',
      solvent: 'water',
      mw: 1007.19,
      massMG: 1,
      stockConcMM: 1,
      bathConcUM: 0.2
    }
    var plan = new AliquotPlan(options)
    expect(plan.stockDilutionsToBath).toEqual(5000)
    expect(plan.aliquotCount).toEqual(9.93)
  })
})
