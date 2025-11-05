import React from "react";
import { Link, Navigate } from "react-router-dom";
import { api, setToken } from "../api";
import { saveUser, getUser } from "../auth";

export default class AuthPage extends React.Component {
  state = {
    mode: this.props.mode || "signup", // "signup" | "signin"
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    loading: false,
    error: ""
  };

  componentDidMount() {
    const u = getUser();
    if (u) this.setState({ already: true });
  }

  switchMode = () =>
    this.setState((s) => ({ mode: s.mode === "signup" ? "signin" : "signup", error: "" }));

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  validate = () => {
    const { mode, email, password, confirm, firstName } = this.state;
    if (!email.includes("@")) return "Enter a valid email";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (mode === "signup" && !firstName.trim()) return "First name is required";
    if (mode === "signup" && password !== confirm) return "Passwords do not match";
    return "";
  };

  submit = async (e) => {
    e.preventDefault();
    const msg = this.validate();
    if (msg) return this.setState({ error: msg });

    try {
      this.setState({ loading: true, error: "" });
      const { mode, firstName, lastName, email, password } = this.state;
      const path = mode === "signup" ? "/api/auth/signup" : "/api/auth/signin";
      const payload =
        mode === "signup"
          ? { firstName, lastName, email, password }
          : { email, password };
      const data = await api(path, { method: "POST", body: payload });
      setToken(data.token);
      saveUser(data.user);
      if (data.user.isConfigured) {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/configure";
      }
    } catch (err) {
      this.setState({ error: err.message || "Failed" });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    if (this.state.already) return <Navigate to="/configure" replace />;

    const { mode, error, loading } = this.state;
    return (
      <div className="grid">
        <div className="left" />
        <div className="right">
          <div className="container" style={{ maxWidth: 520 }}>
            <div className="brand">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l7 4v6c0 5-7 10-7 10S5 17 5 12V6l7-4z"/></svg>
              <strong>Stackguard</strong>
            </div>
            <div className="header">
              {mode === "signup" ? "Welcome to Stackguard" : "Welcome back to Stackguard"}
            </div>
            <div className="sub">
              Secure your codebase with advanced secret scanning security best practices
            </div>

            <form className="form" onSubmit={this.submit}>
              {mode === "signup" && (
                <div className="row">
                  <div>
                    <input className="input" name="firstName" placeholder="Enter first name" onChange={this.handleChange}/>
                  </div>
                  <div>
                    <input className="input" name="lastName" placeholder="Enter last name" onChange={this.handleChange}/>
                  </div>
                </div>
              )}

              <input className="input" name="email" placeholder="Enter email ID" onChange={this.handleChange}/>
              <input className="input" type="password" name="password" placeholder="Enter password" onChange={this.handleChange}/>

              {mode === "signup" && (
                <input className="input" type="password" name="confirm" placeholder="Confirm password" onChange={this.handleChange}/>
              )}

              {error && <div className="error">{error}</div>}

              <button className="btn" disabled={loading}>
                {mode === "signup" ? "Create account" : "Sign in"}
              </button>
            </form>

            <div style={{ marginTop: 12 }}>
              {mode === "signup" ? (
                <>Already have an account?{" "}
                  <button onClick={this.switchMode} className="link" style={{ background:"transparent", border:0, padding:0 }}>
                    Sign in
                  </button></>
              ) : (
                <>New here?{" "}
                  <button onClick={this.switchMode} className="link" style={{ background:"transparent", border:0, padding:0 }}>
                    Create account
                  </button></>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
