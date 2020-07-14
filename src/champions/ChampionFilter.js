import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Trans } from 'react-i18next'
import SearchInput from '../SearchInput'


export default class ChampionFilter extends Component {
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
            <label><b><Trans>Réaction</Trans></b></label>
            <div className="form-group d-flex flex-column flex-md-row align-items-center justify-content-center">
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
            <label><b><Trans>Défense</Trans></b></label>
            <div className="form-group d-flex flex-column flex-md-row align-items-center justify-content-center">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="zeroDef"
                  name="zeroDef"
                  checked={ this.props.filter.zeroDef }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="zeroDef">0</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="oneDef"
                  name="oneDef"
                  checked={ this.props.filter.oneDef }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="oneDef">1</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="twoDef"
                  name="twoDef"
                  checked={ this.props.filter.twoDef }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="twoDef">2</label>
              </div>
            </div>
          </div>
          <div className="col-4">
            <label><b><Trans>Langage</Trans></b></label>
            <div className="form-group d-flex flex-column flex-md-row align-items-center justify-content-center">
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
      </div>
    )
  }
}

ChampionFilter.propTypes = {
  filter: PropTypes.shape({
    red: PropTypes.bool,
    yellow: PropTypes.bool,
    blue: PropTypes.bool,
    zeroDef: PropTypes.bool,
    oneDef: PropTypes.bool,
    twoDef: PropTypes.bool,
    english: PropTypes.bool,
    french: PropTypes.bool,
    search: PropTypes.string
  }),
  onInputChange: PropTypes.func,
  onClearSearchInput: PropTypes.func
}
