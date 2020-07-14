import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropletFill, OctagonFill, HeartFill, Heart, Shield, ShieldSlashFill, LayersFill, DashCircleFill, FileArrowUpFill, ForwardFill } from 'react-bootstrap-icons'

import "./ChampionCard.css"
import { ChampionType } from '../types'
import { withTranslation } from 'react-i18next'

class ChampionCard extends Component {
  constructor(props) {
    super(props)

    this.handleCardClick = this.handleCardClick.bind(this)
    this.handleClearClick = this.handleClearClick.bind(this)
  }

  handleCardClick() {
    if (this.props.onChampionClick) {
      this.props.onChampionClick(this.props.champion)
    }
  }

  handleClearClick(event) {
    event.preventDefault()
    event.stopPropagation()
    if (this.props.onChampionClearClick) {
      this.props.onChampionClearClick(this.props.champion)
    }
  }

  render() {
    const champion = this.props.champion

    let tableColor = "table-primary"

    if (champion.metadata.reactionColor === "red") {
      tableColor = "table-danger"
    }
    else if (champion.metadata.reactionColor === "yellow") {
      tableColor = "table-warning"
    }

    return (
      <div className={ `card w-100 ${this.props.active && "border border-success"}` } onClick={ this.handleCardClick }>
        <div className="card-body">
          {this.props.onChampionClearClick && (
            <button type="button" className="close" aria-label="Clear pick" onClick={ this.handleClearClick }>
              <span aria-hidden="true">&times;</span>
            </button>
          )}
          <h4 className="card-title text-center">{ champion.name }</h4>
          <div className="text-center champion-hp mb-3">
            <Heart /> { champion.hp } <Shield /> { champion.defense }
            <ForwardFill className="mx-2" />
            <Heart /> { champion.levelUp.hp } <Shield /> { champion.levelUp.defense }
          </div>
          {!this.props.shortVersion && (
            <p
              className="level-up-power text-muted"
              title={ champion.levelUp[this.props.i18n.language] }
            >
              { champion.levelUp[this.props.i18n.language] }
            </p>
          )}
          <table className={`${tableColor} rounded m-auto text-center`}>
            <tbody>
            <tr>
              <td
                className="px-1 pt-2"
                title={ this.props.t("Nombre d'attaques") }
              >
                <DropletFill />
              </td>
              <td
                className="px-1 pt-2"
                title={ this.props.t("Nombre de cartes de contrôle") }
              >
                <OctagonFill />
              </td>
              <td
                className="px-1 pt-2"
                title={ this.props.t("Nombre de cartes permettant de piocher ou planifier") }
              >
                <LayersFill />
              </td>
              <td
                className="px-1 pt-2"
                title={ this.props.t("Nombre de cartes sans mouvement") }
              >
                <DashCircleFill /></td>
              <td
                className="px-1 pt-2"
                title={ this.props.t("Nombre de cartes de soin") }
              >
                <HeartFill />
              </td>
              <td
                className="px-1 pt-2"
                title={ this.props.t("Nombre de cartes de buff") }
              >
                <FileArrowUpFill /></td>
              <td
                className="px-1 pt-2"
                title={ this.props.t("Nombre de cartes anti-armure") }
              >
                <ShieldSlashFill />
              </td>
            </tr>
            <tr>
              <td className="px-1 pb-2">{ champion.metadata.total.attack }</td>
              <td className="px-1 pb-2">{ champion.metadata.total.control }</td>
              <td className="px-1 pb-2">{ champion.metadata.total.deckManagement }</td>
              <td className="px-1 pb-2">{ champion.metadata.total.withoutMove }</td>
              <td className="px-1 pb-2">{ champion.metadata.total.heal + champion.metadata.total.selfHeal }</td>
              <td className="px-1 pb-2">{ champion.metadata.total.buff }</td>
              <td className="px-1 pb-2">{ champion.metadata.total.textDamages +  champion.metadata.total.antiDefense }</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

ChampionCard.propTypes = {
  champion: ChampionType,
  shortVersion: PropTypes.bool,
  active: PropTypes.bool,
  onChampionClick: PropTypes.func,
  onChampionClearClick: PropTypes.func
}

export default withTranslation()(ChampionCard)
