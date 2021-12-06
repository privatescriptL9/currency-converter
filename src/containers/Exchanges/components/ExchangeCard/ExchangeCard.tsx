import React from 'react'
import './index.scss'

export interface ExchangeCardProps {
  Name: string
  Value: number
  CharCode: string
  Previous: number
  Nominal: number
}

const ExchangeCard: React.FC<ExchangeCardProps> = ({
  Name,
  Value,
  CharCode,
  Previous,
  Nominal
}) => {
  return (
    <div className="ExchangeCard">
      <div className="ExchangeCard__char-code">{CharCode}</div>
      <div>{Name}</div>
      {Previous !== Nominal && (
        <div className="ExchangeCard__previous">
          {(Previous / Nominal).toFixed(2) + ' ₽'}
        </div>
      )}
      <div className="ExchangeCard__current">
        Купить: {(Value / Nominal).toFixed(2) + ' ₽'}
      </div>
    </div>
  )
}

export default ExchangeCard
