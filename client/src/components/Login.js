import React from "react";
import axios from "axios";
import { axiosWithAuth } from '../utils/axiosWithAuth';


// const Login = () => {
//   // make a post request to retrieve a token from the api
//   // when you have handled the token, navigate to the BubblePage route
//   return (
//     <>
//       <h1>Welcome to the Bubble App!</h1>
//       <p>Build a login page here</p>
//     </>
//   );
// };

// export default Login;
class Login extends React.Component {

  state = {
    credentials: {
      username: '',
      password: ''
    },
    isLoggedIn: false
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = event => {
    event.preventDefault();
    axiosWithAuth().post('http://localhost:5000/api/login', this.state.credentials)
    .then(response => {
        console.log(response);
        const { data } = response;

        localStorage.setItem("token", data.payload);
        this.setState({ ...this.state, isLoggedIn: true });
        this.props.history.push('/protected');
    })
}

componentDidMount() {
  if (localStorage.getItem("token")) {
    this.setState({ ...this.state, isLoggedIn: true });
  } else {
    this.setState({ ...this.state, isLoggedIn: false });
  }
}

  render() {
    return (
      <div>
        <h1>Welcome to the Bubble App!</h1>
        <p>Build a login page here</p>
        <h2>{this.state.isLoggedIn ? "LOGGED IN!" : "Please login"}</h2>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    );
  }
}  

export default Login;