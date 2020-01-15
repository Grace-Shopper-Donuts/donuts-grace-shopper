import React from 'React'
import {connect} from 'react-redux'
import {me} from '../store/reducers/user'
import {Link} from 'react-router-dom'

class AccountPage extends React.Component {
  componentDidMount() {
    this.props.me()
  }

  render() {
    const {user} = this.props
    return (
      <div id="accountPage">
        <div id="accountLeft">
          <img src={user.imgPath} />
        </div>
        <div id="accountRight">
          <h1>
            {user.firstName} {user.lastName}
          </h1>
          <h2>{user.email}</h2>
          <h2>{user.address}</h2>
          <Link to="/orderHistory">
            <button>Order History</button>
          </Link>
          <button>Delete Account</button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    me: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(AccountPage)
