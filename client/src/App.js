import {Route, Routes, Navigate} from 'react-router-dom'
import Main from './components/Main'
import Login from './components/Login'
import SignUp from './components/Sign Up'

function App() {
  const user = localStorage.getItem('token')
  return (
    <Routes>
      {user && <Route path="/" element={<Main />} />}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
