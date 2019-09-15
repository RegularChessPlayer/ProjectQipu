import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import './index.css';
import Topo from './components/Navigation.js';
import IcaoView from './views/IcaoView.js';
import ValExtView from './views/ValExtView.js';

import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;


class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Layout style={{ minHeight: '100vh' }}>
            <Topo />
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }} />
              <Content style={{ margin: '0 16px' }}>
                <Switch>
                  <Route exact path='/' component={ValExtView} />
                  <Route exact path='/aviador' component={IcaoView} />
                </Switch>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Develop by Thiago Rodrigues ©2019</Footer>
            </Layout>
          </Layout>
        </Router>
      </div >
    );
  }
}

export default App;
