import React, {Component} from 'react';


class OrderDetail extends Component {

    render(){       
        
        const { deposit, withdraw, wallet_address, withdrawl_address} = this.props.tx
        return(
            <div className="card-body order-details">
            <h4 className="card-title text-muted">Order Details</h4>
            <div className="row">
                <div className="col-md-12 text-muted">
                    <h5>
                        <img width="32px" src={deposit.image} alt={deposit.name} />
                        <span>&nbsp;Deposit</span>
                    </h5>
                    {wallet_address? <p className="wallet-address">{wallet_address}</p> : <p>Please wait generating deposit address!</p> }
                    
                    <h5>
                        <img width="32px" src={withdraw.image} alt={withdraw.name} />
                        <span>&nbsp;Receive</span>
                    </h5>
                    <p className="wallet-address">{withdrawl_address}</p>
                    <p><strong className="d-block">Final Rate</strong><span>1 BTC = 10 ETH</span></p>
                </div>
            </div>
        </div>
        )
    }
}


export default OrderDetail;