import { useState } from 'react'
import Login from './Pages/Login'

function App() {
  const [logado, setLogado] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setLogado(true);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLogado(false);
  }

  return (
   <>
      {logado ? (
        <div style={{textAlign: 'center', padding: '2rem'}}>
          <h2>Deu bom</h2>
          <button onClick={handleLogout}>Sair</button>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
   </>
  )
}

export default App
