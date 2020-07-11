import React, { Component } from 'react'
import data from "../data.json"
import ChampionList from './ChampionList'

export default class Champions extends Component {
  render() {
    return (
      <div>
        <ChampionList champions={ Object.values(data) } />
      </div>
    )
  }
}
