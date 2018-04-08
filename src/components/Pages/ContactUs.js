import React, {Component} from 'react';

export default class ContactUs extends Component {

  render() {return(
    <div className="container">
      <div className="row">
        <div className="col-md-12 mt-5 mb-5">
          <h2 className="text-left mb-3">Contact Us</h2>
          <p>To report any issues with a transaction please email us at <a href="mailto:support@ledgershield.io">support@ledgershield.io</a></p>
          <h4 className="mt-3">Run a business that can use our service?</h4>
          <p>Email us at <a href="mailto:development@ledgershield.io">development@ledgershield.io</a></p>
          <p className="text-muted">Our email is power by ProtonMail. Please send any expiring emails with at least a 24hr viewing period.</p>
        </div>
      </div>
    </div>
  )
  }
}