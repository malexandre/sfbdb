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
            <label><b>Couleur</b></label>
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
            <label><b>Type de carte</b></label>
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
            <label><b>Langage</b></label>
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
            <label><b>Champions</b></label>
            <div className="form-group d-flex align-items-center justify-content-center flex-wrap">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="dug"
                  name="dug"
                  checked={ this.props.filter.dug }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="dug">Dugrun</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gol"
                  name="gol"
                  checked={ this.props.filter.gol }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="gol">Gold'arr</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gwa"
                  name="gwa"
                  checked={ this.props.filter.gwa }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="gwa">Gwaien</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="kil"
                  name="kil"
                  checked={ this.props.filter.kil }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="kil">Kilgore</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="tzu"
                  name="tzu"
                  checked={ this.props.filter.tzu }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="tzu">Tzu Xiao</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="der"
                  name="der"
                  checked={ this.props.filter.der }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="der">Deryn</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rat"
                  name="rat"
                  checked={ this.props.filter.rat }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="rat">Rath</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="mar"
                  name="mar"
                  checked={ this.props.filter.mar }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="mar">Mariusz</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="kor"
                  name="kor"
                  checked={ this.props.filter.kor }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="kor">Korvash</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="lor"
                  name="lor"
                  checked={ this.props.filter.lor }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="lor">Loralei</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="nev"
                  name="nev"
                  checked={ this.props.filter.nev }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="nev">Nevamor</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="taz"
                  name="taz"
                  checked={ this.props.filter.taz }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="taz">Taze</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="kol"
                  name="kol"
                  checked={ this.props.filter.kol }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="kol">Ko'lel</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="sul"
                  name="sul"
                  checked={ this.props.filter.sul }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="sul">Sulka</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="akh"
                  name="akh"
                  checked={ this.props.filter.akh }
                  onChange={ this.props.onInputChange }
                />
                <label className="form-check-label" htmlFor="akh">Akhet</label>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <button type="button" class="btn btn-outline-secondary" onClick={ this.props.onReset }>
            Réinitialiser les filtres
          </button>
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
  onInputChange: PropTypes.func,
  onReset: PropTypes.func
}
