import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import CalculateIcon from '@mui/icons-material/Calculate'
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

import { ISalaryCalculator } from '../types'

import styles from '../Calculator.module.css'

type TProps = Pick<ISalaryCalculator, 'totalHoursProp'>

const SimpleCalculator: FC<TProps> = ({ totalHoursProp = 0 }) => {
  const [rate, setRate] = useState<number>(0)
  const [hours, setHours] = useState<number>(totalHoursProp)
  const [sum, setSum] = useState<number>(0)

  useEffect(() => {
    if (localStorage.getItem('rate')) {
      const rateNumber = Number(localStorage.getItem('rate'))

      setRate(rateNumber)
    }
  }, [])

  const handleRateInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const rateNumber = Number(e.target.value)
    if (!isNaN(rateNumber)) setRate(rateNumber)
  }

  const handleHoursInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const hoursNumber = Number(e.target.value)
    if (!isNaN(hoursNumber)) setHours(hoursNumber)
  }

  const handleClickCalculate = () => {
    localStorage.setItem('rate', rate.toString())

    const totalSum = Math.round(rate * hours)
    setSum(totalSum)
  }

  return (
    <div>
      <Grid container spacing={0} alignItems="center">
        <Grid item xs={12} sm={6} md={3} className={styles.item}>
          <TextField
            label="Почасовая ставка"
            variant="outlined"
            size="small"
            fullWidth
            value={rate}
            onChange={handleRateInput}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CurrencyRubleIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} className={styles.item}>
          <TextField
            label="Всего часов"
            variant="outlined"
            size="small"
            fullWidth
            value={hours}
            onChange={handleHoursInput}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <QueryBuilderIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} className={styles.item}>
          <div className={styles.totalWrapper}>
            <div>Итого:</div>
            <div className={styles.total}>{sum.toLocaleString()}</div>
            <CurrencyRubleIcon sx={{ fontSize: 18 }} />
          </div>
        </Grid>

        <Grid item xs={12} sm className={styles.item}>
          <div className={styles.buttonWrapper}>
            <Button
              variant="contained"
              endIcon={<CalculateIcon />}
              onClick={handleClickCalculate}
            >
              Расчитать
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default SimpleCalculator
