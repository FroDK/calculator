import React, { SyntheticEvent, useState } from 'react'

import Typography from '@mui/material/Typography'

import { Accordion, AccordionDetails, AccordionSummary } from './Accordion'
import NDFLCalculator from './NDFLCalculator'
import SimpleCalculator from './SimpleCalculator'

import styles from './index.module.css'

const SalaryCalculator = () => {
  const [expanded, setExpanded] = useState<string | false>('')

  const handleChange =
    (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }

  return (
    <div className={styles.container}>
      <Accordion
        expanded={expanded === 'calc1'}
        onChange={handleChange('calc1')}
      >
        <AccordionSummary aria-controls="calc1-content" id="calc1-header">
          <Typography>Простой калькулятор</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SimpleCalculator />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'calc2'}
        onChange={handleChange('calc2')}
      >
        <AccordionSummary aria-controls="calc2-content" id="calc2-header">
          <Typography>НДФЛ калькулятор</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NDFLCalculator />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default SalaryCalculator
