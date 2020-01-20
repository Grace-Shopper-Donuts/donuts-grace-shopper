import React from 'react'

class HomePage extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id="homepage">
        <img src="/homePageLeft.png" id="homepagePerson" />
        <img src="/musicNotes.png" id="musicNotes" />
      </div>
    )
  }
}

export default HomePage
