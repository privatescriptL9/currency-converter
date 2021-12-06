import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import './index.scss'

export type TOptions = {
  CharCode: string
  ID: string
  Name: string
  Nominal: number
  NumCode: string
  Previous: number
  Value: number
}

const url = 'https://www.cbr-xml-daily.ru/daily_json.js'

const Converter: React.FC = () => {
  const [currency, setCurrency] = useState<any[]>()
  const [selectFrom, setSelectFrom] = useState<any>()
  const [selectTo, setSelectTo] = useState<any>()
  const [convertedValue, setConvertedValue] = useState<any>('')

  const [inputValueTo, setInputValueTo] = useState<any>()

  useEffect(() => {
    const getCurrency = async () => {
      await axios(url).then(({ data }) => {
        const valute = data.Valute

        const expandedCurrency = Object.values(valute)

        setSelectFrom(JSON.stringify(valute['EUR']))
        setSelectTo(JSON.stringify(valute['USD']))

        setCurrency(expandedCurrency)
      })
    }

    getCurrency()
  }, [])

  const convertCurr = useCallback(
    (e: any) => {
      const selectFromValue = JSON.parse(selectFrom)
      const selectToValue = JSON.parse(selectTo)

      setInputValueTo(e.target.value)

      const convertedValue = Number(
        ((selectFromValue.Value / selectFromValue.Nominal) * e.target.value) /
          (selectToValue.Value / selectToValue.Nominal)
      ).toFixed(2)

      setConvertedValue(convertedValue)
    },
    [selectFrom, selectTo]
  )

  const changeCurr = useCallback(() => {
    if (!inputValueTo) {
      return
    }

    const intermediateValue = selectFrom
    setSelectFrom(selectTo)
    setSelectTo(intermediateValue)

    const selectFromValue = JSON.parse(selectTo)
    const selectToValue = JSON.parse(intermediateValue)

    const convertedValue = Number(
      ((selectFromValue.Value / selectFromValue.Nominal) * inputValueTo) /
        (selectToValue.Value / selectToValue.Nominal)
    ).toFixed(2)

    setConvertedValue(convertedValue)
  }, [inputValueTo, selectFrom, selectTo])

  const handleChangeFromCurr = useCallback(
    (e: any) => {
      setSelectFrom(e.target.value)

      const selectFromValue = JSON.parse(e.target.value)
      const selectToValue = JSON.parse(selectTo)

      const convertedValue = Number(
        ((selectFromValue.Value / selectFromValue.Nominal) * inputValueTo) /
          (selectToValue.Value / selectToValue.Nominal)
      ).toFixed(2)

      setConvertedValue(convertedValue)
    },
    [inputValueTo, selectTo]
  )

  const handleChangeToCurr = useCallback(
    (e: any) => {
      setSelectTo(e.target.value)

      const selectFromValue = JSON.parse(selectFrom)
      const selectToValue = JSON.parse(e.target.value)

      const convertedValue = Number(
        ((selectFromValue.Value / selectFromValue.Nominal) * inputValueTo) /
          (selectToValue.Value / selectToValue.Nominal)
      ).toFixed(2)

      setConvertedValue(convertedValue)
    },
    [inputValueTo, selectFrom]
  )

  return (
    <div className="Converter">
      <h1 className="Converter__title">Конвертер валют</h1>
      <div className="Converter__body">
        <div className="Converter__body-row-1">
          <span>Вы переводите из &nbsp;</span>
          <select
            className="Converter__select-from"
            onChange={handleChangeFromCurr}
            value={selectFrom}
          >
            {currency?.map((item: TOptions) => {
              return (
                <option key={item.Value} value={JSON.stringify(item)}>
                  {item.CharCode} ({item.Name})
                </option>
              )
            })}
          </select>
          <span>&nbsp; в &nbsp;</span>
          <select
            className="Converter__select-to"
            onChange={handleChangeToCurr}
            value={selectTo}
          >
            {currency?.map((item: TOptions) => {
              return (
                <option key={item.Value} value={JSON.stringify(item)}>
                  {item.CharCode} ({item.Name})
                </option>
              )
            })}
          </select>
        </div>
        <div className="Converter__body-row-2">
          <input
            type="text"
            className="Converter__input-from"
            onChange={convertCurr}
          />
          <input
            type="text"
            className="Converter__input-to"
            disabled={true}
            value={convertedValue}
          />
        </div>
      </div>
      <div className="Converter__footer" onClick={changeCurr}>
        поменять валюты местами
      </div>
    </div>
  )
}

export default Converter
