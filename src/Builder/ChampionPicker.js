import React, { Component } from 'react'
import PropTypes from 'prop-types'

import "./ChampionPicker.css"
import { ChampionType } from '../types'
import { PlusCircle } from 'react-bootstrap-icons'
import ChampionCard from '../champions/ChampionCard'


class EmptySlot extends Component {
  render() {
    return (
      <div className="card w-100 h-100">
        <div className="card-body h-100 d-flex flex-column justify-content-center align-items-center">
          <PlusCircle size="50" color="grey" />
        </div>
      </div>
    )
  }
}

class Slot extends Component {
  constructor(props) {
    super(props)

    this.handlePickSlot = this.handlePickSlot.bind(this);
    this.handleClearSlot = this.handleClearSlot.bind(this);
  }

  handlePickSlot(event) {
    this.props.onPickSlot(this.props.team, this.props.slot)
  }

  handleClearSlot(champion) {
    this.props.onClearSlot(this.props.team, this.props.slot)
  }

  render() {
    return (
      <div className="mb-4 mr-4 team-champion-card">
        <div className="w-100 h-100" onClick={ this.handlePickSlot }>
          {!this.props.champion ?
            <EmptySlot /> :
            <ChampionCard
              champion={ this.props.champion }
              shortVersion={ true }
              onChampionClearClick={ this.handleClearSlot }
            />
          }
        </div>
      </div>
    )
  }
}

export default class ChampionPicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      range: [...Array(this.props.size).keys()]
    }
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      range: [...Array(nextProps.size).keys()]
    }
  }

  render() {
    const champions = this.props.champions
    return (
      <div className="d-flex flex-row justify-content-center flex-nowrap">
        {this.state.range.map((slot) => (
          <Slot
            team={ this.props.team }
            slot={ slot }
            champion={ champions ? champions[slot] : null }
            onPickSlot={ this.props.onPickSlot }
            onClearSlot={ this.props.onClearSlot }
            key={ slot }
          />
        ))}

      </div>
    )
  }
}

ChampionPicker.propTypes = {
  team: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  activeSlot: PropTypes.number,
  champions: PropTypes.arrayOf(ChampionType),
  onPickSlot: PropTypes.func.isRequired,
  onClearSlot: PropTypes.func.isRequired
}
