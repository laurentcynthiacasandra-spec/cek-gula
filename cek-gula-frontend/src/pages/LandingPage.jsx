import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-green-600 font-bold text-2xl">🍃 Cek-Gula</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="text-green-600 font-medium hover:underline">
            Masuk
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-green-600 text-white px-4 py-2 rounded-full font-medium hover:bg-green-700">
            Daftar
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-1 text-center px-4 py-20">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Kenali Kandungan Gula <br /> Jajanan Pasar Favoritmu
        </h2>
        <p className="text-gray-500 text-lg max-w-xl mb-8">
          Cek-Gula membantu kamu mendeteksi kandungan gizi dan indeks glikemik 
          jajanan pasar Indonesia hanya dengan foto.
        </p>
        <button
          onClick={() => navigate('/register')}
          className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 shadow-md">
          Mulai Sekarang
        </button>
      </div>

      {/* Feature Section */}
      <div className="bg-white py-16 px-8">
        <h3 className="text-center text-2xl font-bold text-gray-800 mb-10">Fitur Unggulan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 rounded-2xl bg-green-50">
            <div className="text-4xl mb-4">📷</div>
            <h4 className="font-bold text-gray-800 mb-2">Deteksi Jajanan</h4>
            <p className="text-gray-500 text-sm">Foto jajanan pasar kamu dan AI kami akan mengenalinya secara otomatis</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-green-50">
            <div className="text-4xl mb-4">📊</div>
            <h4 className="font-bold text-gray-800 mb-2">Info Nutrisi Lengkap</h4>
            <p className="text-gray-500 text-sm">Dapatkan informasi kalori, karbohidrat, gula, dan indeks glikemik</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-green-50">
            <div className="text-4xl mb-4">📔</div>
            <h4 className="font-bold text-gray-800 mb-2">Food Diary</h4>
            <p className="text-gray-500 text-sm">Pantau riwayat konsumsi harianmu dan jaga asupan gula tetap sehat</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-600 text-white text-center py-4 text-sm">
        © 2026 Cek-Gula — Coding Camp powered by DBS Foundation
      </footer>

    </div>
  )
}

export default LandingPage