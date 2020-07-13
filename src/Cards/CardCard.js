import React, { Component } from 'react'

import "./CardCard.css"
import { CardType } from '../types'

function translateType(type) {
  switch(type) {
    case 'attack':
      return 'Attaque'
    case 'skill':
      return 'Compétence'
    default:
      return 'Réaction'
  }
}


export default class CardCard extends Component {
  render() {
    const card = this.props.card

    let cardColor = "primary"

    if (card.color === "red") {
      cardColor = "danger"
    }
    else if (card.color === "yellow") {
      cardColor = "warning"
    }

    return (
      <div className={ `card border-${cardColor} w-100 mb-4` }>
        <div className={ `card-header text-center header-bg-${card.color} d-flex flex-column justify-content-center` }>
          <h5 className="m-0">{ card.name.fr }</h5>
          <div className="card-champion-name">{ card.metadata.championName } · { translateType(card.type) }</div>
        </div>
        <div className="card-body">
          <dl className="row card-details">
            {card.movement !== 0 && [
              <dt className="col-7" key="movement">Mouvement</dt>,
              <dd className="col-5" key="cardMovement">{ card.movement }</dd>
            ]}

            {card.range !== null && ([
              <dt className="col-7" key="range">Portée</dt>,
              <dd className="col-5" key="cardRange">
                { card.range.min } - { card.range.max }
              </dd>
            ])}

            {card.range !== null && ([
              <dt className="col-7" key="rangeType">Type de tir</dt>,
              <dd className="col-5" key="cardRangeType">
                { card.range.direct ? "direct" : "indirect" }
              </dd>
            ])}

            {card.range === null && card.aoe !== null && ([
              <dt className="col-7" key="aoe">Zone d'effet</dt>,
              <dd className="col-5" key="cardAoe">{ card.aoe } case{card.aoe !== 1 && "s"}</dd>
            ])}

            {card.strength !== null && ([
              <dt className="col-7" key="strength">Force</dt>,
              <dd className="col-5" key="cardStrength">{ card.strength }</dd>
            ])}

            {card.defense !== null && ([
              <dt className="col-7" key="defense">Défense</dt>,
              <dd className="col-5" key="cardDefense">{ card.defense }</dd>
            ])}
          </dl>
          <div className="card-power">
            { card.text.fr.map((text, idx) => (<p key={ idx }>{ text }</p>)) }
          </div>
        </div>
      </div>
    )
  }
}

CardCard.propTypes = {
  card: CardType
}
