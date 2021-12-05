import React from 'react'
import './index.scss'

const Converter: React.FC = () => {
  return (
    <div className="Converter">
      <h1 className="Converter__title">Конвертер валют</h1>
      <div className="Converter__body">
        <div className="Converter__body-row-1">
          <span>Вы переводите из &nbsp;</span>
          <select className="Converter__select-from"></select>
          <span>&nbsp; в &nbsp;</span>
          <select className="Converter__select-to"></select>{' '}
        </div>
        <div className="Converter__body-row-2">
          <input type="text" className="Converter__input-from" />
          <input type="text" className="Converter__input-to" />
        </div>
      </div>
      <div className="Converter__footer">поменять валюты местами</div>
    </div>
  )
}

export default Converter
