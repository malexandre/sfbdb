import React, { Component } from 'react'
import data from '../data.json'
import ChampionFilter from './ChampionFilter'
import ChampionList from './ChampionList'


function normalizeString(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,/#!$%^&*;:{}=\-_'"`~()]/g, " ")
    .replace(/\s{2,}/g, " ")
    .toLowerCase()
    .trim()
}

export default class Champions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      red: true,
      yellow: true,
      blue: true,
      zeroDef: true,
      oneDef: true,
      twoDef: true,
      english: true,
      french: true,
      search: ""
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target
    const value = [
      'red', 'blue', 'yellow', 'zeroDef', 'oneDef', 'twoDef', 'english', 'french'
    ].includes(target.name) ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  render() {
    const defWanted = []
    if (this.state.zeroDef) {
      defWanted.push(0)
    }
    if (this.state.oneDef) {
      defWanted.push(1)
    }
    if (this.state.twoDef) {
      defWanted.push(2)
    }

    let langWanted = 'i18n'
    if (this.state.english && !this.state.french) {
      langWanted = 'en'
    }
    else if (!this.state.english && this.state.french) {
      langWanted = 'fr'
    }

    const searches = normalizeString(this.state.search).split(' ')

    const champions = Object.values(data).filter((champion) => {
      for (const search of searches) {
        if (!champion.metadata.searchData[langWanted].includes(search)) {
          return false
        }

        if (!this.state[champion.metadata.reactionColor]) {
          return false
        }

        if (!defWanted.includes(champion.defense)) {
          return false
        }

        if (this.props.filteredChapionId && this.props.filteredChapionId.includes(champion.id)) {
          return false
        }
      }

      return true
    })

    return (
      <div className="container mt-4">
        <ChampionFilter filter={ this.state } onInputChange={ this.handleInputChange } />
        <ChampionList champions={ champions } onChampionClick={ this.props.onChampionClick } />
      </div>
    )
  }
}
