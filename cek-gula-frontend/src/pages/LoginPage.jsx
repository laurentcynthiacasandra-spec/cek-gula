import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    console.log('Login:', form)
    // nanti disambungkan ke backend
    navigate('/scan')
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-green-600 font-bold text-2xl">🍃 Cek-Gula</h1>
          <p className="text-gray-500 text-sm mt-1">Masuk ke akunmu</p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Masukkan email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Masukkan password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 mt-2">
            Masuk
          </button>
        </div>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Belum punya akun?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-green-600 font-medium cursor-pointer hover:underline">
            Daftar di sini
          </span>
        </p>

      </div>
    </div>
  )
}

export default LoginPage