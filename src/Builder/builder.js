import React, { Component } from 'react'
import ChampionPicker from './ChampionPicker'

import Champions from '../champions/Champions'
import { buildDeckCode } from '../deckCode';

const DEFAULT_STATE = {
  draftMode: "0",
  teamSize: 3,
  activeTeam: 0,
  activeSlot: 0,
  teams: [[null, null, null]],
  deckCode: null
}

function resizeArray(arr, size, defaultValue) {
  while(size > arr.length) {
    console.log("pushing", defaultValue)
    arr.push(defaultValue);
  }
  arr.length = size;
}

export default class Builder extends Component {
  constructor(props) {
    super(props)

    this.state = DEFAULT_STATE
    this.handleDraftModeChange = this.handleDraftModeChange.bind(this)
    this.handleChampionClick = this.handleChampionClick.bind(this)
    this.handleClearSlot = this.handleClearSlot.bind(this)
    this.handlePickSlot = this.handlePickSlot.bind(this)
    this.mapTeamsToChampionIds = this.mapTeamsToChampionIds.bind(this)
    this.resizeTeams = this.resizeTeams.bind(this)
  }

  mapTeamsToChampionIds() {
    const flattenList = [].concat.apply([], this.state.teams)

    return flattenList
      .filter((champion) => champion !== null)
      .map((champion) => champion.id)
  }

  resizeTeams(teams, draftMode) {
    const results = teams.map((team) => [...team]) // deepcopy
    const teamSize = draftMode === "0" ? 3 : 5

    resizeArray(results, draftMode === "2" ? 2 : 1, [null, null, null, null, null])

    for (const team of results) {
      resizeArray(team, teamSize, null)
    }

    return results
  }

  handleDraftModeChange(event) {
    const draftMode = event.target.value
    const teamSize = draftMode === "0" ? 3 : 5
    const teams = this.resizeTeams(this.state.teams, draftMode)
    const flattenTeams = [].concat.apply([], teams)
    const deckCode =
      flattenTeams.filter((champion) => champion === null).length === 0 ? buildDeckCode(teams) : null

    this.setState({
      draftMode,
      teamSize,
      teams,
      deckCode
    })
  }

  handleChampionClick(champion) {
    const results = this.state.teams.map((team) => [...team]) // deepcopy
    results[this.state.activeTeam][this.state.activeSlot] = champion

    const flattenTeams = [].concat.apply([], results)
    const deckCode =
      flattenTeams.filter((champion) => champion === null).length === 0 ? buildDeckCode(results) : null

    this.setState({
      teams: results,
      deckCode
    })
  }

  handlePickSlot(team, slot) {
    this.setState({ activeTeam: team, activeSlot: slot })
  }

  handleClearSlot(team, slot) {
    const results = this.state.teams.map((team) => [...team]) // deepcopy
    results[team][slot] = null

    const flattenTeams = [].concat.apply([], results)
    const deckCode =
      flattenTeams.filter((champion) => champion === null).length === 0 ? buildDeckCode(results) : null

    this.setState({
      teams: results,
      deckCode
    })
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

        <div className="text-center mb-4">
          Deck code :
          { this.state.deckCode ? (
              <blockquote className="blockquote">
                <p className="mb-0">{ this.state.deckCode }</p>
              </blockquote>
            ) : <div><i>Le code sera généré une fois la compo finie</i></div> }
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
            filteredChapionId={ this.mapTeamsToChampionIds() } />
        </div>
      </div>
    )
  }
}
