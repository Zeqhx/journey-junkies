import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ClerkProvider publishableKey="pk_test_Y2F1c2FsLWVsay0zNS5jbGVyay5hY2NvdW50cy5kZXYk">
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
