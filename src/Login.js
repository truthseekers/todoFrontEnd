import React, { Component, useState } from "react";
import NavTodo from "./NavTodo";
import { AUTH_TOKEN } from "./constants";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Button from "react-bootstrap/Button";
import { useQuery, useMutation } from "@apollo/react-hooks";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

function Login(props) {
  const [login, setLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [testField, setTestField] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [doLogin, loginObj] = useMutation(LOGIN_MUTATION, {
    onCompleted(data) {
      //console.log("uhh.. completed login?");
      //console.log(data);
      props.setLoggedInUser(data.login.user);
      //console.log("data.login.user in login.js");
      //console.log(data.login.user);
      localStorage.setItem("userName", data.login.user.name);
      localStorage.setItem("userId", data.login.user.id);

      //console.log(localStorage.getItem("user"));
      _confirm(data);
    },
    onError(data) {
      //console.log("You got the following error: ");
      //console.log(data.graphQLErrors);
      setErrors(data.graphQLErrors);
      // console.log(data);
    },
  });

  const [doSignup, signupObj] = useMutation(SIGNUP_MUTATION, {
    onCompleted(data) {
      console.log("completed SIGNUP");
      console.log(data);
      localStorage.setItem("userName", data.signup.user.name);
      localStorage.setItem("userId", data.signup.user.id);
      props.setLoggedInUser(data.signup.user);
      _confirm(data);
    },
    onError(data) {
      //console.log("Following signup error: ");
      //console.log(data.graphQLErrors);
      setErrors([{ message: "Something went wrong. Please try again" }]);
    },
  });

  const _confirm = async (data) => {
    const { token } = login ? data.login : data.signup;
    //console.log("in confirm in Login.js.");
    // const { token } = this.state.login ? data.login : data.signup;
    _saveUserData(token);
    // this.props.setLoggedInUser("poop");
    props.history.push(`/`);
    //props.setLoggedInUser(true);
    // setLogin(true);
  };

  const _saveUserData = (token) => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
  // }

  const handleLogin = () => {
    //console.log("clicked login!");
    if (login) {
      doLogin({ variables: { email, password, name: userName } });
    } else {
      doSignup({ variables: { email, password, name: userName } });
    }
  };

  let errorsList = [];
  if (errors) {
    errorsList = errors.map((error) => <li>{error.message}</li>);
  }

  //console.log("the errorsList: ");
  //console.log(errorsList);

  return (
    <div>
      <h4 className="mv3">{login.login ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-column">
        {!login && (
          <div>
            <input
              value={login.userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Your name"
            />
          </div>
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <h3>yo man</h3>
      <div className="flex mt3">
        <div className="pointer mr2 button" onClick={handleLogin}>
          <button>{login ? "login" : "create account"}</button>
        </div>
        {/* <div className="pointer button" onClick={() => setLogin(!login)}> */}
        <div className="pointer button" onClick={() => setLogin(!login)}>
          {login ? "need to create an account?" : "already have an account?"}
        </div>
      </div>
      error list: {errorsList}
    </div>
  );
}

// class Login extends Component {
//   constructor(props) {
//     super(props);

//     this.handleUpdate = this.handleUpdate.bind(this);
//   }
//   // state = {
//   //   login: true,
//   //   email: "",
//   //   password: "",
//   //   name: "",
//   //   testField: "",
//   // };

//   // handleUpdate(event) {
//   //console.log("clicked the btn!");
//   // this.props.setLoggedInUser("poop");
//   // }

//   render() {
//     const { login, email, password, name, testField } = this.state;
//     //console.log(login ? "LOGIN_MUTATION" : "SIGNUP_MUTATION");
//     return (
//       <div>
//         {/* <h4 className="mv3">{login ? "Login" : "Sign Up"}</h4> */}
//         <div className="flex flex-column">
//           <input
//             value={testField}
//             onChange={(e) => this.setState({ testField: e.target.value })}
//             type="text"
//             placeholder="Test field"
//           />

//           <div className="pointer mr2 button" onClick={this.handleUpdate}>
//             <button>Update test state</button>
//           </div>

//           {!login && (
//             <div>
//               <input
//                 value={name}
//                 onChange={(e) => this.setState({ name: e.target.value })}
//                 type="text"
//                 placeholder="Your name"
//               />
//             </div>
//           )}
//           <input
//             value={email}
//             onChange={(e) => this.setState({ email: e.target.value })}
//             type="text"
//             placeholder="Your email address"
//           />
//           <input
//             value={password}
//             onChange={(e) => this.setState({ password: e.target.value })}
//             type="password"
//             placeholder="Choose a safe password"
//           />
//         </div>
//         <h3>yo man</h3>
//         <div className="flex mt3">
//           {/* <Mutation
//             mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
//             variables={{ email, password, name }}
//             onCompleted={(data) => {
//               //console.log("onCompleted??");
//               this._confirm(data);
//             }}
//           >
//             {(mutation) => ( */}
//           <div className="pointer mr2 button">
//             <button>{login ? "login" : "create account"}</button>
//           </div>
//           {/* )} */}
//           {/* </Mutation> */}
//           <div
//             className="pointer button"
//             onClick={() => this.setState({ login: !login })}
//           >
//             {login ? "need to create an account?" : "already have an account?"}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   _confirm = async (data) => {
//     //console.log("inside _confirm. data: ");
//     //console.log(data);
//     const { token } = this.state.login ? data.login : data.signup;
//     this._saveUserData(token);
//     // this.props.setLoggedInUser("poop");
//     this.props.history.push(`/`);
//   };

//   _saveUserData = (token) => {
//     localStorage.setItem(AUTH_TOKEN, token);
//   };
// }

//export { Login, authContext2};

export default Login;
