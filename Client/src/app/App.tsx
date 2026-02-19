import { Component, type ReactNode } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index";

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            backgroundColor: "#f3f4f6",
            fontFamily: "sans-serif",
          }}
        >
          <h1 style={{ fontSize: 20, marginBottom: 8, color: "#1f2937" }}>
            Error en la aplicación
          </h1>
          <pre
            style={{
              padding: 16,
              backgroundColor: "#fff",
              borderRadius: 8,
              overflow: "auto",
              maxWidth: "100%",
              fontSize: 12,
              color: "#dc2626",
            }}
          >
            {this.state.error.message}
          </pre>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              marginTop: 16,
              padding: "8px 16px",
              backgroundColor: "#1D4289",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Recargar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const App = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
