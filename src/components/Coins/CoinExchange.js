import React, { Component } from "react";
import {connect} from "react-redux";
import map from 'lodash/map';
import toNumber from 'lodash/toNumber'

import { fetchCoins, fetchCP } from "./../../actions/coinActions";
import {submitTrnsaction} from './../../actions/transactionActions';
import CoinPair from './CoinPair';
import DestinationCoinsBox from './DestinationCoinsBox'
import history from './../../utils/history';

class CoinExchange extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            ...this.state,           
            outputs: [1],
            error: true,
            sourceCoin: this.props.match.params.depositCoin,
            tx: {
                outs: []
            }

        };
        this.selected_coin = 0;
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addOutput = this.addOutput.bind(this);
        this.removeOutput = this.removeOutput.bind(this);
        this.validateOutputs = this.validateOutputs.bind(this);
        this.handleSourceSelect = this.handleSourceSelect.bind(this);
    }
    componentWillMount() {
        this.props.fetchCoins();
        this.props.fetchCP(this.props.match.params.depositCoin);
    }

    

    handleChange(e) {
        const {tx} = this.state;
        tx[e.target.name] = e.target.value
        // console.log(tx)
        this.setState({tx})
    }

    validateOutputs() {
        const {outs} = this.state.tx
        let total = 0;        
        map(outs, (out, i ) => {
            total += out.value
        });        
        if (total !== 100) {
            this.setState({error: true})
        } else {
            this.setState({error: false})
        }
    }


    addOutput(e) {
        e.preventDefault()
        const {outputs} = this.state
        outputs.push(outputs.length + 1)
        this.setState({outputs})
    }

    removeOutput(index) {        
        const {outputs} = this.state        
        outputs.pop(index)
        this.setState({outputs})

    }

    handleSourceSelect(e) {
        e.preventDefault()
        this.handleChange(e) 
        const selectedIndex =  e.target.options.selectedIndex;        
        const selectedKey = e.target.options[selectedIndex].getAttribute('data-index');
        const selectedCoin = this.props.coins.coins.results[selectedKey];
        const symbol = selectedCoin.symbol;
        this.setState({sourceCoin: symbol})
        this.props.fetchCP(symbol);

        // let {tx, exchnage_coin_name, outputs} = this.state;
        
        // if(exchnage_coin_name === symbol){
        //     exchnage_coin_name = '';
        //     tx.outs = [];
        //     outputs = [1]
        // }
        // this.setState({outputs:outputs, tx:tx, exchnage_coin_name: exchnage_coin_name, sourceCoin: symbol})
        history.replace(`/exchange/${symbol}`);
    }

    handleSelect(e){       
        this.handleChange(e)        
        const selectedIndex =  e.target.options.selectedIndex;        
        const selectedKey = e.target.options[selectedIndex].getAttribute('data-index');
        const dstCoin = this.props.coins.coins.results[selectedKey]       
        if (dstCoin !== undefined){
            this.setState({exchnage_coin_name: dstCoin.symbol});
        }else {
            this.setState({exchnage_coin_name: ''});
        }        
    }

    handleOutputs(index, name, e) {
        e.preventDefault()
        const {tx} = this.state;
        const {outs } = this.state.tx
        let val = e.target.value;
        if (name === 'value')
            val = toNumber(val);

        if (outs[index] !== void 0) {
            outs[index][name] = val            
        } else {
            outs.push({[name]: val})            
        }
        tx.outs = outs;
        this.setState({tx});
        this.validateOutputs();
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const {tx} = this.state;
        if (tx['deposit'] === undefined || tx['deposit']=== null) {
            tx.deposit = this.selected_coin
        }
        // tx['deposit'] =this.deposit.value
        console.log(JSON.stringify(tx))
        this.props.submitTrnsaction(tx);
    }


    

    render() {

        const {coins, cp} = this.props;        
            
        const sourceOptions = map(coins.coins.results, (item, i) => {            
            if(item.symbol === this.state.sourceCoin) {                
                this.selected_coin = item.id
            }
            
            if(item.operational) {
                return <option data-index={i} key={i} value={item.id}>{item.name}</option>
            }
            return null
        });
      
        const outputs = map(this.state.outputs, (o, i) => {
            return (
                <div className="row"  key={i}>
                    <div className="col-md-8">
                        <div className="form-group">
                            <label>Your {this.state.exchnage_coin_name} Address ({o}):</label>
                            <input name={`address_${o}`} type="text" onChange={this.handleOutputs.bind(this, i, 'address')} className="form-control" />                    
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label>{this.state.exchnage_coin_name} Share %:</label>
                            <input name={`share_${o}`} type="number" onChange={this.handleOutputs.bind(this, i, 'value')} className="form-control" />                    
                        </div>
                    </div>
                    <div className="col-md-1">
                        {i > 0 ?(
                        <div className="form-group">
                            <label>&nbsp;</label>
                            <a onClick={(e) => {
                                    e.preventDefault();
                                    this.removeOutput(i)
                            }} className="out-remove">
                                <i className="fa fa-trash"></i>
                            </a>
                        </div>): null }
                    </div>
                </div>
            )
        })

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                       <CoinPair src={this.state.sourceCoin} items={cp} />
                    </div>
                    <div className="col-md-8">
                        <div className="card mt-5">
                            <div className="card-header">
                                <h5>Privacy Made Easy</h5>
                            </div>
                            <div className="card-body">                                
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">

                                        <label>Deposit:</label>
                                        <select value={this.state.tx.deposit? this.state.tx.deposit: this.selected_coin} className="form-control" name="deposit" onChange={this.handleSourceSelect}>
                                            <option>Choose source coin!</option>
                                            {sourceOptions}
                                        </select>
                                        
                                    </div>
                                    <div className="form-group">
                                        <label>Your Refund Address:</label>
                                        <input name="rollback_wallet" type="text" className="form-control" onChange={this.handleChange} />                    
                                    </div>
                                    <div className="form-group">
                                        <label>Receive:</label>                                        
                                        <DestinationCoinsBox 
                                            coins={coins.coins.results} 
                                            sourceCoin={this.state.sourceCoin}
                                            handleChange={this.handleSelect} />
                                    </div>
                                     {this.state.exchnage_coin_name ? (
                                        <div className="text-right form-group">
                                            <button type="button" onClick={this.addOutput} className="btn btn-sm btn-outline-primary"> 
                                                <i className="fa fa-plus"></i> 
                                                &nbsp;Add more
                                            </button>
                                        </div>
                                    ) : null}
                                    { this.state.exchnage_coin_name ? outputs : null}
                                    {this.state.error? <p className="text-center btn btn-block btn-outline-danger">Sum of output share must be equal to 100</p> : <button className="btn btn-block btn-outline-primary">Start Transaction</button> }
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
    cp: state.cp
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCoins: () => {
      dispatch(fetchCoins());
    },
    fetchCP: (coin) => {
        dispatch(fetchCP(coin))
    }, 
    submitTrnsaction: (data) => {
        dispatch(submitTrnsaction(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinExchange);