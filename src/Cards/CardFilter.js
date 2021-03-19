import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Trans, withTranslation } from 'react-i18next'
import SearchInput from '../SearchInput'
import { ChampionType } from '../types'
import { getTranslatedTextFromObject } from '../utils'


class CardFilter extends Component {
  render() {
    return (
      <div>
        <SearchInput
          search={ this.props.filter.search }
          onInputChange={ this.props.onInputChange }
          onClearSearchInput={ this.props.onClearSearchInput }
        />

        <div className="row text-center">
          <div className="col-4">
            <label><b><Trans>Couleur</Trans></b></label>
            <div className="form-group d-flex flex-column flex-lg-row align-items-center justify-content-center">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="red"
                  name="red"
                  checked={ this.props.filter.red }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="red"><Trans>Rouge</Trans></label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="yellow"
                  name="yellow"
                  checked={ this.props.filter.yellow }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="yellow"><Trans>Jaune</Trans></label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="blue"
                  name="blue"
                  checked={ this.props.filter.blue }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="blue"><Trans>Bleue</Trans></label>
              </div>
            </div>
          </div>
          <div className="col-4">
            <label><b><Trans>Type de carte</Trans></b></label>
            <div className="form-group d-flex flex-column flex-lg-row align-items-center justify-content-center">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="attack"
                  name="attack"
                  checked={ this.props.filter.attack }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="attack"><Trans>Attaque</Trans></label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="skill"
                  name="skill"
                  checked={ this.props.filter.skill }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="skill"><Trans>Compétence</Trans></label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="reaction"
                  name="reaction"
                  checked={ this.props.filter.reaction }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="reaction"><Trans>Réaction</Trans></label>
              </div>
            </div>
          </div>
          <div className="col-4">
            <label><b><Trans>Langage</Trans></b></label>
            <div className="form-group d-flex flex-column flex-lg-row align-items-center justify-content-center">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="english"
                  name="english"
                  checked={ this.props.filter.english }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="english">English</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="french"
                  name="french"
                  checked={ this.props.filter.french }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="french">Français</label>
              </div>
            </div>
          </div>
        </div>

        <div className="row text-center">
          <div className="col-12">
            <label><b><Trans>Champions</Trans></b></label>
            <div className="form-group d-flex align-items-center justify-content-center flex-wrap">
              { this.props.champions.map((champion) => {
                return (
                  <div className="form-check form-check-inline" key={ champion.id }>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={ champion.id }
                      name={ champion.id }
                      checked={ this.props.filter[champion.id] }
                      onChange={ this.props.onInputChange }
                    />
                    <label className="form-check-label" htmlFor={ champion.id }>{ getTranslatedTextFromObject(champion.name, this.props.i18n.language) }</label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <button type="button" className="btn btn-outline-secondary mx-2" onClick={ this.props.onSelectAllChampions }>
            <Trans>Sélectionner tous les Champions</Trans>
          </button>
          <button type="button" className="btn btn-outline-secondary mx-2" onClick={ this.props.onDeselectAllChampions }>
            <Trans>Désélectionner tous les Champions</Trans>
          </button>
        </div>
      </div>
    )
  }
}

CardFilter.propTypes = {
  champions: PropTypes.arrayOf(ChampionType),
  filter: PropTypes.shape({
    red: PropTypes.bool,
    yellow: PropTypes.bool,
    blue: PropTypes.bool,
    attack: PropTypes.bool,
    skill: PropTypes.bool,
    reaction: PropTypes.bool,
    english: PropTypes.bool,
    french: PropTypes.bool,
    search: PropTypes.string
  }),
  onInputChange: PropTypes.func,
  onClearSearchInput: PropTypes.func,
  onSelectAllChampions: PropTypes.func,
  onDeselectAllChampions: PropTypes.func
}

export default withTranslation()(CardFilter);
