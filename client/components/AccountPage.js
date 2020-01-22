import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/reducers/user'
import {Link} from 'react-router-dom'
import {updateUserInfo} from '../store/reducers/user'

class AccountPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editable: false,
      userInfo: {
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        email: this.props.user.email,
        address: this.props.user.address
      }
    }
    this.toggleEditable = this.toggleEditable.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.me()
  }

  toggleEditable(e) {
    e.preventDefault()
    this.setState({
      editable: !this.state.editable
    })
  }

  handleChange(e) {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [e.target.name]: e.target.value
      }
    })
  }

  async handleSubmit(e) {
    e.preventDefault()
    const userId = this.props.user.id
    const {userInfo} = this.state
    await this.props.updateUserInfo(userId, userInfo)
    this.setState({
      editable: false,
      userInfo: {
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        email: this.props.user.email,
        address: this.props.user.address
      }
    })
  }

  render() {
    const {user} = this.props
    const {editable} = this.state

    return (
      <form onSubmit={this.handleSubmit} id="accountPage">
        <h1>My Account</h1>
        <h2>Account Details:</h2>
        {editable ? (
          <div id="accountPageInputs">
            <div className="fullUserName">
              <input
                type="text"
                name="firstName"
                className="editabletrue"
                onChange={this.handleChange}
                value={this.state.userInfo.firstName}
              />
              <input
                type="text"
                name="lastName"
                className="editabletrue"
                onChange={this.handleChange}
                value={this.state.userInfo.lastName}
              />
            </div>
            <input
              type="text"
              name="email"
              className="editabletrue"
              onChange={this.handleChange}
              value={this.state.userInfo.email}
            />
            <input
              type="text"
              name="address"
              className="editabletrue"
              onChange={this.handleChange}
              value={this.state.userInfo.address}
            />
          </div>
        ) : (
          <div>
            <h3 className="editablefalse">
              Name: {user.firstName} {user.lastName}
            </h3>
            <h3 className="editablefalse">Email: {user.email}</h3>
            <h3 className="editablefalse">Address: {user.address}</h3>
          </div>
        )}
        <Link to="/orderHistory">
          <button type="button">Order History</button>
        </Link>
        <button type="button" onClick={this.toggleEditable}>
          Edit Details
        </button>
        {editable ? <button type="submit">Submit Changes</button> : ''}
      </form>
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
    me: () => dispatch(me()),
    updateUserInfo: (userId, userInfo) =>
      dispatch(updateUserInfo(userId, userInfo))
  }
}

export default connect(mapState, mapDispatch)(AccountPage)
