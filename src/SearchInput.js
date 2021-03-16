import React from 'react'
import PropTypes from 'prop-types'

import { Search } from 'react-bootstrap-icons'
import { useTranslation } from 'react-i18next'


function SearchInput(props) {
  const { t } = useTranslation();

  return (
    <div className="row">
      <div className="col-12">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={ `${t("Filtrer")}...` }
            name="search"
            value={ props.search }
            onChange={ props.onInputChange }
          />
          <div className="input-group-append clear-text-button">
            <button type="button" className="close" aria-label="Clear" onClick={ props.onClearSearchInput }>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="input-group-append">
            <span className="input-group-text"><Search /></span>
          </div>
        </div>
      </div>
    </div>
  )
}

SearchInput.propTypes = {
  search: PropTypes.string,
  onInputChange: PropTypes.func,
  onClearSearchInput: PropTypes.func
}

export default SearchInput
