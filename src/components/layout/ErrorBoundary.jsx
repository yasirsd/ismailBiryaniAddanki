import { Component } from 'react'

/**
 * Recovers the app from transient DOM reconciliation errors caused by
 * third-party scripts (browser translation extensions, ad blockers, password
 * managers, etc.) that mutate the DOM between React's render and commit
 * phases — most commonly surfacing as:
 *
 *   NotFoundError: Failed to execute 'insertBefore' on 'Node'
 *
 * When such an error is caught we simply force a re-render on the next tick;
 * React re-mounts the subtree cleanly on a fresh DOM. In production this
 * happens invisibly; in dev the console still logs the error so real bugs are
 * not hidden.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // Keep the raw error visible in the console for debugging.
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error, info?.componentStack)

    // Recover automatically on the next frame so the user never sees a broken
    // page from a transient extension-induced DOM race.
    window.requestAnimationFrame(() => {
      this.setState({ hasError: false })
    })
  }

  render() {
    if (this.state.hasError) {
      // Render an empty placeholder for one frame while React remounts.
      return this.props.fallback ?? null
    }
    return this.props.children
  }
}
