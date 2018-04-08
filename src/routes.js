import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import App from './components/App/App';
import Home from './components/Home/Home';
import CoinExchange from './components/Coins/CoinExchange';
import TransactionProgress from './components/Transaction/TransactionProgress';
import { About, Faq, Fee, ContactUs } from './components/Pages';

export default class AppRoutes extends Component {
  render(){
      return (
          <App>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/exchange/:depositCoin' component={CoinExchange} />
                <Route path='/tx/status/:txid' component={TransactionProgress} />
                <Route path='/about' component={About} />
                <Route path='/faq' component={Faq} />
                <Route path='/service-fee' component={Fee} />
                <Route path='/contact-us' component={ContactUs} />
              </Switch>
          </App>
        )
    }
}
