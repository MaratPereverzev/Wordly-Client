import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { Dashboard } from"@/app/dashboard";
import ThemeProvider from"@/app/theme/ThemeProvider";

const root = ReactDOM.createRoot(document.getElementById("root")!);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

root.render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
