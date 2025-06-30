import { useState } from 'react'
import Login from './Pages/Login'
import Principal from './Pages/Principal';
import CadastroArtista from './Pages/CadastroArtista';

function App() {
  const [logado, setLogado] = useState(!!localStorage.getItem('token'));
  const [paginaAtual, setPaginaAtual] = useState('principal');

  const handleLogin = () => setLogado(true);
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLogado(false);
    setPaginaAtual('principal');
  }
  if (!logado) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      {paginaAtual === 'principal' && (
        <Principal onLogout={handleLogout} onNavigate={setPaginaAtual} />
      )}
      {paginaAtual === 'cadastro' && (
        <CadastroArtista onLogout={handleLogout} onNavigate={setPaginaAtual} />
      )}
    </>
  );
}

export default App
