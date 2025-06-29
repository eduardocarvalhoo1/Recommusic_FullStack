import { useState } from 'react'
import Login from './Pages/Login'
import Principal from './Pages/Principal';

function App() {
  const [logado, setLogado] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => setLogado(true);
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLogado(false);
  }

  return logado ?(
    <Principal onLogout = {handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  )
   
}

export default App
