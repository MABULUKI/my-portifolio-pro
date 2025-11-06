import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ConvexReactClient, ConvexProvider } from "convex/react";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  </StrictMode>
);
