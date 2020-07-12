import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom'
import Builder from './Builder/builder'
import Cards from './Cards/Cards'
import Champions from './champions/Champions'

export default function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          SFB DB
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
              Les Champions
            </NavLink>
            <NavLink className="nav-item nav-link" activeClassName="active" to="/cards">
              Les Cartes
            </NavLink>
            <NavLink className="nav-item nav-link" activeClassName="active" to="/builder">
              Team Builder
            </NavLink>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Switch>
          <Route path="/builder" component={ Builder } />
          <Route path="/cards" component={ Cards } />
          <Route path="/" component={ Champions } />
        </Switch>
      </div>
    </Router>
  )
}
