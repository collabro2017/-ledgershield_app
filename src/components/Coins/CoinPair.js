import React, { Component } from "react";
import map from 'lodash/map';

export default class CoinPair extends Component {
  render() {

    const {items} = this.props;
    const cpList = map(items.pairs.list.results, (item, i) => {
        const {source, destination, rate} = item
        const src_symbol = source.symbol;
        const dst_symbol = destination.symbol;
        const formated_rate = parseFloat(rate).toFixed(8)

        return (<li key={i} className="list-group-item">
            <span className="badge badge-info">1 {src_symbol}</span> / <span className="badge badge-info">{formated_rate} { dst_symbol}</span>
        </li>)
    })


    return (
      <div className="card bg-default mt-5">
        {items.loading ? (
          "loading"
        ) : (
          <ul className="list-group list-group-flush">{cpList}</ul>
        )}
      </div>
    );
  }
}
