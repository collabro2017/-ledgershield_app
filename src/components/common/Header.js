import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from './../../assets/logo.png';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light box-shedow border-bottom">
        <div className="container">
          <Link className="navbar-brand" to={'/'}><img src={logo} alt="Ledger Shield" title="Ledger shield" /><small>Off The Chain</small></Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to={'/'}>Home</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to={'/about'}>About</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to={'/faq'}>FAQ</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to={'/service-fee'}>Service Fee</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to={'/contact-us'}>Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
     </nav>
    )
  }
}
export default Header;
