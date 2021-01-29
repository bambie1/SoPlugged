import React, { Component } from "react";
import * as Sentry from "@sentry/browser";
import { Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const card = {
  margin: "auto",
  maxWidth: "400px",
};

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null, eventId: "" };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({
        error,
        errorInfo,
        eventId,
      });
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <Alert severity="error" style={card}>
          <h2>Uh-oh! Something went wrong.</h2>
          <p>
            The SoPlugged Dev team has been alerted, and will look to resolve
            this right away.
          </p>
          <Button
            className="bg-primary text-light"
            onClick={() =>
              Sentry.showReportDialog({ eventId: this.state.eventId })
            }
          >
            Report feedback
          </Button>
        </Alert>
      );
    }
    return this.props.children;
  }
}
