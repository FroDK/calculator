import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import CalculateIcon from '@mui/icons-material/Calculate'
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import TimesOneMobiledataIcon from '@mui/icons-material/TimesOneMobiledata'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

import { ISalaryCalculator } from '../types'

import styles from '../Calculator.module.css'

type TProps = Omit<ISalaryCalculator, 'totalHoursProp'>

const NDFLCalculator: FC<TProps> = ({
  firstHalfHoursProp = 0,
  secondHalfHoursProp = 0,
}) => {
  const [rate, setRate] = useState<number>(0)
  const [hoursFirstHalf, setHoursFirstHalf] =
    useState<number>(firstHalfHoursProp)
  const [hoursSecondHalf, setHoursSecondHalf] =
    useState<number>(secondHalfHoursProp)
  const [salaryFirstHalf, setSalaryFirstHalf] = useState<number>(0)
  const [salarySecondHalf, setSalarySecondHalf] = useState<number>(0)
  const [districtCoef, setDistrictCoef] = useState<string | null>('1')

  useEffect(() => {
    if (localStorage.getItem('rate')) {
      const rateNumber = Number(localStorage.getItem('rate'))
      setRate(rateNumber)
    }

    if (localStorage.getItem('cf')) {
      const cf = localStorage.getItem('cf')
      setDistrictCoef(cf)
    }
  }, [])

  const handleRateInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const rateNumber = Number(e.target.value)
    if (!isNaN(rateNumber)) setRate(rateNumber)
  }

  const handleHoursFirstHalf = (e: ChangeEvent<HTMLInputElement>): void => {
    const hoursNumber = Number(e.target.value)
    if (!isNaN(hoursNumber)) setHoursFirstHalf(hoursNumber)
  }

  const handleHoursSecondHalf = (e: ChangeEvent<HTMLInputElement>): void => {
    const hoursNumber = Number(e.target.value)
    if (!isNaN(hoursNumber)) setHoursSecondHalf(hoursNumber)
  }

  const handleDistrictCoef = (e: ChangeEvent<HTMLInputElement>): void => {
    const coefNumber = e.target.value
    setDistrictCoef(coefNumber)
  }

  const handleClickCalculate = () => {
    localStorage.setItem('rate', rate.toString())
    localStorage.setItem('cf', districtCoef as string)

    const salaryFirst = Math.round(
      rate * hoursFirstHalf * Number(districtCoef) * 0.87
    )

    const salarySecond = Math.round(
      rate * hoursSecondHalf * Number(districtCoef) * 0.87
    )

    setSalaryFirstHalf(salaryFirst)
    setSalarySecondHalf(salarySecond)

    console.log(`First half salary: ${salaryFirst}`)
    console.log(`Second half salary: ${salarySecond}`)
  }

  return (
    <div>
      <Grid container spacing={0} alignItems="center">
        <Grid item xs={12} sm={6} md={4} className={styles.item}>
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

        <Grid item xs={12} sm={6} md={4} className={styles.item}>
          <TextField
            label="Часы за первую половину месяца"
            variant="outlined"
            size="small"
            fullWidth
            value={hoursFirstHalf}
            onChange={handleHoursFirstHalf}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <QueryBuilderIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} className={styles.item}>
          <TextField
            label="Часы за вторую половину месяца"
            variant="outlined"
            size="small"
            fullWidth
            value={hoursSecondHalf}
            onChange={handleHoursSecondHalf}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <QueryBuilderIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} className={styles.item}>
          <TextField
            label="Районный коеффициент"
            variant="outlined"
            size="small"
            fullWidth
            value={districtCoef}
            type="number"
            onChange={handleDistrictCoef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <TimesOneMobiledataIcon />
                </InputAdornment>
              ),
            }}
          />
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

        <Grid item xs={12} className={styles.item}>
          <div className={styles.totalWrapper}>
            <div>Выплата 25 числа:</div>
            <div className={styles.total}>{salaryFirstHalf}</div>
            <CurrencyRubleIcon sx={{ fontSize: 18 }} />
          </div>
        </Grid>

        <Grid item xs={12} className={styles.item}>
          <div className={styles.totalWrapper}>
            <div>Выплата 10 числа:</div>
            <div className={styles.total}>{salarySecondHalf}</div>
            <CurrencyRubleIcon sx={{ fontSize: 18 }} />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default NDFLCalculator
