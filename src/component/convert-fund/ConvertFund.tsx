'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import Button from '@/component/button/Button'
import CustomDropdown, { Option } from '@/component/custom-dropdown/CustomDropdown'

import styles from './ConvertFund.module.scss'

const ConvertFund = () => {
  const [amount, setAmount] = useState('0')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('GBP')
  const [conversionRate, setConversionRate] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [shouldConvert, setShouldConvert] = useState(false)

  useEffect(() => {
    const convertCurrency = async () => {
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        setError('Please enter a valid amount.')
        return
      }

      setLoading(true)
      setError(null)

      try {
        const rate = await fetchConversionRate(fromCurrency, toCurrency)
        setConversionRate(rate)
      } catch (err) {
        setError('Failed to fetch conversion rate')
      } finally {
        setLoading(false)
      }
    }

    if (shouldConvert) {
      convertCurrency()
      setShouldConvert(false)
    }
  }, [fromCurrency, toCurrency, shouldConvert, amount])

  const fetchConversionRate = async (fromCurrency: string, toCurrency: string): Promise<number> => {
    const response = await fetch(`/api/conversion-rate?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}`)
    const data = await response.json()

    if (data.error) {
      throw new Error(data.error)
    }

    return data.rate
  }

  const handleCurrencyChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (selectedOption: Option) => {
    setter(selectedOption.value)
    setShouldConvert(true)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (Number(value) <= 0) {
      setError('Please enter an amount greater than 0.')
    } else {
      setError(null)
    }

    setAmount(value)
  }

  const handleConvert = async () => {
    setShouldConvert(true)
  }

  const handleCurrencySwap = async () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setShouldConvert(true)
  }

  const currencyOptions: Option[] = [
    {
      value: 'USD',
      label: 'USD - US Dollar',
      flag: '/assets/images/flags/us.svg',
    },
    {
      value: 'EUR',
      label: 'EUR - Euro',
      flag: '/assets/images/flags/eu.svg',
    },
    {
      value: 'GBP',
      label: 'GBP - British Pound',
      flag: '/assets/images/flags/uk.svg',
    },
  ]

  const convertedAmount = conversionRate ? (Number(amount) * conversionRate).toFixed(6) : null

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Image width="55" height="44" src="/assets/images/convert-icon.svg" alt="Convert Fund Icon" />
        Convert Fund
      </div>
      <div className={styles.converterContainer}>
        <div className={styles.amount}>
          Amount
          <input
            type="number"
            inputMode="decimal"
            value={amount}
            onChange={handleAmountChange}
            aria-label="Amount to convert"
          />
        </div>
        <div className={styles.currency}>
          <div className={styles.text}>From</div>
          <CustomDropdown
            options={currencyOptions}
            value={fromCurrency}
            onChange={handleCurrencyChange(setFromCurrency)}
          />
        </div>
        <div onClick={handleCurrencySwap} className={styles.swapIcon} aria-label="Swap currencies">
          <Image width="50" height="50" src="/assets/images/exchange-icon.svg" alt="Exchange Icon" />
        </div>
        <div className={styles.currency}>
          <div className={styles.text}>To</div>
          <CustomDropdown options={currencyOptions} value={toCurrency} onChange={handleCurrencyChange(setToCurrency)} />
        </div>
      </div>

      {!conversionRate && (
        <div className={styles.btnContainer}>
          <Button color="secondary" variant="contained" size="large" onClick={handleConvert} disabled={loading}>
            {loading ? 'Converting...' : 'Convert'}
          </Button>
        </div>
      )}

      {error && <div className={styles.error}>{error}</div>}

      {conversionRate && (
        <div className={styles.result}>
          <div>{`${amount} ${fromCurrency} =`}</div>
          <div>{`${convertedAmount} ${toCurrency}`}</div>
          <div>{`1 ${fromCurrency} = ${conversionRate} ${toCurrency}`}</div>
          <div>{`1 ${toCurrency} = ${(1 / conversionRate).toFixed(6)} ${fromCurrency}`}</div>
        </div>
      )}
    </div>
  )
}

export default ConvertFund
