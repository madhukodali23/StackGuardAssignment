import React from "react";
import { api } from "../api";
import { getUser, saveUser, logout } from "../auth";

export default class ConfigPage extends React.Component {
  state = { key: "", error: "", success: "" };

  submit = async (e) => {
    e.preventDefault();
    const { key } = this.state;
    if (key.length < 100 || key.length > 1000)
      return this.setState({ error: "Key must be 100–1000 characters", success: "" });

    try {
      const data = await api("/api/config", {
        method: "POST",
        body: { key },
        auth: true
      });
      const u = getUser();
      saveUser({ ...u, isConfigured: data.isConfigured });
      this.setState({ success: "Verified!", error: "" });
      window.location.href = "/dashboard";
    } catch (err) {
      this.setState({ error: err.message || "Failed", success: "" });
    }
  };

  render() {
    return (
      <div className="grid">
        <div className="left" />
        <div className="right">
          <div className="container" style={{ maxWidth: 520 }}>
            <div className="brand">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l7 4v6c0 5-7 10-7 10S5 17 5 12V6l7-4z"/></svg>
              <strong>Stackguard</strong>
            </div>
            <div className="header">Verify your public key</div>
            <div className="sub">To get started provide your public key for verification</div>

            <form className="form" onSubmit={this.submit}>
              <textarea
                className="input"
                style={{ height: 120, resize: "vertical" }}
                placeholder="Enter your public key"
                value={this.state.key}
                onChange={(e) => this.setState({ key: e.target.value })}
              />
              {this.state.error && <div className="error">{this.state.error}</div>}
              <button className="btn">Verify</button>
            </form>

            <div style={{ marginTop: 12 }}>
              <button className="link" style={{ background:"transparent", border:0, padding:0 }} onClick={logout}>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
