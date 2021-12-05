import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ExchangeCard } from './components/ExchangeCard'
import { ExchangeCardProps } from './components/ExchangeCard/ExchangeCard'
import './index.scss'
import Carousel from 'react-elastic-carousel'

const Exchanges: React.FC = () => {
  const [exchanges, setExchanges] = useState(() => [])

  useEffect(() => {
    const getCurrency = async () => {
      const currency = await axios('https://www.cbr-xml-daily.ru/daily_json.js')
      const newData: any = []
      console.log(currency.data.Valute)

      for (let key in currency.data.Valute) {
        newData.push(currency.data.Valute[key])
      }

      setExchanges(newData)
    }

    getCurrency()
  }, [])

  return (
    <div className="Exchanges">
      <h1 className="Exchanges__title">Курсы валют</h1>
      <Carousel
        showArrows={false}
        pagination={true}
        isRTL={false}
        itemsToShow={4}
        className="Exchanges__cards"
      >
        {exchanges.map((exchange: ExchangeCardProps) => (
          <ExchangeCard
            CharCode={exchange.CharCode}
            Name={exchange.Name}
            Value={exchange.Value}
          />
        ))}
      </Carousel>
    </div>
  )
}

export default Exchanges
