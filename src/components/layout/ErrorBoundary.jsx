import { Component } from 'react';
import Button from '../ui/Button.jsx';

/** Catches render errors anywhere below it and shows a recovery screen instead of a blank page. */
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Unhandled UI error', error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main role="alert" className="gutter mx-auto flex min-h-dvh max-w-[480px] flex-col items-center justify-center text-center">
        <h1 className="text-lg font-semibold">Something went wrong</h1>
        <p className="mt-1 text-[13px] text-muted">An unexpected error occurred. Reload the page to continue.</p>
        <Button size="md" className="mt-5" onClick={() => window.location.reload()}>
          Reload
        </Button>
      </main>
    );
  }
}
