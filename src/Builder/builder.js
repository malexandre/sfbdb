import React, { Component } from 'react'
import ChampionPicker from './ChampionPicker'
import {CopyToClipboard} from 'react-copy-to-clipboard'

import Champions from '../champions/Champions'
import { buildDeckCode, parseDeckCode } from '../deckCode';

const DEFAULT_STATE = {
  draftMode: "0",
  teamSize: 3,
  activeTeam: 0,
  activeSlot: 0,
  teams: [[null, null, null]],
  deckCode: null,
  copyAlert: false,
  timeout: null
}

function resizeArray(arr, size, defaultValue) {
  while(size > arr.length) {
    arr.push(defaultValue);
  }
  arr.length = size;
}

export default class Builder extends Component {
  constructor(props) {
    super(props)

    this.state = Object.assign(DEFAULT_STATE, props.match.params.deckCode ? {
      teams: parseDeckCode(props.match.params.deckCode),
      deckCode: props.match.params.deckCode
    } : {})
    this.handleDraftModeChange = this.handleDraftModeChange.bind(this)
    this.handleChampionClick = this.handleChampionClick.bind(this)
    this.handleClearSlot = this.handleClearSlot.bind(this)
    this.handlePickSlot = this.handlePickSlot.bind(this)
    this.mapTeamsToChampionIds = this.mapTeamsToChampionIds.bind(this)
    this.resizeTeams = this.resizeTeams.bind(this)
    this.buildNewDeckCodeAndUpdateHistory = this.buildNewDeckCodeAndUpdateHistory.bind(this)
    this.onCopyToClipboard = this.onCopyToClipboard.bind(this)
    this.onCloseCopyAlert = this.onCloseCopyAlert.bind(this)
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

  buildNewDeckCodeAndUpdateHistory(teams) {
    const flattenTeams = [].concat.apply([], teams)
    const deckCode =
      flattenTeams.filter((champion) => champion === null).length === 0 ? buildDeckCode(teams) : null

    if (deckCode && deckCode !== this.state.deckCode) {
      this.props.history.push(`/builder/${deckCode}`)
    }
    else if (!deckCode && this.state.deckCode) {
      this.props.history.push(`/builder`)
    }

    return deckCode
  }

  onCopyToClipboard() {
    if (this.state.timeout) {
      window.clearTimeout(this.state.timeout)
    }

    const timeout = setTimeout(() => {
      this.setState({ copyAlert: false, timeout: null })
    }, 5000)

    this.setState({ copyAlert: true, timeout })
  }

  onCloseCopyAlert() {
    if (this.state.timeout) {
      window.clearTimeout(this.state.timeout)
    }

    this.setState({ copyAlert: false, timeout: null })
  }

  handleDraftModeChange(event) {
    const draftMode = event.target.value
    const teamSize = draftMode === "0" ? 3 : 5
    const teams = this.resizeTeams(this.state.teams, draftMode)

    this.setState({
      draftMode,
      teamSize,
      teams,
      deckCode: this.buildNewDeckCodeAndUpdateHistory(teams)
    })
  }

  handleChampionClick(champion) {
    const results = this.state.teams.map((team) => [...team]) // deepcopy
    results[this.state.activeTeam][this.state.activeSlot] = champion

    this.setState({
      teams: results,
      deckCode: this.buildNewDeckCodeAndUpdateHistory(results)
    })
  }

  handlePickSlot(team, slot) {
    this.setState({ activeTeam: team, activeSlot: slot })
  }

  handleClearSlot(team, slot) {
    const results = this.state.teams.map((team) => [...team]) // deepcopy
    results[team][slot] = null

    this.setState({
      teams: results,
      deckCode: this.buildNewDeckCodeAndUpdateHistory(results)
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
                <p>{ this.state.deckCode }</p>
                <CopyToClipboard text={ this.state.deckCode } onCopy={ this.onCopyToClipboard }>
                  <button className="btn btn-outline-secondary">Copier le code</button>
                </CopyToClipboard>
                {" "}
                <CopyToClipboard text={ window.location.href } onCopy={ this.onCopyToClipboard }>
                  <button className="btn btn-outline-secondary">Copier l'URL</button>
                </CopyToClipboard>
                {this.state.copyAlert && (
                  <div className="alert alert-success mx-auto mt-4 w-50" role="alert">
                    C'est copié !
                    <button type="button" className="close" aria-label="Close" onClick={ this.onCloseCopyAlert }>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                )}
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
