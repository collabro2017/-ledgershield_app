import React, { Component } from "react";
import {connect} from "react-redux";
import map from 'lodash/map';

import { fetchCoins } from "./../../actions/coinActions";
import {submitTrnsaction} from './../../actions/transactionActions';

class CoinExchange extends Component {

    constructor(props){
        super(props);
        this.state = {
            ...this.state,
            deposit_coin: '',
            deposit_refund_address: '',
            exchange_coin: '',
            exchnage_coin_name: '',
            exchange_deposit_address: ''

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        this.props.fetchCoins();
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }


    handleSelect(e){
        
        this.setState({[e.target.name]: e.target.value});        
        const selectedIndex =  e.target.options.selectedIndex;        
        const selectedKey = e.target.options[selectedIndex].getAttribute('data-index');
        const dstCoin = this.props.coins.coins.results[selectedKey]       
        if (dstCoin !== undefined){
            this.setState({exchnage_coin_name: dstCoin.symbol});
        }else {
            this.setState({exchnage_coin_name: ''});
        }
        
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = {
            'rollback_wallet': this.state.deposit_refund_address,
            'withdrawl_address': this.state.exchange_deposit_address,
            'deposit': this.input.value,
            'withdraw': this.state.exchange_coin
        }
        this.props.submitTrnsaction(data);
    }

    render() {        
        const { match, coins } = this.props;
        const depositCoin = match.params.depositCoin;    
        let depositInfo = {}

        

        const coinsOptions = map(coins.coins.results, (item, i) => {
            if(item.symbol === depositCoin) {
                depositInfo = item
                return null;
            }  
            return <option data-index={i} key={i} value={item.id}>{item.name}</option>
        })

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 ml-auto">
                        <div className="card mt-5">
                            <div className="card-body">
                                <h4 className="card-title">Some nice heading ... </h4>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label>Deposit:</label>
                                        <input name="deposit_coin" type="hidden" ref={(input) => this.input = input}  defaultValue={depositInfo.id} />                    
                                        <p className="form-control"><img width="30" src={depositInfo.image} alt={depositInfo.symbol} /> <span className="deposit-align">{depositInfo.name}</span></p>
                                    </div>
                                    <div className="form-group">
                                        <label>Your Refund Address:</label>
                                        <input name="deposit_refund_address" type="text" className="form-control" onChange={this.handleChange} />                    
                                    </div>
                                    <div className="form-group">
                                        <label>Receive:</label>
                                        <select className="form-control" name="exchange_coin" onChange={this.handleSelect}>
                                        <option>Choose exhcnage coin!</option>
                                        {coinsOptions}
                                        </select>
                                    </div>
                                    { this.state.exchnage_coin_name ? (
                                        <div className="form-group">
                                            <label>Your {this.state.exchnage_coin_name} Address (destination address):</label>
                                            <input name="exchange_deposit_address" type="text" onChange={this.handleChange} className="form-control" />                    
                                        </div>                                        
                                    ) : null
                                    }
                                    <button className="btn btn-block btn-outline-primary">Start Transaction</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = state => {
  return {
    coins: state.coins.coinsList,
    transaction: state.transaction,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCoins: () => {
      dispatch(fetchCoins());
    },
    submitTrnsaction: (data) => {
        dispatch(submitTrnsaction(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinExchange);