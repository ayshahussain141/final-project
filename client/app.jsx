import React from 'react';
import Home from './pages/home';
import parseRoute from './lib/parse-route';
import AuthPage from './pages/auth';
import AppContext from './lib/app-context';
import Header from './components/header';
import jwtDecode from 'jwt-decode';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      user: null
    };
    this.renderPage = this.renderPage.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  handleSignIn() {
  }

  handleSignOut() {

  }

  renderPage() {
    const { route } = this.state;

    if (route.path === '') {
      return <Home/>;
    }
    if (route.path === 'sign-up' || route.path === 'sign-in') {
      return <AuthPage/>;
    }
  }

  render() {
    const { renderPage } = this;
    const { route, user, handleSignIn, handleSignOut } = this.state;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <Header />
          {renderPage()}
        </>
      </AppContext.Provider>

    );

  }
}
