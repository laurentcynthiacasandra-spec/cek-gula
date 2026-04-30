import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function DiaryPage() {
  const navigate = useNavigate()

  // dummy data dulu, nanti diganti data asli dari backend
  const [entries] = useState([
    { id: 1, food_name: 'Klepon', calories: 180, sugar: 8.5, glycemic_load: 12.3, category: 'Sedang', time: '08:30' },
    { id: 2, food_name: 'Lupis', calories: 150, sugar: 6.2, glycemic_load: 10.1, category: 'Rendah', time: '10:15' },
    { id: 3, food_name: 'Bakwan', calories: 220, sugar: 2.1, glycemic_load: 8.5, category: 'Rendah', time: '13:00' },
  ])

  const getCategoryColor = (category) => {
    if (category === 'Rendah') return 'text-green-600 bg-green-100'
    if (category === 'Sedang') return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const totalCalories = entries.reduce((sum, e) => sum + e.calories, 0)
  const totalSugar = entries.reduce((sum, e) => sum + e.sugar, 0)

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-green-600 font-bold text-2xl">🍃 Cek-Gula</h1>
        <button
          onClick={() => navigate('/scan')}
          className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700">
          + Scan Jajanan
        </button>
      </nav>

      {/* Content */}
      <div className="px-4 py-8 max-w-2xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Food Diary</h2>
        <p className="text-gray-500 mb-6">Riwayat konsumsi harianmu</p>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-gray-500 text-xs mb-1">Total Kalori Hari Ini</p>
            <p className="text-green-600 font-bold text-2xl">{totalCalories}</p>
            <p className="text-gray-400 text-xs">kkal</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-gray-500 text-xs mb-1">Total Gula Hari Ini</p>
            <p className="text-green-600 font-bold text-2xl">{totalSugar.toFixed(1)}</p>
            <p className="text-gray-400 text-xs">gram</p>
          </div>
        </div>

        {/* Entry List */}
        <div className="flex flex-col gap-4">
          {entries.map((entry) => (
            <div key={entry.id} className="bg-white rounded-xl p-4 shadow-sm flex justify-between items-center">
              <div>
                <h4 className="font-bold text-gray-800">{entry.food_name}</h4>
                <p className="text-gray-400 text-xs mt-1">{entry.time} • {entry.calories} kkal • Gula: {entry.sugar}g</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(entry.category)}`}>
                {entry.category}
              </span>
            </div>
          ))}
        </div>

        {entries.length === 0 && (
          <div className="text-center text-gray-400 mt-12">
            <div className="text-4xl mb-3">📔</div>
            <p>Belum ada data konsumsi hari ini</p>
          </div>
        )}

      </div>

    </div>
  )
}

export default DiaryPage