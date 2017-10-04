import React from 'react'
import { Link } from 'react-router'
import './login.scss'
import { Grid, Row, Col } from 'react-flexbox-grid'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }

  componentWillMount() {
    const { auth, history } = this.props;
    // TODO: this sould be handle else where
    if (auth.isAuthenticated) {
      history.push(`/home`)
    }
  }
  componentWillUpdate(nextProps) {
    if (!this.props.auth.isAuthenticated && nextProps.auth.isAuthenticated) {
      this.props.history.push(`/home`)
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleSubmit = () => {
    this.props.loginUser(this.state)
  }

  render() {
    const { auth } = this.props
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
                <TextField
                  id="email"
                  floatingLabelText="Email"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  fullWidth
                />
                <TextField
                  id="name"
                  floatingLabelText="Password"
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                  fullWidth
                />
                <div className="error">{auth.error}</div>
                <RaisedButton
                  primary={true}
                  style={{width:'100%', marginTop: 20, color: 'white'}}
                  onClick={this.handleSubmit}
                >
                  Primary
                </RaisedButton>
              </CardText>
            </Card>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Login
