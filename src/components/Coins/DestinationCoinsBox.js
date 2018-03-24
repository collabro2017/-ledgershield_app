import React, { Component } from "react";
import map from "lodash/map";

export default class DestinationCoinsBox extends Component {
  render() {
    const { coins, sourceCoin, handleChange } = this.props;

    return (
      <select className="form-control" name="withdraw" onChange={handleChange}>
        <option>Choose destination coin!</option>
          {
            map(coins, (coin, i) => {
              
              if (coin.symbol === sourceCoin) {
                return null;
              }
              
              if (coin.operational) {
                return (
                  <option data-index={i} key={i} value={coin.id}>{coin.name}</option>
                );
              }
              return null;
            })
          }
      </select>
    );
  }
}
