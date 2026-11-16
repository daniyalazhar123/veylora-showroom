"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: "",
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught client boundary error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, errorMessage: "" });
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full p-8 my-6 rounded-2xl bg-surface-card border border-borderGold/40 text-center space-y-4">
          <div className="w-12 h-12 rounded-full border border-gold-500/50 bg-gold-500/10 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6 text-gold-400" />
          </div>
          <h3 className="font-display text-xl font-bold text-white">
            {this.props.fallbackTitle || "Sanctuary Display Interrupted"}
          </h3>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            A visual rendering glitch occurred. Click below to refresh the showroom display.
          </p>
          <button
            onClick={this.handleReset}
            className="btn-gold px-5 py-2.5 rounded-lg text-xs uppercase font-mono tracking-wider font-bold inline-flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5 text-black" />
            <span>Reload Showroom</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
