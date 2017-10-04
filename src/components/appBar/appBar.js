import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router';
import * as Utils from '../../common/utils';
import './appBar.scss'

const isIndexOf = (a, id) => {
  return a.indexOf(id) >= 0;
};


class AppBar extends React.Component {
  componentWillUpdate(nextProps) {
    const { profile, requestReports } = this.props;
    if (profile) {
      if (nextProps.profile.autoRefresh && nextProps.profile.notification) {
        if (profile.autoRefresh !== nextProps.profile.autoRefresh || profile.notification !== nextProps.profile.notification) {
          // Auto refresh wasent activated before. It is time to lunch it.
          // setInterval(() => { requestReports() }, 3000);
        }
      }
    }
  }

  componentDidMount(){
    const { auth, history } = this.props
    if (!auth.isAuthenticated) {
      history.push(`/login`);
    }
  }

  render() {
    const {
      filter,
      toggleNavbar,
      udpateFilterText,
      navbar,
      toggleNavbarDropdown,
      logoutUser,
      auth
    } = this.props;

    if (!auth.isAuthenticated) {
      return null
    }

    return (
      <div className="app-bar">
        <div className="left">
          <Link to="/" className="logo">Hozint</Link>
        </div>
        <div className="center">
          <Link to="/">Map</Link>
          <Link to="/reports">Reports</Link>
        </div>
        <div className="right">
          <ul className="nav navbar-nav navbar-right">
            <li className={`dropdown dropdown-user ${navbar.isDropdown ? 'open' : ''}`}>
              <a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true" onClick={() => toggleNavbarDropdown()}>
                <i className="icon-user fa-lg"></i>
                <span>&nbsp;</span>
                <i className="caret"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-right">
                {/* listen to ul instead of each li */ }
                <li><Link to="/profile" onClick={() => toggleNavbarDropdown()}>My Profile</Link></li>
                <li><Link to="/searches" onClick={() => toggleNavbarDropdown()}>My Searches</Link></li>
                <li className="divider"></li>
                <li><Link to="/help" onClick={() => toggleNavbarDropdown()}>Help</Link></li>
                <li><Link to="/about" onClick={() => toggleNavbarDropdown()}>About Horizon</Link></li>
                <li><Link to="/login" onClick={() => {toggleNavbarDropdown(); logoutUser();}}>Logout</Link></li>
              </ul>
            </li>
          </ul>
        </div>
    	</div>
    )
  }
}

export default AppBar
