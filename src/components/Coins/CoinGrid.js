import React, { Component} from 'react';
import {connect} from "react-redux";
import map from 'lodash/map';
// import PropTypes from 'prop-types';

import CoinGridItem from './CoinGridItem';
import { fetchCoins } from './../../actions/coinActions';
import LoadingIndicator from './../common/Loading';

class CoinGrid extends Component {

  componentWillMount() {
     this.props.fetchCoins();
  }

  render() {
    const {coins, loading, error } = this.props;    
    const Coins = map(coins.results, (item) => <CoinGridItem key={item.id} coin={item} />)
    return(
        <div className="row">
          <div className="col-md-12">
            {loading? <LoadingIndicator /> : error? <p>{error}</p> : (<div className="card-deck">{Coins}</div>)}
          </div>
        </div>
    )
  }
}

// CoinGrid.propTypes = {
//   coins: PropTypes.object.isRequired
// }

const mapStateToProps = (state) => {
  return {
      coins: state.coins.coinsList.coins,
      error: state.coins.coinsList.error,
      loading: state.coins.coinsList.loading
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      fetchCoins: () => {
        dispatch(fetchCoins())
      }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CoinGrid);
