import React, { Component } from "react";
import CoinGrid from "./../Coins/CoinGrid";
import default_image from "./../../assets/default.svg";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-5 text-center">
            <h3 className="pt-5 pb-5 ">Which coins do you want to exchange? </h3>
            <CoinGrid />
          </div>
          <div className="col-md-12 pb-5">
            <h4 className="pb-5 text-center">Why should I trade on Ledger Shield? </h4>

            <div className="row">
              <div className="col-md-3 col-sm-12 mb-3">
                <div className="card border-light">
                  <img
                    className="card-img-top"
                    src={default_image}
                    alt="hacker spy"
                  />
                  <div className="pt-3 text-left text-size-88">
                    <p className="card-text">
                      We pay you instantly so there is no central exchange that
                      can get hacked.<br />                    
                      You can spread your coins out among an infinite number of
                      addresses so hacker's won't go after a big single wallet.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-12 mb-3">
                <div className="card border-light">
                  <img
                    className="card-img-top"
                    src={default_image}
                    alt="banks"
                  />
                  <div className="pt-3 text-left text-size-88">
                    <p className="card-text">
                      Major exchanges and their custodial banks track your coins
                      from the moment you buy them. Doin something they don't
                      like? They can shut down your account or refuse to accepts
                      payments.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-12 mb-3">
                <div className="card border-light">
                  <img
                    className="card-img-top"
                    src={default_image}
                    alt="security"
                  />
                  <div className="pt-3 text-left text-size-88">
                    <p className="card-text">
                      Want anonymity without exchanging currency? The coins you
                      will receive are purchased on the open market by us, they
                      are not linked to any other customer or their past
                      activity.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-12 mb-3">
                <div className="card border-light">
                  <img
                    className="card-img-top"
                    src={default_image}
                    alt="no logs"
                  />
                  <div className="pt-3 text-left">
                    <p className="card-text text-size-88">
                      We require no indentifying information, and purge all
                      transaction history daily. Need to reach our support team?
                      You are identified only by your transaction ID# which we
                      log for only 24hrs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
