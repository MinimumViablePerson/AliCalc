const makeAliquotPlan = ({
  compound = 'picrotoxin',
  solvent = 'DMSO',
  mw = 602.59,
  massMG = 1000,
  stockConcMM = 100,
  bathConcUM = 100
} = {}) => {
  let state = {
    compound,
    solvent,
    mw,
    massMG,
    stockConcMM,
    bathConcUM
  }

  let aliquotPlan = {
    get state () {
      return Object.freeze(state)
    },
    update: newState => {
      state = { ...state, ...newState }
      return { ...aliquotPlan }
    },
    get massG () {
      return state.massMG / 1e3
    },
    get stockConcM () {
      return state.stockConcMM / 1e3
    },
    get bathConcM () {
      return state.bathConcUM / 1e6
    },
    get syringeConcM () {
      return aliquotPlan.bathConcM * 50
    },
    get stockDilutionForSyringe () {
      return aliquotPlan.stockConcM / aliquotPlan.syringeConcM
    },
    get stockDilutionsToBath () {
      return aliquotPlan.stockConcM / aliquotPlan.bathConcM
    },
    get syringe10stock_L () {
      return 0.01 / aliquotPlan.stockDilutionForSyringe
    },
    get containerMols () {
      return aliquotPlan.massG / state.mw
    },
    get totalStockVolume () {
      return aliquotPlan.containerMols / aliquotPlan.stockConcM
    },
    get aliquotCount () {
      return (
        Math.round(
          (aliquotPlan.totalStockVolume / aliquotPlan.syringe10stock_L) * 100
        ) / 100
      )
    },
    get howToMakeStock () {
      return (
        `Dissolve ${aliquotPlan.toMG(aliquotPlan.massG)} ${
          state.compound
        } into ` +
        `${aliquotPlan.toML(aliquotPlan.totalStockVolume)} ${state.solvent} ` +
        `for ${aliquotPlan.toMM(aliquotPlan.stockConcM)} stock solution.`
      )
    },
    get howToMakeAliquots () {
      return (
        `Divide stock solution into ${aliquotPlan.toUL(
          aliquotPlan.syringe10stock_L
        )} aliquots ` + `(makes ${aliquotPlan.aliquotCount} aliquots).`
      )
    },
    get howToFill10mlSyringe () {
      return (
        `Bring 1 aliquot to 10 mL with ACSF for a ${aliquotPlan.toUM(
          aliquotPlan.syringeConcM
        )} ` + `(50x bath concentration) syringe.`
      )
    },
    get howToFill500mlBath () {
      return (
        `Dilute 1 aliquot to 500 mL ACSF for ` +
        `a ${aliquotPlan.toUM(aliquotPlan.bathConcM)} bath.`
      )
    },
    toMM: molar => `${Math.round(molar * 1e3 * 1000) / 1000} mM`,
    toUM: molar => `${Math.round(molar * 1e6 * 1000) / 1000} µM`,
    toNM: molar => `${Math.round(molar * 1e9 * 1000) / 1000} nM`,
    toML: liters => `${Math.round(liters * 1e3 * 1000) / 1000} mL`,
    toUL: liters => `${Math.round(liters * 1e6 * 1000) / 1000} µL`,
    toMG: grams => `${Math.round(grams * 1e3 * 1000) / 1000} mg`,
    isValid () {
      const { mw, massMG, stockConcMM, bathConcUM } = aliquotPlan.state
      if (
        aliquotPlan.state.compound === '' ||
        aliquotPlan.state.solvent === '' ||
        isNaN(parseFloat(mw)) ||
        mw <= 0 ||
        isNaN(parseFloat(massMG)) ||
        massMG <= 0 ||
        isNaN(parseFloat(stockConcMM)) ||
        stockConcMM <= 0 ||
        isNaN(parseFloat(bathConcUM)) ||
        bathConcUM <= 0
      ) return false

      return true
    }
  }

  return Object.freeze(aliquotPlan)
}

export default makeAliquotPlan
