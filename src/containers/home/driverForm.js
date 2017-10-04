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

class DriverForm extends React.Component {
  state = {
    firstName:'',
    age: '',
    vehicle: '',
    email: ''
  }

  handleChangeContact = ({ name, value }) => {
    _draft.risk.drivers[0].contact[name] = value
    const _draft = _cloneDeep(draft)
    _draft.risk.drivers[0].person[name] = value
    this.setState({
      draft: _draft
    })
  }

  handleChange = ({ name, value }) => {
    this.setState({
      [name]: value
    })
  }
  
  handleSubmit = () => {
    const { vehicles } = this.props
    const { age, firstName, email, vehicle } = this.state
    const _draft = _cloneDeep(draft)

    // Person info
    _draft.risk.drivers[0].person.firstName = firstName
    // TODO remove this hack and ask the user the date of birth instead of its age
    let birthDate = moment()
    birthDate = birthDate.subtract(age, "year")
    _draft.risk.drivers[0].person.birthDate = birthDate.format("YYYY-MM-DD");
    // Person
    _draft.risk.drivers[0].contact.email = email

    // Vehicle
    _draft.risk.vehicle.details = vehicles.data.find(x => x.code === vehicle)
    delete _draft.risk.vehicle.details.name
    this.props.setDraft(_draft)
  }

  componentWillUpdate(nextProps) {
    if (!this.props.draft.data.draftId && nextProps.draft.data.draftId) {
      this.props.requestDraftPrices(nextProps.draft.data.draftId)
    }
  }

  render() {
    const { plans, vehicles, draft } = this.props
    return (
      <Grid>
        <Row>
          <Col 
            xsOffset={1} xs={10}
            smOffset={3} sm={6}
            mdOffset={4} md={4}
          >
            <Card>
              <CardText>
                <h3>Driver infos</h3>
                <TextField
                  id="driverName"
                  floatingLabelText="Name"
                  value={this.state.firstName}
                  onChange={e => this.handleChange({ name: 'firstName', value: e.currentTarget.value })}
                  fullWidth
                />
                <TextField
                  id="driverAge"
                  floatingLabelText="Age"
                  type="number"
                  value={this.state.age}
                  onChange={e => this.handleChange({ name: 'age', value: e.currentTarget.value })}
                  fullWidth
                />
                <SelectField
                  id="Car​ ​model​"
                  value={this.state.vehicle}
                  onChange={(event, index, value) => this.handleChange({ name: 'vehicle', value })}
                  fullWidth
                  floatingLabelText="Select your car"
                >
                  {vehicles.data.map((x, i) => <MenuItem key={i} value={x.code} primaryText={x.name} />)}
                </SelectField>
                <TextField
                  id="email"
                  type="email"
                  floatingLabelText="Email"
                  onChange={e => this.handleChange({ name: 'email', value: e.currentTarget.value })}
                  value={this.state.email}
                  fullWidth
                />
                <RaisedButton
                  color="primary"
                  primary={true}
                  style={{width:'100%', marginTop: 20}}
                  onClick={this.handleSubmit}
                >
                  Primary
                </RaisedButton>
              </CardText>
            </Card>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default DriverForm
