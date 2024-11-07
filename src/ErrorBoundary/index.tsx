import { Component, ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Caught an error:', error, info);
    this.setState({ error });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          {this.state.error && (
            <p>Error details: {this.state.error.toString()}</p>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
