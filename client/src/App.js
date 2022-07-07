import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login, Error, ProtectedRoute, Unauthorized } from './pages'
import { AddRental, AllRentals, AllOwners, Home, SingleRental, ManageUsers, SharedLayout } from './pages/Dashboard'

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
          <Route index element={<Home/>} />
          <Route path="all-rentals" element={<AllRentals/>} />
          <Route path="rentals/:id" element={<SingleRental/>} />
          <Route path="add-rental" element={<AddRental/>} />
          <Route path="all-owners" element={<AllOwners/>} />
          <Route path="manage-users" element={<ManageUsers/>} />
        </Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/unauthorized" element={<Unauthorized/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
