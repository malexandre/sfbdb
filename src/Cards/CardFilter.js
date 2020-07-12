import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Search } from 'react-bootstrap-icons'


export default class CardFilter extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Filtrer..."
                name="search"
                value={ this.props.filter.search }
                onChange={ this.props.onInputChange }
              />
              <div className="input-group-append">
                <span className="input-group-text"><Search /></span>
              </div>
            </div>
          </div>
        </div>

        <div className="row text-center">
          <div className="col-4">
            <label>Couleur de la réaction</label>
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
                <label className="form-check-label" htmlFor="red">Rouge</label>
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
                <label className="form-check-label" htmlFor="yellow">Jaune</label>
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
                <label className="form-check-label" htmlFor="blue">Bleue</label>
              </div>
            </div>
          </div>
          <div className="col-4">
            <label>Défense</label>
            <div className="form-group d-flex flex-column flex-md-row align-items-center justify-content-center">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="attack"
                  name="attack"
                  checked={ this.props.filter.attack }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="attack">Attaque</label>
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
                <label className="form-check-label" htmlFor="skill">Compétence</label>
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
                <label className="form-check-label" htmlFor="reaction">Réaction</label>
              </div>
            </div>
          </div>
          <div className="col-4">
            <label>Langage</label>
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

CardFilter.propTypes = {
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
  onInputChange: PropTypes.func
}
