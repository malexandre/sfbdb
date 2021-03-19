import React, { Component } from 'react'
import data from '../data.json'
import CardFilter from './CardFilter'
import CardList from './CardList'


const CARDS = [].concat.apply([], Object.values(data).map((champion) => champion.cards))
const CHAMPIONS = Object.values(data).map((champion) => ({ id: champion.id.toLowerCase(), name: champion.name }))

const DEFAULT_STATE = {
  red: true,
  yellow: true,
  blue: true,
  attack: true,
  skill: true,
  reaction: true,
  english: true,
  french: true,

  search: ""
}

for (const { id } of CHAMPIONS) {
  DEFAULT_STATE[id] = true;
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
    this.handleSearchInputClear = this.handleSearchInputClear.bind(this);
    this.selectAllChampionsFilters = this.selectAllChampionsFilters.bind(this);
    this.deselectAllChampionsFilters = this.deselectAllChampionsFilters.bind(this);
  }

  handleInputChange(event) {
    const target = event.target
    const value = [
      'red', 'blue', 'yellow', 'attack', 'skill', 'reaction', 'english', 'french', ...CHAMPIONS.map((champion) => champion.id)
    ].includes(target.name) ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSearchInputClear() {
    this.setState({ search: "" })
  }

  selectAllChampionsFilters() {
    const newState = {}

    for (const { id } of CHAMPIONS) {
      newState[id] = true;
    }

    this.setState(newState)
  }

  deselectAllChampionsFilters() {
    const newState = {}

    for (const { id } of CHAMPIONS) {
      newState[id] = false;
    }

    this.setState(newState)
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
      <div className="container mt-4">
        <CardFilter
          champions={ CHAMPIONS }
          filter={ this.state }
          onInputChange={ this.handleInputChange }
          onClearSearchInput={ this.handleSearchInputClear }
          onSelectAllChampions={ this.selectAllChampionsFilters }
          onDeselectAllChampions={ this.deselectAllChampionsFilters }
        />
        <CardList cards={ cards } />
      </div>
    )
  }
}
