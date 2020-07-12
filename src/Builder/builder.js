import React, { Component } from 'react'
import ChampionPicker from './ChampionPicker'

import Champions from '../champions/Champions'

const DEFAULT_STATE = {
  draftMode: "0",
  teamSize: 3,
  activeTeam: 0,
  activeSlot: 0,
  teams: [[null, null, null]]
}

function resizeArray(arr, size, defaultValue) {
  while(size > arr.length) {
    arr.push(defaultValue);
  }
  arr.length = size;
}

function resizeTeams(teams, draftMode) {
  const results = teams.map((team) => [...team]) // deepcopy
  const teamSize = draftMode === "0" ? 3 : 5

  resizeArray(results, draftMode === "2" ? 2 : 1, [null, null, null, null, null])

  for (const team of results) {
    resizeArray(team, teamSize, null)
  }

  return results
}

function mapTeamsToChampionIds(teams) {
  const flattenList = [].concat.apply([], teams)

  return flattenList
    .filter((champion) => champion !== null)
    .map((champion) => champion.id)
}


export default class Builder extends Component {
  constructor(props) {
    super(props)

    this.state = DEFAULT_STATE
    this.handleDraftModeChange = this.handleDraftModeChange.bind(this)
    this.handleChampionClick = this.handleChampionClick.bind(this)
    this.handleClearSlot = this.handleClearSlot.bind(this)
    this.handlePickSlot = this.handlePickSlot.bind(this)
  }

  handleDraftModeChange(event) {
    const draftMode = event.target.value
    const teamSize = draftMode === "0" ? 3 : 5
    this.setState({
      draftMode,
      teamSize,
      teams: resizeTeams(this.state.teams, draftMode)
    })
  }

  handleChampionClick(champion) {
    const results = this.state.teams.map((team) => [...team]) // deepcopy
    results[this.state.activeTeam][this.state.activeSlot] = champion
    this.setState({ teams: results })
  }

  handlePickSlot(team, slot) {
    this.setState({ activeTeam: team, activeSlot: slot })
  }

  handleClearSlot(team, slot) {
    const results = this.state.teams.map((team) => [...team]) // deepcopy
    results[team][slot] = null
    this.setState({ teams: results })
  }

  render() {
    return (
      <div>
        <div className="row text-center">
          <div className="col-12">
            <label><b>Mode de draft</b></label>
            <div className="form-group d-flex flex-column flex-md-row align-items-center justify-content-center">
              <div className="form-check form-check-inline">
                <label>
                  <input
                    type="radio"
                    name="draftMode"
                    value="0"
                    checked={ this.state.draftMode === "0" }
                    className="form-check-input"
                    onChange={ this.handleDraftModeChange }
                  />
                  Amicale
                </label>
              </div>
              <div className="form-check form-check-inline">
                <label>
                  <input
                    type="radio"
                    name="draftMode"
                    value="1"
                    checked={ this.state.draftMode === "1" }
                    className="form-check-input"
                    onChange={ this.handleDraftModeChange }
                  />
                  Draft Compétitive
                </label>
              </div>
              <div className="form-check form-check-inline">
                <label>
                  <input
                    type="radio"
                    name="draftMode"
                    value="2"
                    checked={ this.state.draftMode === "2" }
                    className="form-check-input"
                    onChange={ this.handleDraftModeChange }
                  />
                  Double Draft Compétitive
                </label>
              </div>
            </div>
          </div>
        </div>

        <div>
          {this.state.draftMode === "2" && <h4 className="text-center">Équipe 1</h4>}
          <ChampionPicker
            team={ 0 }
            size={ this.state.teamSize }
            champions={ this.state.teams[0] }
            activeSlot={ this.state.activeSlot }
            onPickSlot={ this.handlePickSlot }
            onClearSlot={ this.handleClearSlot }
          />
          {this.state.draftMode === "2" && [
            <h4 className="text-center" key="teamTitle">Équipe 2</h4>,
            <ChampionPicker
              team={ 1 }
              size={ this.state.teamSize }
              champions={ this.state.teams[1] }
              activeSlot={ this.state.activeSlot }
              onPickSlot={ this.handlePickSlot }
              onClearSlot={ this.handleClearSlot }
              key="teamPicker"
            />
          ]}
        </div>

        <div className="mt-4">
          <Champions
            onChampionClick={ this.handleChampionClick }
            filteredChapionId={ mapTeamsToChampionIds(this.state.teams) } />
        </div>
      </div>
    )
  }
}
