import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../api";
import { getUser } from "../auth";

export default class ProtectedRoute extends React.Component {
  render() {
    const { children, requireConfigured = false } = this.props;
    const token = getToken();
    const user = getUser();
    if (!token || !user) return <Navigate to="/signin" replace />;

    if (requireConfigured && !user.isConfigured) {
      return <Navigate to="/configure" replace />;
    }
    return children;
  }
}
