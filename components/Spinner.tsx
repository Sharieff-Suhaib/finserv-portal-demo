import React from "react";

/**
 * A simple loading spinner component.
 * BUG (Issue 4): This component exists but is never used
 * on the issues page — the sync button has no loading state.
 */
export default function Spinner() {
  return (
    <div className="spinner" role="status">
      <div className="spinner-circle" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
