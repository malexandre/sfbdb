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
        </div>
        <div className="card-body">
          <dl class="row card-details">
            {card.movement !== 0 && [
              <dt class="col-sm-7">Mouvement</dt>,
              <dd class="col-sm-5">{ card.movement }</dd>
            ]}

            {card.range !== null && ([
              <dt class="col-sm-7">Portée</dt>,
              <dd class="col-sm-5">
                { card.range.min } - { card.range.max }
              </dd>
            ])}

            {card.range !== null && ([
              <dt class="col-sm-7">Type de tir</dt>,
              <dd class="col-sm-5">
                { card.range.direct ? "direct" : "indirect" }
              </dd>
            ])}

            {card.range === null && card.aoe !== null && ([
              <dt class="col-sm-7">Zone d'effet</dt>,
              <dd class="col-sm-5">{ card.aoe } case{card.aoe !== 1 && "s"}</dd>
            ])}

            {card.strength !== null && ([
              <dt class="col-sm-7">Force</dt>,
              <dd class="col-sm-5">{ card.strength }</dd>
            ])}

            {card.defense !== null && ([
              <dt class="col-sm-7">Défense</dt>,
              <dd class="col-sm-5">{ card.defense }</dd>
            ])}
          </dl>
          <div>
            { card.text.fr.map((text) => (<p>{ text }</p>)) }
          </div>
        </div>
      </div>
    )
  }
}

CardCard.propTypes = {
  card: CardType
}
