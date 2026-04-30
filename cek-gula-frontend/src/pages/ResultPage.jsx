import { useNavigate } from 'react-router-dom'

function ResultPage() {
  const navigate = useNavigate()

  // dummy data dulu, nanti diganti data asli dari backend
  const result = {
    food_name: 'Klepon',
    confidence: 92,
    calories: 180,
    carbs: 35,
    sugar: 8.5,
    glycemic_index: 65,
    glycemic_load: 12.3,
    category: 'Sedang'
  }

  const getCategoryColor = (category) => {
    if (category === 'Rendah') return 'text-green-600 bg-green-100'
    if (category === 'Sedang') return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-green-600 font-bold text-2xl">🍃 Cek-Gula</h1>
        <button
          onClick={() => navigate('/scan')}
          className="text-green-600 font-medium hover:underline">
          ← Scan Lagi
        </button>
      </nav>

      {/* Content */}
      <div className="flex flex-col items-center px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Hasil Analisis</h2>
        <p className="text-gray-500 mb-8">Berikut informasi nutrisi jajanan kamu</p>

        <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">

          {/* Food Name */}
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🍡</div>
            <h3 className="text-2xl font-bold text-gray-800">{result.food_name}</h3>
            <p className="text-gray-400 text-sm mt-1">Akurasi deteksi: {result.confidence}%</p>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(result.category)}`}>
              Indeks Glikemik: {result.category}
            </span>
          </div>

          {/* Nutrition Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-gray-500 text-xs mb-1">Kalori</p>
              <p className="text-green-600 font-bold text-xl">{result.calories}</p>
              <p className="text-gray-400 text-xs">kkal</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-gray-500 text-xs mb-1">Karbohidrat</p>
              <p className="text-green-600 font-bold text-xl">{result.carbs}</p>
              <p className="text-gray-400 text-xs">gram</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-gray-500 text-xs mb-1">Gula</p>
              <p className="text-green-600 font-bold text-xl">{result.sugar}</p>
              <p className="text-gray-400 text-xs">gram</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-gray-500 text-xs mb-1">Glycemic Load</p>
              <p className="text-green-600 font-bold text-xl">{result.glycemic_load}</p>
              <p className="text-gray-400 text-xs">GL</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/diary')}
              className="bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700">
              Simpan ke Food Diary
            </button>
            <button
              onClick={() => navigate('/scan')}
              className="border border-green-600 text-green-600 py-2 rounded-lg font-semibold hover:bg-green-50">
              Scan Jajanan Lain
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default ResultPage