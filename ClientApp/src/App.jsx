import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import NotFound from './pages/NotFound'
import './custom.scss'
import MyIssues from './pages/MyIssues'
export default class App extends Component {
  static displayName = App.name

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/issues/my" component={MyIssues} />
          {/* <Route exact path="/typescript" component={HeyWorld} /> */}
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Layout>
    )
  }
}
