import React, { useState } from "react";
import NavTodo from "./NavTodo";
import { AUTH_TOKEN } from "./constants";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "./queries";

function Login(props) {
  const [login, setLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [doLogin] = useMutation(LOGIN_MUTATION, {
    onCompleted(data) {
      props.setLoggedInUser(data.login.user);
      localStorage.setItem("userName", data.login.user.name);
      localStorage.setItem("userId", data.login.user.id);

      _confirm(data);
    },
    onError(data) {
      setErrors(data.graphQLErrors);
    },
  });

  const [doSignup] = useMutation(SIGNUP_MUTATION, {
    onCompleted(data) {
      localStorage.setItem("userName", data.signup.user.name);
      localStorage.setItem("userId", data.signup.user.id);
      props.setLoggedInUser(data.signup.user);
      _confirm(data);
    },
    onError(data) {
      setErrors([
        {
          message:
            "Email may already be in use. Something went wrong. Please try again",
        },
      ]);
    },
  });

  const _confirm = async (data) => {
    const { token } = login ? data.login : data.signup;
    _saveUserData(token);
    props.history.push(`/`);
  };

  const _saveUserData = (token) => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
  // }

  const handleLogin = () => {
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

  return (
    <div>
      <NavTodo
        userName={props.userName}
        setLoggedInUser={props.setLoggedInUser}
        loggedInUser={props.loggedInUser}
      />
      <h3 style={{ color: "orange" }}>
        Note: This is a demo app on a DEMO server. Please use fake
        email/passwords. Example - "hello@123.com" and "pass"
      </h3>
      <h4 className="mv3">{login ? "Login" : "Sign Up"}</h4>
      <div style={{ marginBottom: "20px" }} className="flex flex-column">
        {!login && (
          <div>
            <input
              style={{ margin: "10px" }}
              value={login.userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Your name"
            />
          </div>
        )}
        <input
          style={{ margin: "10px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="a fake email address"
        />
        <input
          style={{ margin: "10px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="fake password"
        />
      </div>
      <div className="flex mt3">
        <span
          style={{ margin: "20px" }}
          className="pointer mr2 button"
          onClick={handleLogin}
        >
          <button>{login ? "login" : "Sign Up!"}</button>
        </span>
        <span className="pointer button" onClick={() => setLogin(!login)}>
          <button>
            {login ? "Create an account?" : "already have an account?"}
          </button>
        </span>
      </div>
      {errorsList.length > 0 && <span>error list: {errorsList}</span>}
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
//   // this.props.setLoggedInUser("poop");
//   // }

//   render() {
//     const { login, email, password, name, testField } = this.state;
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
