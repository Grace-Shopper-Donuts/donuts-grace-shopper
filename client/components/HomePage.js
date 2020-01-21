import React from 'react'
import {Link} from 'react-router-dom'

class HomePage extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id="homepage">
        <h1>Welcome to YouTuba!</h1>
        <Link to="/products">
          <h2>Shop Our Selection</h2>
        </Link>
        {/* <img src="/homePageLeft.png" id="homepagePerson" />
        <img src="/musicNotes.png" id="musicNotes" /> */}
      </div>
    )
  }
}

export default HomePage
