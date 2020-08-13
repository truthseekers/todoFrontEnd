import React, { Component } from "react";
import NavTodo from "./NavTodo";
import { AUTH_TOKEN } from "./constants";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Button from "react-bootstrap/Button";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
  }
  state = {
    login: true,
    email: "",
    password: "",
    name: "",
    testField: "",
  };

  handleUpdate(event) {
    console.log("clicked the btn!");
    this.props.setLoggedInUser("poop");
  }

  render() {
    const { login, email, password, name, testField } = this.state;
    console.log(login ? "LOGIN_MUTATION" : "SIGNUP_MUTATION");
    return (
      <div>
        <h4 className="mv3">{login ? "Login" : "Sign Up"}</h4>
        <div className="flex flex-column">
          <input
            value={testField}
            onChange={(e) => this.setState({ testField: e.target.value })}
            type="text"
            placeholder="Test field"
          />

          <div className="pointer mr2 button" onClick={this.handleUpdate}>
            <button>Update test state</button>
          </div>

          {!login && (
            <div>
              <input
                value={name}
                onChange={(e) => this.setState({ name: e.target.value })}
                type="text"
                placeholder="Your name"
              />
            </div>
          )}
          <input
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Your email address"
          />
          <input
            value={password}
            onChange={(e) => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <h3>yo man</h3>
        <div className="flex mt3">
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password, name }}
            onCompleted={(data) => this._confirm(data)}
          >
            {(mutation) => (
              <div className="pointer mr2 button" onClick={mutation}>
                <button>{login ? "login" : "create account"}</button>
              </div>
            )}
          </Mutation>
          <div
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login ? "need to create an account?" : "already have an account?"}
          </div>
        </div>
      </div>
    );
  }

  _confirm = async (data) => {
    console.log("inside _confirm. data: ");
    console.log(data);
    const { token } = this.state.login ? data.login : data.signup;
    this._saveUserData(token);
    this.props.setLoggedInUser("poop");
    this.props.history.push(`/`);
  };

  _saveUserData = (token) => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
}

//export { Login, authContext2};

export default Login;
