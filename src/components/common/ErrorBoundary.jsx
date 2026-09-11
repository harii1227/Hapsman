import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6 text-center">
          <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-lg border border-amber-500/20 shadow-2xl space-y-5">
            <img src="/hapsman-logo.jpg" alt="HAPSMAN" className="w-16 h-16 object-contain mx-auto rounded-full border border-[#1B4D3E]" />
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
              Something went wrong
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We encountered an unexpected issue displaying this page. Please return to the homepage or reload the page.
            </p>
            {this.state.error && (
              <div className="bg-red-50 p-3 rounded-xl border border-red-200 text-left text-xs font-mono text-red-800 overflow-x-auto max-h-40">
                {this.state.error.toString()}
              </div>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.href = '/';
                }}
                className="w-full sm:w-auto px-6 py-3 bg-[#1B4D3E] text-amber-200 rounded-xl font-bold text-xs sm:text-sm hover:bg-[#0F2C23] transition-colors shadow-md"
              >
                Back to Homepage
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto px-6 py-3 bg-stone-100 text-stone-800 rounded-xl font-semibold text-xs sm:text-sm hover:bg-stone-200 transition-colors border border-stone-300"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
