import React from "react";
import { logout, getUser } from "../auth";

export default class Dashboard extends React.Component {
  render() {
    const user = getUser();
    return (
      <div className="container">
        <div className="brand">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l7 4v6c0 5-7 10-7 10S5 17 5 12V6l7-4z"/></svg>
          <strong>Stackguard</strong>
        </div>
        <div className="card">
          <h1>Dashboard Page</h1>
          <p>Hello {user?.firstName || "user"}, how are you doing today?</p>
          <div style={{ marginTop: 16 }}>
            <button className="btn" onClick={logout}>Sign out</button>
          </div>
        </div>
      </div>
    );
  }
}
