import React, { Component } from "react";
import default_image from "./../../assets/aboutus.jpg";

export default class About extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center mt-5">
            <h3>We Dodge The World's Biggest Tracking Companies</h3>
            <h4 className="text-muted pt-2">
              Our Process passes through multiple blockchains!
            </h4>
            <div className="card mt-5 bg-info mb-3">
              <div className="card-header">
                <h5>How it works</h5>
              </div>
              <img src={default_image} alt="Exchange Process" />
              <div className="card-body bg-white">
                <div className="card-deck">
                  <div className="card">
                    <div className="card-body">
                      <p class="card-text">
                        You choose which coins you want. Tell us where to send
                        them. Send us your coins and track the whole process in
                        real time!
                      </p>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <p class="card-text">
                        We sell your coins through tons of wallets and addresses
                        to numerous global liquidity providers, and exchange
                        fresh coins on the open market multiple times before
                        giving them to you.
                      </p>
                      <strong>But you don't have to wait!</strong>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <p class="card-text">
                        Right after we receive your coins the exchange rate is
                        locked-in, and send you the coins you want to the
                        addresses you provided.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p>
              Chainalysis, Elliptic, and other tracking companies currently only
              track the Bitcoin <br />blockchain which exposes mixers to greate
              risk! <br />We give you the privacy you deserve.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
