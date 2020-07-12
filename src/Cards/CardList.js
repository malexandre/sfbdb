import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CardCard from './CardCard'
import { CardType } from '../types'


export default class CardList extends Component {
  render() {
    return (
      <div className="row">
        {this.props.cards.map((card) => (
          <div className="col-xl-3 col-md-4 col-sm-6 col-12 d-flex align-items-stretch" key={ card.number }>
            <CardCard card={ card } />
          </div>
        ))}
      </div>
    )
  }
}

CardList.propTypes = {
  cards: PropTypes.arrayOf(CardType)
}
