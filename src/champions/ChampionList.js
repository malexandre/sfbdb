import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ChampionCard from './ChampionCard'
import { ChampionType } from '../types'


export default class ChampionList extends Component {
  render() {
    return (
      <div className="row">
        {this.props.champions.map((champion) => (
          <div className="col-xl-3 col-md-4 col-sm-6 col-12 d-flex align-items-stretch" key={ champion.id }>
            <ChampionCard champion={ champion } onChampionClick={ this.props.onChampionClick } />
          </div>
        ))}
      </div>
    )
  }
}

ChampionList.propTypes = {
  champions: PropTypes.arrayOf(ChampionType),
  onChampionClick: PropTypes.func
}
