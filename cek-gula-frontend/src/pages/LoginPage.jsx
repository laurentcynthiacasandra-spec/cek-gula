import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { loginUser } from '../services/api'

function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()

    if (!form.email || !form.password) {
      setError('Email dan password tidak boleh kosong.')
      return
    }

    setLoading(true)
    setError('')

    try {
      await loginUser({ email: form.email, password: form.password })
      navigate('/scan')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f7f0] flex items-center justify-center px-4 font-sans">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md border border-green-50">

        <div className="text-center mb-8">
          <div className="bg-green-700 text-white w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-green-200">
            🍃
          </div>
          <h1 className="text-green-800 font-black text-2xl tracking-tight">Cek-Gula</h1>
          <p className="text-gray-400 text-sm mt-1">Masuk ke akunmu</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 text-xs px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider ml-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Masukkan email kamu"
              className="w-full mt-1 px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition-all text-sm"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider ml-1">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition-all text-sm pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600">
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white py-3.5 rounded-2xl font-bold text-base hover:bg-green-800 active:scale-[0.97] transition-all mt-4 disabled:opacity-60 shadow-lg shadow-green-100">
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-8 font-medium">
          Belum punya akun?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-green-600 font-bold hover:underline transition">
            Daftar di sini
          </button>
        </p>
      </div>
    </div>
  )
}

export default LoginPage