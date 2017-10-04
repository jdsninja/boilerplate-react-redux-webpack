import React from 'react'
import { Link } from 'react-router'
import { LeftNav, WaringOverlay } from '../../components'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import './main.scss'
import { sortReportBy } from '../../common/helpers'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Snackbar from 'material-ui/Snackbar';
const muiTheme = getMuiTheme()

class Main extends React.Component {
  state = {
    snackbar_open: false,
    snackbar_autoHideDuration: 5000,
    snackbar_message: ''
  }

  componentDidUpdate(prevProps) {
    const currentNotificationsData = this.props.draft.notification
    const previousNotificationsData = prevProps.draft.notification
    console.log( currentNotificationsData, previousNotificationsData)
    if (previousNotificationsData && currentNotificationsData) {
      if (currentNotificationsData.message !== previousNotificationsData.message) {
        this.showSnackbar(currentNotificationsData)
      }
    }
    if (!previousNotificationsData && currentNotificationsData) {
      this.showSnackbar(currentNotificationsData)
    }    
  }

  showSnackbar = (notifications) => {
    console.log(notifications)
    this.setState({
      snackbar_open: true,
      snackbar_message: notifications.message
    })
  }


  hideSnackbar = () => {
    this.props.removeNotification()
    this.setState({
      snackbar_open: false,
    })
  }

  render() {
    const {
      location,
      logoutAndRedirect,
      auth
    } = this.props

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div className={`${location.pathname.substring(1).split('/')[0]}`}>
        {this.props.draft.is_fetching ? <div className="loading"><i className="icon-spinner3 spinner icon-2x" /></div> : ''}
        {/*<AppBar {...this.props} />*/}
        {auth.isAuthenticated ? <AppBar
          title={<span>Car Insurance Plans</span>}
          iconElementLeft={<span></span>}
          iconElementRight={<FlatButton label="Logout" onClick={() => logoutAndRedirect()} />}
        /> : ''}
        <div className="page-container">
          {React.cloneElement(this.props.children, this.props)}
        </div>
        {/*<WaringOverlay {...this.props} />*/}
        <Snackbar
          bodyStyle={{ backgroundColor:'#494B4F', color: 'white' }}
          open={this.state.snackbar_open}
          message={this.state.snackbar_message}
          autoHideDuration={this.state.snackbar_autoHideDuration}
          onRequestClose={this.hideSnackbar}
        />
      </div>
      </MuiThemeProvider>
    )
  }
}

export default Main
