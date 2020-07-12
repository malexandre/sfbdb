import React, { Component } from 'react'

import "./CardCard.css"
import { CardType } from '../types'


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
          <div>Type : { card.type }</div>
          <h5>{ card.name.fr }</h5>
          <div className="card-champion-name">{ card.metadata.championName }</div>
        </div>
        <div className="card-body">
          <dl className="row card-details">
            {card.movement !== 0 && [
              <dt className="col-sm-7" key="movement">Mouvement</dt>,
              <dd className="col-sm-5" key="cardMovement">{ card.movement }</dd>
            ]}

            {card.range !== null && ([
              <dt className="col-sm-7" key="range">Portée</dt>,
              <dd className="col-sm-5" key="cardRange">
                { card.range.min } - { card.range.max }
              </dd>
            ])}

            {card.range !== null && ([
              <dt className="col-sm-7" key="rangeType">Type de tir</dt>,
              <dd className="col-sm-5" key="cardRangeType">
                { card.range.direct ? "direct" : "indirect" }
              </dd>
            ])}

            {card.range === null && card.aoe !== null && ([
              <dt className="col-sm-7" key="aoe">Zone d'effet</dt>,
              <dd className="col-sm-5" key="cardAoe">{ card.aoe } case{card.aoe !== 1 && "s"}</dd>
            ])}

            {card.strength !== null && ([
              <dt className="col-sm-7" key="strength">Force</dt>,
              <dd className="col-sm-5" key="cardStrength">{ card.strength }</dd>
            ])}

            {card.defense !== null && ([
              <dt className="col-sm-7" key="defense">Défense</dt>,
              <dd className="col-sm-5" key="cardDefense">{ card.defense }</dd>
            ])}
          </dl>
          <div>
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
