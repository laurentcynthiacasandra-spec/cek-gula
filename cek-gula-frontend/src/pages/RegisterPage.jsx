import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { registerUser } from '../services/api'

function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('Semua data wajib diisi ya.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setError('Format email kamu sepertinya salah.')
      return
    }

    if (form.password.length < 8) {
      setError('Password harus minimal 8 karakter.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Password dan konfirmasi tidak cocok.')
      return
    }

    setLoading(true)
    setError('')

    try {
      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password
      })
      navigate('/login')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f7f0] flex items-center justify-center px-4 py-12 font-sans">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md border border-green-50">

        <div className="text-center mb-8">
          <div className="bg-green-700 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-green-100">
            🍃
          </div>
          <h1 className="text-green-800 font-black text-3xl tracking-tight">Cek-Gula</h1>
          <p className="text-gray-500 text-sm mt-2">Daftar sekarang untuk mulai memantau gulamu</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 text-sm px-4 py-3 rounded-lg mb-6">
            <span className="font-bold">Perhatian:</span> {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider ml-1">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Contoh: Budi Santoso"
              className="w-full mt-1.5 px-5 py-3 border border-gray-100 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition-all text-sm"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider ml-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="nama@email.com"
              className="w-full mt-1.5 px-5 py-3 border border-gray-100 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition-all text-sm"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider ml-1">Password</label>
            <div className="relative mt-1.5">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimal 8 karakter"
                className="w-full px-5 py-3 border border-gray-100 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition-all text-sm pr-14"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition p-1">
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider ml-1">Konfirmasi Password</label>
            <div className="relative mt-1.5">
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Ketik ulang password"
                className="w-full px-5 py-3 border border-gray-100 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition-all text-sm pr-14"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition p-1">
                {showConfirm ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-green-700 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-800 active:scale-[0.98] transition-all mt-6 disabled:opacity-70 shadow-lg shadow-green-100 flex items-center justify-center">
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mendaftarkan...
              </span>
            ) : 'Buat Akun'}
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-8 font-medium">
          Sudah punya akun?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-green-600 font-bold hover:text-green-800 hover:underline transition">
            Masuk di sini
          </button>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage