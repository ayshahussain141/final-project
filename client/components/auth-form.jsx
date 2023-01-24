import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
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
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = 'sign-in';
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
    return (
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Username
          </label>
          <div>
            <input
              required
              autoFocus
              id="userName"
              type="text"
              name="userName"
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
    );
  }
}
