import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './Router';

function App() {
  const queryClient = new QueryClient();

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
