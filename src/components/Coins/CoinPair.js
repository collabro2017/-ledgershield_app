import React, { Component } from "react";
import map from 'lodash/map';

export default class CoinPair extends Component {
  render() {

    const {items, src} = this.props;    
    const cpList = map(items.pairs.list.results, (item, i) => {
        const {source, destination, rate} = item        
        const src_symbol = source.symbol;
        const dst_symbol = destination.symbol;
        const formated_rate = parseFloat(rate).toFixed(6)
        let mixing = false
        if (dst_symbol === src_symbol) {
          mixing =  true
        }

        return (<li key={i} className="list-group-item">
            <span className="badge badge-primary">1.00 {src_symbol}</span> / <span className="badge badge-success">{formated_rate} { dst_symbol}</span> 
            {mixing? <span> / <span className="badge badge-warning">mixing</span></span>: null}
        </li>)
    })


    return (
      <div className="card bg-default mt-5">
        <div className="card-header">
          <h5>Rates for {src} pairs</h5>
        </div>
        {items.loading ? (
          "loading"
        ) : (
          <ul className="list-group list-group-flush">{cpList}</ul>
        )}
      </div>
    );
  }
}
