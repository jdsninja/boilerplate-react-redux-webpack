import React from 'react'
import './home.scss'
import { Grid, Row, Col } from 'react-flexbox-grid'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField';
import { MenuItem } from 'material-ui/Menu';
import _cloneDeep from 'lodash.clonedeep'
import draft from '../../data/drafts.json' // TODO: webpack alias
import moment from 'moment'
import { Link } from 'react-router'
import DriverForm from './driverForm'
import PricesForm from './pricesForm'

class Home extends React.Component {
  componentWillMount() {
    this.props.requestVehicles()
  }

  render() {
    const { plans, vehicles, draft } = this.props

    // Prices form
    if (draft && draft.prices) { // prices.prices = lol...TODO Fix that
      const colWidth = Math.floor(12/draft.prices.prices.length)
      return <PricesForm {...this.props} />
    }

    // Driver form
    return <DriverForm {...this.props} />
  }
}

export default Home
