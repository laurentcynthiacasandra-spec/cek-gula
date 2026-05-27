import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDiary } from '../services/api'

function DiaryPage() {
  const navigate = useNavigate()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDiary()
      .then(result => {
        setEntries(result.data.map(item => ({
          id:        item.id,
          food_name: item.food_name,
          calories:  item.calories,
          sugar:     item.sugar,
          category:  item.category,
          time:      item.time,
        })))
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const getCategoryColor = (category) => {
    if (category === 'Rendah') return 'text-green-600 bg-green-100'
    if (category === 'Normal') return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const totalCalories = entries.reduce((sum, e) => sum + (parseFloat(e.calories) || 0), 0)
  const totalSugar    = entries.reduce((sum, e) => sum + (parseFloat(e.sugar)    || 0), 0)

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-green-600 font-bold text-2xl">🍃 Cek-Gula</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/scan')}
            className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700">
            + Scan Jajanan
          </button>
          <button
            onClick={handleLogout}
            className="text-red-600 font-medium hover:underline text-sm">
            Logout
          </button>
        </div>
      </nav>

      <div className="px-4 py-8 max-w-2xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Food Diary</h2>
        <p className="text-gray-500 mb-6">Riwayat konsumsi harianmu</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-gray-500 text-xs mb-1">Total Kalori Hari Ini</p>
            <p className="text-green-600 font-bold text-2xl">{totalCalories.toFixed(0)}</p>
            <p className="text-gray-400 text-xs">kkal</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-gray-500 text-xs mb-1">Total Gula Hari Ini</p>
            <p className="text-green-600 font-bold text-2xl">{totalSugar.toFixed(1)}</p>
            <p className="text-gray-400 text-xs">gram</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 mt-12">
            <p>Memuat data...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {entries.map(entry => (
              <div key={entry.id} className="bg-white rounded-xl p-4 shadow-sm flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-gray-800">{entry.food_name}</h4>
                  <p className="text-gray-400 text-xs mt-1">
                    {entry.time} • {entry.calories} kkal • Gula: {entry.sugar}g
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(entry.category)}`}>
                  {entry.category}
                </span>
              </div>
            ))}
            {entries.length === 0 && (
              <div className="text-center text-gray-400 mt-12">
                <div className="text-4xl mb-3">📔</div>
                <p>Belum ada data konsumsi hari ini</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default DiaryPage