import React, { Component } from 'react'
import data from '../data.json'
import CardFilter from './CardFilter'
import CardList from './CardList'


const CARDS = [].concat.apply([], Object.values(data).map((champion) => champion.cards))

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

    this.state = {
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

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target
    const value = [
      'red', 'blue', 'yellow', 'attack', 'skill', 'reaction', 'english', 'french'
    ].includes(target.name) ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
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
      }

      return true
    })

    return (
      <div>
        <CardFilter filter={ this.state } onInputChange={ this.handleInputChange } />
        <CardList cards={ cards } />
      </div>
    )
  }
}
