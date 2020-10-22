import React, { Component } from "react";
import styled from "styled-components";

const ErrorBoundaryDiv = styled.div`
  margin: 30px;
  background-color: #ff6961;
  border-radius: 8px;
  height: 30vh;

  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  h1 {
    position: relative;
  }

  flex-shrink: 0;
`;

const Content = styled.div`
  display: flex;
  height: auto;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`;

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ hasError: true, error: error });
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorBoundaryDiv>
          <Header>
            <h1 className="alert-heading">Something went wrong!</h1>
            <p>Please try again later.</p>
            <hr />
          </Header>
          <Content>{this.state.error.message}</Content>
        </ErrorBoundaryDiv>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
