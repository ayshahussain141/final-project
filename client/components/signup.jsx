import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const reqObj = {};
    reqObj.userName = this.state.username;
    reqObj.email = this.state.email;
    reqObj.password = this.state.password;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqObj)
    };
    fetch('/api/auth/sign-up', req)
      .then(res => res.json())
      .then(result => {
        return result;
      })
      .catch(err => console.error(err));
    this.setState({
      username: '',
      email: '',
      password: ''
    });
    event.target.reset();
  }

  render() {
    return (
      <div className='col-10 text-center m-5'>
        <h2 className='mb-4'>Create Your Account</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <div>
              <input
                required
                autoFocus
                onChange={this.handleChange}
                id="username"
                type="text"
                name="username"/>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div>
              <input
                required
                onChange={this.handleEmailChange}
                id="email"
                type="email"
                name="email"/>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Create Password
            </label>
            <div>
              <input
                required
                id="password"
                type="password"
                onChange={this.handlePasswordChange}
                name="password" />
            </div>
          </div>
          <div>
            <small>
              <a/>
            </small>
            <button type="submit" className="btn bg-primary text-light mt-3">Create Your Account</button>
          </div>
        </form>
      </div>
    );
  }
}
