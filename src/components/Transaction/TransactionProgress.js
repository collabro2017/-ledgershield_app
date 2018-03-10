import React, { Component } from 'react';
import { fetchTransaction, fetchTransactionSuccess } from './../../actions/transactionActions';
import OrderDetail from './OrderDetail';
import { connect } from 'react-redux';

class TransactionProgress extends Component {
    componentWillMount() {
        const txid = this.props.match.params.txid
        this.props.fetchTransaction(txid);
        const socket = new WebSocket('ws://localhost:8081/ws/tx/' + txid)
        this.props.handleSocketEvents(socket)
    }

    render() {

        const progress = {
            'submitted':{
                'progress': 16.66,
                'label': 'Transaction is submitted'
            },
            'awaiting':{
                'progress': 33.33,
                'label': 'Waiting for deposit'
            },
            'waiting_for_confirmation':{
                'progress': 50,
                'label': 'Wating for transaction confirmation'
            },
            'deposit_received':{
                'progress': 66.66,
                'label': 'Wating for transaction confirmation'
            },
            'exchange':{
                'progress': 83.33,
                'label': 'Exchanging'
            },
            'completed':{
                'progress': 100,
                'label': 'All Done!'
            },
            
        }
        const { data, loading } = this.props.transaction;
        let status;
        if(!loading){
            status = progress[data.status];
        }
        return (
            <div className="container mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <h3 className="mt-3 text-center">Transaction status {loading ? (<i className="fa fa-spinner fa-spin"></i>) : null}</h3>
                        {loading ? null : (<div className="card mt-3">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-9 tx-header">
                                        <strong className="align-middle">Order ID:</strong>
                                        <span className="align-middle">{data.order_id}</span>
                                    </div>
                                    <div className="col-md-3 text-right">
                                        <button className="btn btn-sm btn-info">bookmark</button>
                                    </div>
                                </div>

                            </div>
                            <div className="card-body">                                
                                <p className="card-text text-right">Confirmations {data.deposit_tx_confirmations}/6</p>
                            </div>
                            <div className="card-body tx-progress">
                                <div className="row text-center">
                                    <div className="col-md-12">
                                        <i className="fa fa-exchange"></i>
                                        <label>{status.label}</label>
                                    </div>
                                    <div className="col-md-12 mt-3">
                                        <div className="progress">
                                            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: status.progress + '%' }}>
                                                {status.progress}% - {status.label} 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {data ? <OrderDetail tx={data} /> : null}
                        </div>)}

                        <div className="row">
                            <div className="col-md-12">

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
        transaction: state.tx_detail,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTransaction: (txid) => {
            dispatch(fetchTransaction(txid));
        },
        handleSocketEvents: (socket) => {

            socket.onopen = (e) => {
                console.log(e)
            };

            socket.onclose = (e) => {
                console.log(e)
            }

            socket.onerror = (e) => {
                console.log(e)
            }

            socket.onmessage = (e) => {
               console.log(typeof e.data)
                try {
                    const tx = JSON.parse(e.data)
                    console.log(tx)
                    dispatch(fetchTransactionSuccess(tx))
                }
                catch (err) {
                    console.log(err)
                }
            }
        }

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(TransactionProgress);