import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions'
import Main from '../main/main'
import './app.scss'

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    vehicles: state.vehicles,
    draft: state.draft
  }
};

const mapDispachToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;
