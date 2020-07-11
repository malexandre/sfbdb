import React, { Component } from 'react'
import { DropletFill, OctagonFill, HeartFill, Heart, Shield, ShieldSlashFill, LayersFill } from 'react-bootstrap-icons'

import "./ChampionCard.css"
import { ChampionType } from '../types'

export default class ChampionCard extends Component {
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
      <div className="card w-100 mb-4">
        <div className="card-body">
          <h2 className="card-title text-center">{ champion.name }</h2>
          <p className="text-center"><Heart /> { champion.hp } <Shield /> { champion.defense }</p>
          <div className="text-center"><i>Expérimenté :</i></div>
          <p className="text-center"><Heart /> { champion.levelUp.hp } <Shield /> { champion.levelUp.defense }</p>
          <p className="level-up-power text-muted" title={ champion.levelUp.fr }>{ champion.levelUp.fr }</p>
          <table className={`${tableColor} rounded m-auto text-center`}>
            <tbody>
            <tr>
              <td className="px-2 pt-2"><DropletFill title="Nombre d'attaques" /></td>
              <td className="px-2 pt-2"><OctagonFill title="Nombre de cartes de contrôle" /></td>
              <td className="px-2 pt-2"><LayersFill title="Nombre de cartes permettant de piocher ou planifier" /></td>
              <td className="px-2 pt-2"><HeartFill title="Nombre de cartes de soin" /></td>
              <td className="px-2 pt-2"><ShieldSlashFill title="Nombre de cartes anti-armure" /></td>
            </tr>
            <tr>
              <td className="px-2 pb-2">{ champion.metadata.total.attack }</td>
              <td className="px-2 pb-2">{ champion.metadata.total.control }</td>
              <td className="px-2 pb-2">{ champion.metadata.total.deckManagement }</td>
              <td className="px-2 pb-2">{ champion.metadata.total.heal + champion.metadata.total.selfHeal }</td>
              <td className="px-2 pb-2">{ champion.metadata.total.textDamages +  champion.metadata.total.antiDefense }</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

ChampionCard.propTypes = {
  champion: ChampionType
}
