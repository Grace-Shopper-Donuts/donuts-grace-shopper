import React from 'react'

class HomePage extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id="homepage">
        <img src="/homePageLeft.png" id="homepageLeft" />
        <img src="/homePageRight.png" id="homepageRight" />
      </div>
    )
  }
}

export default HomePage
