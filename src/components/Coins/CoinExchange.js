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
            outputs: [1],
            
            tx: {
                outs: []
            }

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addOutput = this.addOutput.bind(this);
        this.removeOutput = this.removeOutput.bind(this);
    }
    componentWillMount() {
        this.props.fetchCoins();
    }

    handleChange(e) {
        const {tx} = this.state;
        tx[e.target.name] = e.target.value
        // console.log(tx)
        this.setState({tx})
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
        if (outs[index] !== void 0) {
            outs[index][name] = e.target.value;
        } else {
            outs.push({[name]: e.target.value})
        }
        tx.outs = outs;
        this.setState({tx})
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const {tx} = this.state;
        tx['deposit'] =this.deposit.value                
        this.props.submitTrnsaction(tx);
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
                            <input name={`share_${o}`} type="text" onChange={this.handleOutputs.bind(this, i, 'value')} className="form-control" />                    
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
                    <div className="col-md-8 ml-auto">
                        <div className="card mt-5">
                            <div className="card-body">
                                <h4 className="card-title">Some nice heading ... </h4>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label>Deposit:</label>
                                        <input name="deposit" type="hidden" ref={(input) => this.deposit = input}  defaultValue={depositInfo.id} />                    
                                        <p className="form-control"><img width="30" src={depositInfo.image} alt={depositInfo.symbol} /> <span className="deposit-align">{depositInfo.name}</span></p>
                                    </div>
                                    <div className="form-group">
                                        <label>Your Refund Address:</label>
                                        <input name="rollback_wallet" type="text" className="form-control" onChange={this.handleChange} />                    
                                    </div>
                                    <div className="form-group">
                                        <label>Receive:</label>
                                        <select className="form-control" name="withdraw" onChange={this.handleSelect}>
                                            <option>Choose exhcnage coin!</option>
                                            {coinsOptions}
                                        </select>
                                    </div>
                                     { this.state.exchnage_coin_name ? (
                                        <div className="text-right form-group">
                                            <button type="button" onClick={this.addOutput} className="btn btn-info btn-sm"> 
                                                <i className="fa fa-plus"></i> 
                                                &nbsp;Add more
                                            </button>
                                        </div>
                                    ) : null}
                                    { this.state.exchnage_coin_name ? outputs : null}
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