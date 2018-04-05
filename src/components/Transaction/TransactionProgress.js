import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { fetchTransaction, fetchTransactionSuccess } from './../../actions/transactionActions';
import { connect_socket } from './../../actions/websocket.actions';
import OrderDetail from './OrderDetail';
import { connect } from 'react-redux';


class TransactionProgress extends Component {
    componentWillMount() {
        const txid = this.props.match.params.txid
        this.props.fetchTransaction(txid);
        // const socket = new WebSocket('ws://localhost:8081/ws/tx/' + txid)
        // this.props.handleSocketEvents(socket)
        this.props.connect_socket(txid);
    }

    CreateBookmarkLink(){
        alert('Please press CTRL+B (or Command+D for macs) to bookmark this page.');
    }

    render() {

        const progress = {
            'submitted':{
                'progress': 25,
                'label': 'Transaction submitted',
                'cssClass': 'bg-info' 
            },
            'awaiting':{
                'progress': 33.33,
                'label': 'Waiting for deposit',
                'cssClass': 'bg-info' 
            },
            'waiting_for_confirmation':{
                'progress': 50,
                'label': 'Wating for confirmation',
                'cssClass': 'bg-info' 

            },
            'deposit_received':{
                'progress': 66.66,
                'label': 'Deposit received',
                'cssClass': 'bg-info' 
            },
            'exchange':{
                'progress': 83.33,
                'label': 'Exchanging',
                'cssClass': 'bg-info' 
            },
            'completed':{
                'progress': 100,
                'label': 'All Done!',
                'cssClass': 'bg-success' 
            },
            'out_order': {
                'progress': 83.33,
                'label': 'Out of order',
                'cssClass': 'bg-warning'  
            }
            
        }
        const { data, loading } = this.props.transaction;
        let status = {
            'submitted':{
                'progress': 16.66,
                'label': 'Transaction is submitted',
                'cssClass': 'bg-info' 
            }
        };
        if(!loading && data !== null && data.hasOwnProperty('status')){
            status = progress[data.status];
        }
        return (
            <div className="container mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <h3 className="mt-3 text-center">Transaction status {loading ? (<i className="fa fa-spinner fa-spin"></i>) : null}</h3>
                        {data ? (<div className="card mt-3">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-9 tx-header">
                                        <strong className="align-middle">Order ID:</strong>
                                        <span className="align-middle">{data.order_id}</span>
                                    </div>
                                    <div className="col-md-3 text-right">
                                        <button className="btn btn-sm btn-info" onClick={this.CreateBookmarkLink}>bookmark</button>
                                    </div>
                                </div>

                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4 text-center">Created at <br /><Moment fromNow>{data.date_created}</Moment></div>
                                    <div className="col-md-4 text-center">Update at <br /><Moment fromNow>{data.date_modified}</Moment></div>
                                    <div className="col-md-4 text-center" title="At-least 6 confirmations">Confirmations <br /> {data.deposit_tx_confirmations}</div>
                                </div>
                            </div>
                            <div className="card-body tx-progress">
                                <div className="row text-center">
                                    <div className="col-md-12">
                                        <i className="fa fa-exchange"></i>
                                        <label>{status.label}</label>
                                    </div>
                                    <div className="col-md-12 mt-3">
                                        <div className="progress ">
                                            <div className={"progress-bar progress-bar-striped progress-bar-animated "+ (status.cssClass)} style={{ width: status.progress + '%' }} aria-valuenow={status.progress} aria-valuemin="0" aria-valuemax="100">
                                                <span>{status.progress}% - {status.label}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {data ? <OrderDetail tx={data} /> : null}
                        </div>): (<p className="text-center">Unknown transaction!</p>)}

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
        connect_socket: (txid) => {
            dispatch(connect_socket(txid))
        },
        handleSocketEvents: (socket) => {

            socket.onopen = (e) => {
                console.log(`Socket open ${e}`)
            };

            socket.onclose = (e) => {
                console.log(`Connection close ${e}`)
            }

            socket.onerror = (e) => {
                console.log(`Socket error ${e}`)
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