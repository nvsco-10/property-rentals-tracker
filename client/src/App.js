import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard, Login, Error } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="*" element={<Error/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
