import React, { Component } from 'react'
import CoinGrid from './../Coins/CoinGrid';

class Home extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="pt-5 pb-5">Which types of coin you want to exchange?</h3>
            <CoinGrid/>
          </div>
        </div>
      </div>
    )
  }

}

export default Home;
