import React from 'react';
import Home from './pages/home';
import parseRoute from './lib/parse-route';
import AuthPage from './pages/auth';
import AppContext from './lib/app-context';
import Header from './components/header';
import jwtDecode from 'jwt-decode';
import HomePage from './pages/home-page';
import Posted from '../client/components/postedassignment';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    window.localStorage.setItem('user', user.userId);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('id');
    this.setState({ user: null });
    window.location.hash = '';
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'courses') {
      return <Home/>;
    }
    if (route.path === 'assignments') {
      return <Posted/>;
    }
    if (route.path === '') {
      return <HomePage />;
    }
    if (route.path === 'sign-up' || route.path === 'sign-in') {
      return <AuthPage/>;
    }
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <Header />
          {this.renderPage()}
        </>
      </AppContext.Provider>
    );
  }
}
