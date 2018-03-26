import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class CoinGridItem extends Component {
  render() {
    const { coin } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <img className="mb-3" src={coin.image} alt={coin.symbol} />
          <h5 className="card-title">{coin.name}</h5>
          {coin.operational ? (
            <Link
              className="btn btn-block btn-outline-primary"
              to={`/exchange/${coin.symbol}`}
            >
              DEPOSIT
            </Link>
          ) : (
            <button className="btn btn-block btn-outline-warning">
              COMING SOON
            </button>
          )}
        </div>
      </div>
    );
  }
}

CoinGridItem.propTypes = {
  coin: PropTypes.object.isRequired
};

export default CoinGridItem;
