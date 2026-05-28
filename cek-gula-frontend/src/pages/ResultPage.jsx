import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SATUAN_OPTIONS = [
  { label: 'Gram (g)', value: 'gram', faktor: 1 },
  { label: 'Mililiter (ml)', value: 'ml', faktor: 1 },
  { label: 'Sendok Makan (±15g)', value: 'sdm', faktor: 15 },
  { label: 'Sendok Teh (±5g)', value: 'sdt', faktor: 5 },
  { label: 'Mangkok (±250g)', value: 'mangkok', faktor: 250 },
  { label: 'Gelas (±200ml)', value: 'gelas', faktor: 200 },
  { label: 'Buah/Potong (±100g)', value: 'buah', faktor: 100 },
  { label: 'Porsi (±150g)', value: 'porsi', faktor: 150 },
]

function ResultPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const hasil = location.state

  const [jumlah, setJumlah] = useState(1)
  const [satuan, setSatuan] = useState(SATUAN_OPTIONS[0])

  if (!hasil) {
    return (
      <div className="min-h-screen bg-[#f0f7f0] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Tidak ada data hasil scan.</p>
          <button onClick={() => navigate('/scan')} className="bg-green-700 text-white px-6 py-3 rounded-xl font-semibold">
            Kembali ke Scan
          </button>
        </div>
      </div>
    )
  }

  const getStatusColor = (status) => {
    if (status === 'Rendah') return 'text-green-600 bg-green-100'
    if (status === 'Normal') return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getStatusEmoji = (status) => {
    if (status === 'Rendah') return '✅'
    if (status === 'Normal') return '⚠️'
    return '🚨'
  }

  const nutrisi = hasil.nutrisiDetail || {}

  const faktorPorsi = (jumlah * satuan.faktor) / 100

  const hitung = (nilai) => {
    if (!nilai) return null
    return (parseFloat(nilai) * faktorPorsi).toFixed(2)
  }

  const totalGram = jumlah * satuan.faktor

  return (
    <div className="min-h-screen bg-[#f0f7f0] flex flex-col">
      <nav className="bg-white shadow-sm px-10 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-green-700 text-white w-10 h-10 rounded-lg flex items-center justify-center text-xl">🍃</div>
          <span className="font-bold text-xl text-gray-800">Cek-Gula</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/diary')} className="text-green-700 font-medium hover:underline text-sm">📔 Food Diary</button>
          <a href="https://dashboard-cek-gula.streamlit.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline text-sm">📊 Dashboard</a>
          <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/login'); }} className="text-red-600 font-medium hover:underline text-sm">Logout</button>
        </div>
      </nav>

      <div className="flex flex-col items-center px-4 py-12 max-w-md mx-auto w-full">

        <div className="text-center mb-6">
          <div className="text-6xl mb-4">{getStatusEmoji(hasil.status)}</div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">{hasil.nama}</h2>
          <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(hasil.status)}`}>
            {hasil.status}
          </span>
        </div>

        {/* Input Porsi */}
        <div className="w-full bg-white rounded-2xl shadow-sm p-5 mb-4">
          <h3 className="font-bold text-gray-800 mb-3">🍽️ Input Porsi Makan</h3>
          <p className="text-xs text-gray-400 mb-3">Data nutrisi per 100g — masukkan porsi untuk menghitung otomatis</p>

          <div className="flex gap-3 mb-3">
            <div className="flex-1">
              <label className="text-xs text-gray-500 font-semibold mb-1 block">Jumlah</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={jumlah}
                onChange={(e) => setJumlah(parseFloat(e.target.value) || 1)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 font-semibold mb-1 block">Satuan</label>
              <select
                value={satuan.value}
                onChange={(e) => setSatuan(SATUAN_OPTIONS.find(s => s.value === e.target.value))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                {SATUAN_OPTIONS.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl px-4 py-2 text-center">
            <p className="text-green-700 text-sm font-semibold">
              Total porsi: <span className="font-black">{totalGram}g</span>
              <span className="text-green-500 text-xs ml-2">({jumlah} {satuan.label.split(' ')[0]})</span>
            </p>
          </div>
        </div>

        {/* Data Nutrisi */}
        <div className="w-full bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h3 className="font-bold text-gray-800 mb-1">📊 Data Nutrisi</h3>
          <p className="text-xs text-gray-400 mb-4">Dihitung untuk {totalGram}g porsi</p>
          <div className="grid grid-cols-2 gap-3">

            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500">Kadar Gula</p>
              <p className="font-bold text-green-700 text-lg">{hasil.kadarGula}</p>
              <p className="text-xs text-gray-400">mg/dL</p>
            </div>

            {nutrisi.kalori_kkal && (
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">Kalori</p>
                <p className="font-bold text-orange-600 text-lg">{hitung(nutrisi.kalori_kkal)}</p>
                <p className="text-xs text-gray-400">kkal</p>
              </div>
            )}

            {nutrisi.gula_g && (
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">Gula</p>
                <p className="font-bold text-red-600 text-lg">{hitung(nutrisi.gula_g)}</p>
                <p className="text-xs text-gray-400">gram</p>
              </div>
            )}

            {nutrisi.protein_g && (
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">Protein</p>
                <p className="font-bold text-blue-600 text-lg">{hitung(nutrisi.protein_g)}</p>
                <p className="text-xs text-gray-400">gram</p>
              </div>
            )}

            {nutrisi.karbohidrat_g && (
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">Karbohidrat</p>
                <p className="font-bold text-yellow-600 text-lg">{hitung(nutrisi.karbohidrat_g)}</p>
                <p className="text-xs text-gray-400">gram</p>
              </div>
            )}

            {nutrisi.lemak_g && (
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">Lemak</p>
                <p className="font-bold text-purple-600 text-lg">{hitung(nutrisi.lemak_g)}</p>
                <p className="text-xs text-gray-400">gram</p>
              </div>
            )}

            {nutrisi.estimasi_glycemic_load && (
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">Glycemic Load</p>
                <p className="font-bold text-pink-600 text-lg">{hitung(nutrisi.estimasi_glycemic_load)}</p>
                <p className="text-xs text-gray-400">GL</p>
              </div>
            )}

            {nutrisi.estimasi_indeks_glikemik && (
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">Indeks Glikemik</p>
                <p className="font-bold text-indigo-600 text-lg">{nutrisi.estimasi_indeks_glikemik}</p>
                <p className="text-xs text-gray-400">GI</p>
              </div>
            )}

          </div>
        </div>

        {nutrisi.rekomendasi && (
          <div className="w-full bg-green-50 border border-green-200 rounded-2xl p-5 mb-6">
            <h3 className="font-bold text-green-800 mb-2">💡 Rekomendasi AI</h3>
            <p className="text-green-700 text-sm">{nutrisi.rekomendasi}</p>
          </div>
        )}

        <div className="w-full flex gap-3">
          <button onClick={() => navigate('/scan')} className="flex-1 border-2 border-green-700 text-green-700 py-3 rounded-xl font-semibold hover:bg-green-50 transition">
            ← Scan Lagi
          </button>
          <button onClick={() => navigate('/diary')} className="flex-1 bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition flex items-center justify-center gap-2">
            📔 Lihat Diary
          </button>
        </div>

      </div>
    </div>
  )
}

export default ResultPage