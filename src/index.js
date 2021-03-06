import React from 'react'
import ReactDOM from 'react-dom'
import api from './api'
import App from './components/App'
import AboutPage from './components/AboutPage'
import TaskListsPage from './components/TaskListsPage'
import TasksPage from './components/TasksPage'
import SigninPage from './components/SigninPage'
import SignedInLayout from './components/SignedInLayout'
import SessionActions from './actions/SessionActions'
import SessionStore from './stores/SessionStore'
import {
  Router,
  Route,
  Redirect,
  hashHistory
} from 'react-router'

window.handleGoogleApiLoaded = () => {
  SessionActions.authorize(true, renderApp)
}

function renderApp () {
  ReactDOM.render(
    <Router history={hashHistory}>
      <Redirect from='/' to='/signin' />
      <Route path='/' component={App}>
        <Route path='/signin' component={SigninPage} />
        <Route component={SignedInLayout} onEnter={requireAuth} >
          <Route path='/about' component={AboutPage} />
          <Route path='/lists' component={TaskListsPage}>
            <Route path='/lists/:id' component={TasksPage} />
          </Route>
        </Route>
      </Route>
    </Router>,
    document.getElementById('root')
  )
}

function requireAuth (nextState, replace) {
  if (!SessionStore.isSignedIn()) {
    replace({
      pathname: '/signin',
      state: {
        nextPathname: nextState.location.pathname
      }
    })
  }
}
