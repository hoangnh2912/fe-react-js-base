import React from "react";
import { Link, Redirect } from "react-router-dom";
import { requestLogin } from "../../constants/Api";
import Cookie from "js-cookie";

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.login = this.login.bind(this);
  }

  async login() {
    try {
      const res = await requestLogin({
        USERNAME: this.state.username,
        PASS: this.state.password,
      });
      console.log(res);
      Cookie.set("SESSION_ID", res.data.TOKEN);
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  }

  handleTextChange(field, event) {
    this.setState({
      [field]: event.target.value,
    });
  }

  render() {
    const { username, password } = this.state;

    return (
      <>
        <div></div>
      </>
    );
  }
}
export default LoginScreen;
