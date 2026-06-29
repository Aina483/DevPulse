import { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './lib/apollo';
import { Navbar } from './components/layout/Navbar';
import { Dashboard } from './pages/Dashboard';
import { TokenSetup } from './pages/TokenSetup';

function AppContent() {
  const [token, setToken] = useState<string>(
    () => localStorage.getItem('github_token') ?? ''
  );
  const [username, setUsername] = useState<string>('Aina483');

  const handleTokenSave = (newToken: string) => {
    setToken(newToken);
    // Reset Apollo cache on new token
    apolloClient.clearStore();
  };

  const handleSearch = (newUsername: string) => {
    setUsername(newUsername);
  };

  if (!token) {
    return <TokenSetup onTokenSave={handleTokenSave} />;
  }

  return (
    <div className="min-h-screen bg-surface-DEFAULT">
      <Navbar username={username} onSearch={handleSearch} />
      <main className="animate-fade-in">
        <Dashboard username={username} />
      </main>
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AppContent />
    </ApolloProvider>
  );
}

export default App;
