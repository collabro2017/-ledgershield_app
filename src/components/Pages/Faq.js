import React, {Component} from 'react';

export default class Faq extends Component {

    render() {
        return(<div className="container">
            <div className="row">
                <div class="col-md-12 mt-5 mb-5">
                    <h2 className="text-left mb-3">Frequently asked questions (FAQ)</h2>
                    <p>Why does exchanging currency matter when staying anonymous using crypto?</p>
                    <p>The biggest tracking companies only track transactions across the Bitcoin blockchain.</p> 
                    <p>How is Ledger Shield different from Bitcoin tumblers, a.k.a mixers? </p>
                    <p>Competing anonymity services have two very big problems. They only stay on one blockchain, Bitcoin, and give you other user’s coins. </p>
                    <p>Today’s tracking services are only monitoring the Bitcoin blockchain, this means our competitors do not make you untraceable. Chainalysis, Elliptic, and other firms deploy over a billion dollars on monitoring Bitcoin, there is no way tumblers can keep up. </p>
                    <p>Why is it a problem that tumblers give you back other user’s coins? </p>
                    <p>Tumblers mix your coins with those of other users and give them back to you. This links their payment history to yours, and any liabilities they may have. </p>
                    <p>We provide all our users with coins from exchanges across the globe. Those coins have already been cleared of any problematic history by those exchanges. </p>
                    <p>What happens if I contact you regarding a problematic transaction, but do not receive a response until after 24hrs has passed. </p>
                    <p>As soon as you contact us regarding any issues we will hold that transaction data until the issue is resolved. </p>
                    <p>How big of a trade can I make at one time? </p>
                    <p>There are currently no limits on transaction size. However, in order to ensure all payments are entirely untraceable, payments may be delayed during periods of high traffic. </p>
                    <p>We are actively growing our capacity to process simultaneous and large transactions, and will regularly update guidelines (not hard caps) for transaction sizes. </p>
                </div>
            </div>
        </div>)
    }
}