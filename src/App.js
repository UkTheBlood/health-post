import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './Router';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
      }
    }
  }
  );

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
