import React, {Component} from 'react';
import {mediaUrl } from './../../utils/misc';
import map from 'lodash/map';

class OrderDetail extends Component {
    
    render(){       
        
        const { deposit, withdraw, wallet_address, exchange_rate, outs } = this.props.tx

        const outputs = map(outs, (out, i) => {
            return (
                <p key={i}  className="wallet-address">
                    {out.address} <span className="badge badge-light">{out.value}%</span></p>
            ) 
        })


        return(
            <div className="card-body order-details">
            <h4 className="card-title text-muted">Order Details</h4>
            <div className="row">
                <div className="col-md-12 text-muted">
                    <h5>
                        <img width="32px" src={mediaUrl(deposit.image)} alt={deposit.name} />
                        <span>&nbsp;Deposit</span>
                    </h5>
                    {wallet_address? <p className="wallet-address">{wallet_address}</p> : <p>Please wait generating deposit address!</p> }
                    
                    <h5>
                        <img width="32px" src={mediaUrl(withdraw.image)} alt={withdraw.name} />
                        <span>&nbsp;Receive</span>
                    </h5>
                    {outputs}
                    <h5 className="d-block">Final Rate</h5><span>1 {deposit.symbol} = {exchange_rate} {withdraw.symbol}</span>
                </div>
            </div>
        </div>
        )
    }
}


export default OrderDetail;