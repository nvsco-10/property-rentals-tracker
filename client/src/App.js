import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login, Error, ProtectedRoute } from './pages'
import { AddRental, AllRentals, Profile, Stats, SingleRental, SharedLayout } from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <SharedLayout/>
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats/>} />
          <Route path="all-rentals" element={<AllRentals/>} />
          <Route path="rentals/:id" element={<SingleRental/>} />
          <Route path="add-rental" element={<AddRental/>} />
          <Route path="profile" element={<Profile/>} />
        </Route>
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
