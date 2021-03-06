import React, {Component} from 'react';
import {mediaUrl } from './../../utils/misc';
import map from 'lodash/map';

class OrderDetail extends Component {
    
    render(){       
        
        const { deposit, withdraw, wallet_address, exchange_rate, outs , destination_tag } = this.props.tx

        const outputs = map(outs, (out, i) => {
            const title = out.amount > 0 ? `${out.amount} ${withdraw.symbol}`: "";
            const explorer_url =`${withdraw.block_explorer_url}${out.tx_hash}`
            return (
                <div key={i} className="wallet-address mb-3" title={title}>
                    <span className="address mb-1 align-middle">
                        {out.address} <span className="badge badge-light" >{out.value}%</span>
                    </span>
                    <span className="float-right">{out.tx_hash?<a className="btn btn-sm btn-outline-success" target="_blank" href={explorer_url}>View at explorer</a>: null}</span>
                </div>
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
                    <div className="mb-3">
                        {wallet_address? <p className="wallet-address address">{wallet_address}</p> : <p className="alert alert-warning">Please wait generating deposit address!</p> }
                    </div>
                    {destination_tag> 0? (
                        <div>
                            <h5>Destination Tag</h5>
                            <p><b>{destination_tag}</b></p>
                            <p className="alert alert-warning text-center"><strong>Warning:</strong> To avoid losing your Ripple, make sure you fill in the appropriate destination tag at the end of the address!</p>
                        </div>
                    ): null}
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