import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import MainLayout from './layouts/MainLayout'
import Clients from './pages/Clients'
import Tickets from './pages/Tickets'

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Navigate to="/clients" replace />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/tickets" element={<Tickets />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
