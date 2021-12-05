import React from 'react'
import './index.scss'

export interface ExchangeCardProps {
  Name: string
  Value: number
  CharCode: string
}

const ExchangeCard: React.FC<ExchangeCardProps> = ({
  Name,
  Value,
  CharCode
}) => {
  return (
    <div className="ExchangeCard">
      <div className="ExchangeCard__char-code">{CharCode}</div>
      <div>{Name}</div>
      <div className="ExchangeCard__buy">Купить: {Value.toFixed(2) + ' ₽'}</div>
    </div>
  )
}

export default ExchangeCard
