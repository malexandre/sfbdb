import React, { Component } from 'react'

import "./CardCard.css"
import { CardType } from '../types'
import { Trans, withTranslation } from 'react-i18next'


class CardCard extends Component {
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
          <h5 className="m-0">{ card.name[this.props.i18n.language] }</h5>
          <div className="card-champion-name">{ card.metadata.championName } · { this.props.t(card.type) }</div>
        </div>
        <div className="card-body">
          <dl className="row card-details">
            {card.movement !== 0 && [
              <dt className="col-7" key="movement"><Trans>Mouvement</Trans></dt>,
              <dd className="col-5" key="cardMovement">{ card.movement }</dd>
            ]}

            {card.range !== null && ([
              <dt className="col-7" key="range"><Trans>Portée</Trans></dt>,
              <dd className="col-5" key="cardRange">
                { card.range.min } - { card.range.max }
              </dd>
            ])}

            {card.range !== null && ([
              <dt className="col-7" key="rangeType"><Trans>Type de tir</Trans></dt>,
              <dd className="col-5" key="cardRangeType">
                { card.range.direct ? "direct" : "indirect" }
              </dd>
            ])}

            {card.range === null && card.aoe !== null && ([
              <dt className="col-7" key="aoe"><Trans>Zone d'effet</Trans></dt>,
              <dd className="col-5" key="cardAoe">{ card.aoe } <Trans>case</Trans>{card.aoe !== 1 && "s"}</dd>
            ])}

            {card.strength !== null && ([
              <dt className="col-7" key="strength"><Trans>Force</Trans></dt>,
              <dd className="col-5" key="cardStrength">{ card.strength }</dd>
            ])}

            {card.defense !== null && ([
              <dt className="col-7" key="defense"><Trans>Défense</Trans></dt>,
              <dd className="col-5" key="cardDefense">{ card.defense }</dd>
            ])}
          </dl>
          <div className="card-power">
            { card.text[this.props.i18n.language].map((text, idx) => (<p key={ idx }>{ text }</p>)) }
          </div>
        </div>
      </div>
    )
  }
}

CardCard.propTypes = {
  card: CardType
}

export default withTranslation()(CardCard)
