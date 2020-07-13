import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'

import Builder from './Builder/builder'
import Cards from './Cards/Cards'
import Champions from './champions/Champions'
import logo from './logo192.png'

export default function App() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const setEnglish = () => {
    changeLanguage('en')
  }

  const setFrench = () => {
    changeLanguage('fr')
  }

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          <img src={ logo }
            width="30"
            height="30"
            className="d-inline-block align-top mr-2"
            alt="Logo SFB"
          />
          SFB Database
        </Link>
        <button className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#main-navbar"
          aria-controls="main-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="main-navbar">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" activeClassName="active" exact to="/">
              <Trans>
                Les Champions
              </Trans>
            </NavLink>
            <NavLink className="nav-item nav-link" activeClassName="active" to="/cards">
              <Trans>
                Les Cartes
              </Trans>
            </NavLink>
            <NavLink className="nav-item nav-link" activeClassName="active" to="/builder">
              <Trans>
                Team Builder
              </Trans>
            </NavLink>
          </div>
        </div>

        <span class="navbar-text" onClick={ setEnglish }>
          EN
        </span>
        <span class="navbar-text" onClick={ setFrench }>
          FR
        </span>
      </nav>

      <Switch>
        <Route path="/builder/:deckCode" component={ Builder } />
        <Route path="/builder" component={ Builder } />
        <Route path="/cards" component={ Cards } />
        <Route path="/" component={ Champions } />
      </Switch>
    </Router>
  )
}
