import React, { Component } from 'react'
import PropTypes from 'prop-types'

import "./ChampionPicker.css"
import { ChampionType } from '../types'
import { PlusCircle } from 'react-bootstrap-icons'
import ChampionCard from '../champions/ChampionCard'


class EmptySlot extends Component {
  render() {
    return (
      <div className={ `card w-100 h-100 ${this.props.active && "border border-success"}` }>
        <div className="card-body h-100 d-flex flex-column justify-content-center align-items-center">
          <PlusCircle size="50" color={ this.props.active ? "#28a745" : "lightgray" } />
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
    const cardRect = event.target.closest(".card").getBoundingClientRect()
    if (cardRect.left < 0) {
      const padding = this.props.slot > 0 ? 100 : 10
      this.props.updateSlide(-cardRect.left + padding)
    }
    else if (cardRect.right > (window.innerWidth || document.documentElement.clientWidth)) {
      const padding = this.props.slot < this.props.size - 1 ? 100 : 15
      this.props.updateSlide((window.innerWidth || document.documentElement.clientWidth) - cardRect.right - padding)
    }
    else if (this.props.slot > 0 && cardRect.left < 100) {
      this.props.updateSlide(cardRect.left + 100)
    }
    else if (
      this.props.slot < this.props.size - 1 &&
      (window.innerWidth || document.documentElement.clientWidth) - cardRect.right < 100
    ) {
      this.props.updateSlide((window.innerWidth || document.documentElement.clientWidth) - cardRect.right - 100)
    }

    this.props.onPickSlot(this.props.team, this.props.slot)
  }

  handleClearSlot() {
    this.props.onClearSlot(this.props.team, this.props.slot)
  }

  render() {
    return (
      <div className="mb-4 mx-2 team-champion-card">
        <div className="w-100 h-100" onClick={ this.handlePickSlot }>
          {!this.props.champion ?
            <EmptySlot active={ this.props.active } /> :
            <ChampionCard
              champion={ this.props.champion }
              active={ this.props.active }
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
      range: [...Array(this.props.size).keys()],
      slide: 0,
      size: props.size
    }

    this.updateSlide = this.updateSlide.bind(this);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.size !== state.size) {
      return {
        range: [...Array(nextProps.size).keys()],
        slide: 0,
        size: nextProps.size
      }
    }

    return null
  }

  updateSlide(slide) {
    this.setState({ slide: slide + this.state.slide })
  }

  render() {
    const champions = this.props.champions

    return (
      <div
        className="d-flex flex-row justify-content-center flex-nowrap champion-pciker"
        style={ { transform: `translateX(${this.state.slide}px)` } }
      >
        {this.state.range.map((slot) => (
          <Slot
            team={ this.props.team }
            slot={ slot }
            size={ this.props.size }
            active={ this.props.team === this.props.activeTeam && this.props.activeSlot === slot }
            champion={ champions ? champions[slot] : null }
            onPickSlot={ this.props.onPickSlot }
            onClearSlot={ this.props.onClearSlot }
            updateSlide={ this.updateSlide }
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
  activeTeam: PropTypes.number,
  activeSlot: PropTypes.number,
  champions: PropTypes.arrayOf(ChampionType),
  onPickSlot: PropTypes.func.isRequired,
  onClearSlot: PropTypes.func.isRequired
}
