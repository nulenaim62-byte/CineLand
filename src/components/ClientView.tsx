import { useState } from 'react';
import { ClientLogin } from './client/ClientLogin';
import { ClientHome } from './client/ClientHome';
import { MovieDetail } from './client/MovieDetail';
import { TicketPurchase } from './client/TicketPurchase';
import { ClientChatbot } from './client/ClientChatbot';

interface ClientViewProps {
  onLogout: () => void;
}

export function ClientView({ onLogout }: ClientViewProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'movie' | 'tickets'>('home');
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [showChatbot, setShowChatbot] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleMovieSelect = (movie: any) => {
    setSelectedMovie(movie);
    setCurrentView('movie');
  };

  const handleBuyTickets = () => {
    setCurrentView('tickets');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    onLogout();
  };

  if (!isLoggedIn) {
    return <ClientLogin onLogin={handleLogin} onBack={onLogout} />;
  }

  return (
    <>
      {currentView === 'home' && (
        <ClientHome 
          onMovieSelect={handleMovieSelect}
          onLogout={handleLogout}
          onOpenChat={() => setShowChatbot(true)}
        />
      )}
      {currentView === 'movie' && selectedMovie && (
        <MovieDetail 
          movie={selectedMovie}
          onBack={() => setCurrentView('home')}
          onBuyTickets={handleBuyTickets}
        />
      )}
      {currentView === 'tickets' && (
        <TicketPurchase 
          movie={selectedMovie}
          onBack={() => setCurrentView('movie')}
        />
      )}
      {showChatbot && (
        <ClientChatbot onClose={() => setShowChatbot(false)} />
      )}
    </>
  );
}
