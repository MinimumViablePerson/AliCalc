import React from 'react'

const AliquotDesign = ({ updatePlan, plan }) => {
  const { compound, solvent, mw, massMG, stockConcMM, bathConcUM } = plan.state

  const handleChange = ({ target: { name, value } }) => {
    updatePlan({ [name]: value })
  }

  return (
    <>
      <h2>Compound Information</h2>
      <div className='compoundInfoRow'>
        <div className='compoundInfoBox'>
          <div>
            <label>Compound</label>
          </div>
          <div>
            <input
              name='compound'
              value={compound}
              onChange={handleChange}
              type='text'
            />
          </div>
          <div>
            <input
              type='radio'
              value='water'
              name='solvent'
              checked={solvent === 'water'}
              onChange={handleChange}
              style={{ width: '1em' }}
            />{' '}
            H<sub>2</sub>O
            <input
              type='radio'
              value='DMSO'
              name='solvent'
              checked={solvent === 'DMSO'}
              onChange={handleChange}
              style={{ width: '1em', marginLeft: '1em' }}
            />{' '}
            DMSO
          </div>
        </div>

        <div className='compoundInfoBox'>
          <div>
            <label>MW (g/mol)</label>
          </div>
          <div>
            <input name='mw' value={mw} onChange={handleChange} type='text' />
          </div>
          <div className='infoDetail'>
            Use the value printed on the container
          </div>
        </div>

        <div className='compoundInfoBox'>
          <div>
            <label>Mass (mg)</label>
          </div>
          <div>
            <input
              name='massMG'
              value={massMG}
              onChange={handleChange}
              type='text'
            />
          </div>
          <div className='infoDetail'>
            Mass of powder in an unopened container
          </div>
        </div>
      </div>

      <h2>Target Concentrations</h2>
      <div className='compoundInfoRow'>
        <div className='compoundInfoBox'>
          <div>
            <label>Stock Solution (mM)</label>
          </div>
          <div>
            <input
              name='stockConcMM'
              value={stockConcMM}
              onChange={handleChange}
              type='text'
            />
          </div>
          <div className='infoDetail'>Use a value near maximum solubility</div>
        </div>

        <div className='compoundInfoBox'>
          <div>
            <label>Bath Concentration (µM)</label>
          </div>
          <div>
            <input
              name='bathConcUM'
              value={bathConcUM}
              onChange={handleChange}
              type='text'
            />
          </div>
          <div className='infoDetail'>Final concentration in ACSF</div>
        </div>
      </div>
    </>
  )
}

export default AliquotDesign
