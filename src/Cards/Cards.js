import React, { Component } from 'react'
import data from '../data.json'
import CardFilter from './CardFilter'
import CardList from './CardList'


const CARDS = [].concat.apply([], Object.values(data).map((champion) => champion.cards))

const DEFAULT_STATE = {
  red: true,
  yellow: true,
  blue: true,
  attack: true,
  skill: true,
  reaction: true,
  english: true,
  french: true,

  dug: true,
  gol: true,
  gwa: true,
  kil: true,
  tzu: true,
  der: true,
  rat: true,
  mar: true,
  kor: true,
  lor: true,
  nev: true,
  taz: true,
  kol: true,
  sul: true,
  akh: true,

  search: ""
}

function normalizeString(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,/#!$%^&*;:{}=\-_'"`~()]/g, " ")
    .replace(/\s{2,}/g, " ")
    .toLowerCase()
    .trim()
}

export default class Cards extends Component {
  constructor(props) {
    super(props)

    this.state = DEFAULT_STATE

    this.handleInputChange = this.handleInputChange.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  handleInputChange(event) {
    const target = event.target
    const value = [
      'red', 'blue', 'yellow', 'attack', 'skill', 'reaction', 'english', 'french',
      'dug', 'gol', 'gwa', 'kil', 'tzu', 'der', 'rat', 'mar', 'kor', 'lor', 'nev', 'taz', 'kol', 'sul', 'akh'
    ].includes(target.name) ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  resetState() {
    this.setState(DEFAULT_STATE)
  }

  render() {
    let langWanted = 'i18n'
    if (this.state.english && !this.state.french) {
      langWanted = 'en'
    }
    else if (!this.state.english && this.state.french) {
      langWanted = 'fr'
    }

    const searches = normalizeString(this.state.search).split(' ')

    const cards = CARDS.filter((card) => {
      for (const search of searches) {
        if (!card.metadata.searchData[langWanted].includes(search)) {
          return false
        }

        if (!this.state[card.color]) {
          return false
        }

        if (!this.state[card.type]) {
          return false
        }

        if (!this.state[normalizeString(card.number.slice(0, 3))]) {
          return false
        }
      }

      return true
    })

    return (
      <div>
        <CardFilter filter={ this.state } onInputChange={ this.handleInputChange } onReset={ this.resetState } />
        <CardList cards={ cards } />
      </div>
    )
  }
}
