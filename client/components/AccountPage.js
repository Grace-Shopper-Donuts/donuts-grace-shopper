import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/reducers/user'
import {Link} from 'react-router-dom'

class AccountPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editable: false
    }
    this.toggleEditable = this.toggleEditable.bind(this)
  }

  toggleEditable(e) {
    e.preventDefault()
    this.setState({
      editable: !this.state.editable
    })
    console.log(this.state)
  }

  componentDidMount() {
    this.props.me()
  }

  render() {
    const {user} = this.props
    const {editable} = this.state
    return (
      <div id="accountPage">
        <h1>My Account</h1>
        <h2>Account Details:</h2>
        <h3 contentEditable={editable} className={`editable${editable}`}>
          {user.firstName} {user.lastName}
        </h3>
        <h3 contentEditable={editable} className={`editable${editable}`}>
          {user.email}
        </h3>
        <h3 contentEditable={editable} className={`editable${editable}`}>
          {user.address}
        </h3>
        <Link to="/orderHistory">
          <button type="button">Order History</button>
        </Link>
        <button type="button" onClick={this.toggleEditable}>
          Edit Details
        </button>
        {editable ? <button type="submit">Submit Changes</button> : ''}
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
