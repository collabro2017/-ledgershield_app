import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light box-shedow border-bottom">
        <div className="container">
          <Link className="navbar-brand" to={'/'}>Ledger Shield</Link>
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
                <Link className="nav-link" to={'/support'}>Support</Link>
              </li>
            </ul>
          </div>
        </div>
     </nav>
    )
  }
}
export default Header;