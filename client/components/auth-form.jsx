import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const reqObj = {};
    reqObj.username = this.state.username;
    reqObj.password = this.state.password;
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqObj)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          this.setState({ message: true });
        }
        if (action === 'sign-up') {
          window.location.hash = 'sign-up';
          event.target.reset();

        } else if (result.user && result.token) {
          window.location.hash = 'courses';
          this.props.onSignIn(result);
        }
      });
  }

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
    const alternateActionHref = action === 'sign-up'
      ? '#sign-in'
      : '#sign-up';
    const alternatActionText = action === 'sign-up'
      ? 'Sign in instead'
      : 'Register now';
    const submitButtonText = action === 'sign-up'
      ? 'Register'
      : 'Log In';
    const errors = action === 'sign-up'
      ? 'User Already Exists'
      : 'Wrong Credentials';
    const showError = this.state.message ? 'view' : 'hidden';
    return (
      <div>
        <div className='row justify-content-center'>
          <div className={`alert alert-danger col-4 text-center ${showError}`} role="alert">
            {errors}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <div>
              <input
                required
                autoFocus
                id="username"
                type="text"
                name="username"
                onChange={handleChange}
                className="form-label" />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div>
              <input
                required
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                className="form-label" />
            </div>
          </div>
          <div>
            <div>
              <small>
                <a className="text-muted" href={alternateActionHref}>
                  {alternatActionText}
                </a>
              </small>
            </div>
            <button type="submit" className="btn bg-primary text-light mt-3">
              {submitButtonText}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
