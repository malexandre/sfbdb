import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { DropletFill, OctagonFill, HeartFill, ShieldSlashFill, LayersFill, DashCircleFill, FileArrowUpFill } from 'react-bootstrap-icons'
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

class Champions extends Component {
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
    this.handleSearchInputClear = this.handleSearchInputClear.bind(this);
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

  handleSearchInputClear() {
    this.setState({ search: "" })
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

        if (!(
          (this.state.red && champion.metadata.reactionColor.includes("red")) ||
          (this.state.blue && champion.metadata.reactionColor.includes("blue")) ||
          (this.state.yellow && champion.metadata.reactionColor.includes("yellow"))
        )) {
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
        <div className="card bg-light text-muted mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-lg">
                <DropletFill />&nbsp;
                <span className="legends">{ this.props.t("Nombre d'attaques") }</span>
              </div>
              <div className="col-lg">
                <OctagonFill />&nbsp;
                <span className="legends">{ this.props.t("Nombre de cartes de contrôle") }</span>
              </div>
              <div className="col-lg">
                <LayersFill />&nbsp;
                <span className="legends">{ this.props.t("Nombre de cartes permettant de piocher ou planifier") }</span>
              </div>
              <div className="col-lg">
                <DashCircleFill />&nbsp;
                <span className="legends">{ this.props.t("Nombre de cartes sans mouvement") }</span>
              </div>
              <div className="col-lg">
                <HeartFill />&nbsp;
                <span className="legends">{ this.props.t("Nombre de cartes de soin") }</span>
              </div>
              <div className="col-lg">
                <FileArrowUpFill />&nbsp;
                <span className="legends">{ this.props.t("Nombre de cartes de buff") }</span>
              </div>
              <div className="col-lg">
                <ShieldSlashFill />&nbsp;
                <span className="legends">{ this.props.t("Nombre de cartes anti-armure") }</span>
              </div>
            </div>
          </div>
        </div>
        <ChampionFilter
          filter={ this.state }
          onInputChange={ this.handleInputChange }
          onClearSearchInput={ this.handleSearchInputClear }
        />
        <ChampionList champions={ champions } onChampionClick={ this.props.onChampionClick } />
      </div>
    )
  }
}

export default withTranslation()(Champions)
