import React, { Component } from 'react'
import ChampionPicker from './ChampionPicker'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import { Trans } from 'react-i18next';

import Champions from '../champions/Champions'
import { buildDeckCode, parseDeckCode } from '../deckCode';
import data from '../data.json';

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

function formatParsedData(parsedData) {
  return {
    draftMode: `${parsedData.draftMode}`,
    teams: parsedData.teams.map((team) => team.map((member) => {
      const champion = data[member];

      if (!champion) {
        return null;
      }

      return champion;
    }))
  };
}

export default class Builder extends Component {
  constructor(props) {
    super(props)

    let state = Object.assign({}, DEFAULT_STATE)

    if (props.match.params.deckCode) {
      const parsedData = parseDeckCode(props.match.params.deckCode)
      state = Object.assign(
        state,
        formatParsedData(parsedData),
        {
          deckCode: props.match.params.deckCode,
          teamSize: parsedData.draftMode === 0 ? 3 : 5
        }
      )
    }
    this.state = state
    this.handleDraftModeChange = this.handleDraftModeChange.bind(this)
    this.handleChampionClick = this.handleChampionClick.bind(this)
    this.handleClearSlot = this.handleClearSlot.bind(this)
    this.handlePickSlot = this.handlePickSlot.bind(this)
    this.mapTeamsToChampionIds = this.mapTeamsToChampionIds.bind(this)
    this.resizeTeams = this.resizeTeams.bind(this)
    this.buildNewDeckCodeAndUpdateHistory = this.buildNewDeckCodeAndUpdateHistory.bind(this)
    this.onCopyToClipboard = this.onCopyToClipboard.bind(this)
    this.onCloseCopyAlert = this.onCloseCopyAlert.bind(this)
    this.findNextAvailableSlot = this.findNextAvailableSlot.bind(this)
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

  buildNewDeckCodeAndUpdateHistory(draftMode, teams) {
    const formattedTeams = teams.map((team) => team.map((member) => member ? member.id : null))
    const flattenTeams = [].concat.apply([], formattedTeams)
    const deckCode =
      flattenTeams.filter((champion) => champion === null).length === 0 ?
        buildDeckCode(parseInt(draftMode), formattedTeams) :
        null

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
      deckCode: this.buildNewDeckCodeAndUpdateHistory(draftMode, teams)
    })
  }

  findNextAvailableSlot(teams) {
    const slotPerTeam = [...Array(this.state.teamSize).keys()]

    const teamIndexes = [...Array(teams.length).keys()]
    const slotIndexes = [
      ...slotPerTeam.slice(this.state.activeSlot + 1),
      ...slotPerTeam.slice(0, this.state.activeSlot)
    ]

    for (const slotIdx of slotIndexes) {
      if (!teams[this.state.activeTeam][slotIdx]) {
        return {
          activeTeam: this.state.activeTeam,
          activeSlot: slotIdx
        }
      }
    }

    for (const teamIdx of teamIndexes) {
      for (const slotIdx of slotPerTeam) {
        if (!teams[teamIdx][slotIdx]) {
          return {
            activeTeam: teamIdx,
            activeSlot: slotIdx
          }
        }
      }
    }

    // default value, don't change picked slot
    return {
      activeTeam: this.state.activeTeam,
      activeSlot: this.state.activeSlot
    }
  }

  handleChampionClick(champion) {
    const results = this.state.teams.map((team) => [...team]) // deepcopy
    results[this.state.activeTeam][this.state.activeSlot] = champion

    this.setState({
      teams: results,
      deckCode: this.buildNewDeckCodeAndUpdateHistory(this.state.draftMode, results),
      ...this.findNextAvailableSlot(results)
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
      deckCode: this.buildNewDeckCodeAndUpdateHistory(this.state.draftMode, results),
      ...(results[this.state.activeTeam][this.state.activeSlot] ? { activeTeam: team, activeSlot: slot } : {})
    })
  }

  render() {
    return (
      <div className="container-fluid mt-4">
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
                  <Trans>Amicale</Trans>
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
                  <Trans>Draft Compétitive</Trans>
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
                  <Trans>Double Draft Compétitive</Trans>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <Trans>Deck code :</Trans>
          { this.state.deckCode ? (
              <blockquote className="blockquote">
                <p>{ this.state.deckCode }</p>
                <CopyToClipboard text={ this.state.deckCode } onCopy={ this.onCopyToClipboard }>
                  <button className="btn btn-outline-secondary"><Trans>Copier le code</Trans></button>
                </CopyToClipboard>
                {" "}
                <CopyToClipboard text={ window.location.href } onCopy={ this.onCopyToClipboard }>
                  <button className="btn btn-outline-secondary"><Trans>Copier l'URL</Trans></button>
                </CopyToClipboard>
                {this.state.copyAlert && (
                  <div className="alert alert-success mx-auto mt-4 w-50" role="alert">
                    <Trans>C'est copié !</Trans>
                    <button type="button" className="close" aria-label="Close" onClick={ this.onCloseCopyAlert }>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                )}
              </blockquote>
            ) : <div><i><Trans>Le code sera généré une fois la compo finie</Trans></i></div> }
        </div>

        <div>
          {this.state.draftMode === "2" && <h4 className="text-center"><Trans>Équipe 1</Trans></h4>}
          <ChampionPicker
            team={ 0 }
            size={ this.state.teamSize }
            champions={ this.state.teams[0] }
            activeTeam={ this.state.activeTeam }
            activeSlot={ this.state.activeSlot }
            onPickSlot={ this.handlePickSlot }
            onClearSlot={ this.handleClearSlot }
          />
          {this.state.draftMode === "2" && [
            <h4 className="text-center" key="teamTitle"><Trans>Équipe 2</Trans></h4>,
            <ChampionPicker
              team={ 1 }
              size={ this.state.teamSize }
              champions={ this.state.teams[1] }
              activeTeam={ this.state.activeTeam }
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
