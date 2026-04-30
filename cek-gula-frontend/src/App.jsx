import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ScanPage from './pages/ScanPage'
import ResultPage from './pages/ResultPage'
import DiaryPage from './pages/DiaryPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/diary" element={<DiaryPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App