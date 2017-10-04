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

class PricesForm extends React.Component {
  
  handleSubscribeClick(price) {
    this.props.sendEmail()
  }

  render() {
    const { plans, vehicles, draft } = this.props
    if (!draft || !draft.prices) {
      return null
    }
    // prices.prices = lol...TODO Fix that
    const colWidth = Math.floor(12/draft.prices.prices.length)
    return (
      <Grid>
        <Row>
          {draft.prices.prices.map((price, index) => (<Col key={index} xs={colWidth}>
            <Card>
              <CardText>
                {price.variant}
                <div>{price.totalPrice.value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')} EUR</div>
                <RaisedButton
                  primary={true}
                  style={{width:'100%', marginTop: 20}}
                  onClick={() => this.handleSubscribeClick(price)}
                >
                  Subscribe Now
                </RaisedButton>
              </CardText>
            </Card>
          </Col>))}
        </Row>
      </Grid>
    )
  }
}

export default PricesForm
