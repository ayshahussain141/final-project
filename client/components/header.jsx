import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  static contextType = AppContext;
  render() {
    const { user, handleSignOut } = this.context;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            SchoolZen
          </a>
          <div>
            {user !== null &&
              <button className="btn btn-dark" onClick={handleSignOut}>
                Sign out
                <i className="ms-2 fas fa-sign-out-alt" />
              </button>
            }
            {user === null &&
              <>
                <a href="#sign-in" className="btn btn-primary">
                  Sign In
                </a>
                <a href="#sign-up" className="btn btn-dark">
                  Sign Up
                </a>
              </>
            }
          </div>
        </div>
      </nav>
    );
  }
}
