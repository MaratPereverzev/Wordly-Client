import {StrictMode} from "react";
import { ReactDOM } from "react";
import { Dashboard } from "dashboard";
import { store } from "store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./app/theme/ThemeProvider";

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
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Dashboard />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
