import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCamera, FaUpload, FaSpinner } from 'react-icons/fa'
import { createGula, searchNutrisi, addDiary } from '../services/api'

const AI_API_URL = 'https://aulian12-model-cek-gula.hf.space/predict'

function ScanPage() {
  const navigate = useNavigate()
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [scanning, setScanning] = useState(false)
  const [hasil, setHasil] = useState(null)
  const [error, setError] = useState('')
  const [aiResult, setAiResult] = useState(null)
  const [predicting, setPredicting] = useState(false)
  const fileInputRef = useRef(null)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
    setHasil(null)
    setError('')
    setAiResult(null)
    setPredicting(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch(AI_API_URL, { method: 'POST', body: formData })
      const data = await response.json()
      setAiResult({ prediction: data.prediction, confidence: data.confidence, rekomendasi: data.rekomendasi_ai })
    } catch (err) {
      setError('Gagal menghubungi AI. Silakan ketik nama makanan manual.')
    } finally {
      setPredicting(false)
    }
  }

  const handleAnalyze = async () => {
    const namaFinal = aiResult?.prediction || ''
    if (!namaFinal) { setError('AI belum mendeteksi makanan. Upload foto terlebih dahulu.'); return }
    setScanning(true)
    setError('')
    try {
      const nutrisiResult = await searchNutrisi(namaFinal.trim())
      let kadarGula = 100
      if (nutrisiResult.data.length > 0) kadarGula = nutrisiResult.data[0].kadar_gula_estimasi
      const result = await createGula({ nama: namaFinal, kadarGula, imageFile: image })
      await addDiary({
        scan_id: result.result.id,
        nama_makanan: result.result.nama,
        kadar_gula: result.result.kadarGula,
        kalori: result.result.kalori,
        status: result.result.status,
        time_eaten: new Date().toTimeString().slice(0, 5),
      })
      const hasilFinal = {
        ...result.result,
        nutrisiDetail: { ...result.result.nutrisiDetail, rekomendasi: aiResult?.rekomendasi || result.result.nutrisiDetail?.rekomendasi },
        confidence: aiResult?.confidence,
      }
      setHasil(hasilFinal)
      setTimeout(() => navigate('/result', { state: hasilFinal }), 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setScanning(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f7f0] flex flex-col">
      <nav className="bg-white shadow-sm px-10 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-green-700 text-white w-10 h-10 rounded-lg flex items-center justify-center text-xl">🍃</div>
          <span className="font-bold text-xl text-gray-800">Cek-Gula</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/diary')} className="text-green-700 font-medium hover:underline text-sm">
            📔 Food Diary
          </button>
          <a href="https://dashboard-cek-gula.streamlit.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline text-sm">
            📊 Dashboard
          </a>
          <button onClick={handleLogout} className="text-red-600 font-medium hover:underline text-sm">
            Logout
          </button>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center flex-1 px-4 py-12">
        <div className="text-center mb-8">
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-4 py-1 rounded-full inline-block mb-4">AI Scanner</span>
          <h2 className="text-3xl font-black text-gray-900 mb-3">Scan Jajananmu</h2>
          <p className="text-gray-500 max-w-md">Upload foto jajananmu, biar <span className="text-green-700 font-semibold">AI kami</span> yang deteksi dan hitung nutrisinya otomatis!</p>
        </div>

        {error && <div className="w-full max-w-md mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm px-4 py-3 rounded-lg">{error}</div>}

        {predicting && (
          <div className="w-full max-w-md mb-4 bg-blue-50 border border-blue-200 rounded-xl px-5 py-3 flex items-center gap-3">
            <FaSpinner className="animate-spin text-blue-500" size={16} />
            <p className="text-blue-700 text-sm font-medium">AI sedang menganalisis foto...</p>
          </div>
        )}

        {aiResult && !predicting && (
          <div className="w-full max-w-md mb-4 bg-green-50 border border-green-200 rounded-xl px-5 py-4">
            <p className="text-green-800 font-bold text-sm mb-1">🤖 AI Mendeteksi: <span className="capitalize">{aiResult.prediction}</span></p>
            <p className="text-green-600 text-xs">Tingkat keyakinan: <span className="font-bold">{aiResult.confidence?.toFixed(1)}%</span></p>
            {aiResult.rekomendasi && <p className="text-green-700 text-xs mt-2 italic">{aiResult.rekomendasi}</p>}
          </div>
        )}

        {hasil && (
          <div className="w-full max-w-md mb-4 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm px-4 py-3 rounded-lg">
            ✅ {hasil.nama} — Status: {hasil.status} — Menuju hasil...
          </div>
        )}

        <div onClick={() => !scanning && !predicting && fileInputRef.current.click()}
          className="w-full max-w-md rounded-2xl overflow-hidden shadow-md cursor-pointer relative" style={{ height: '320px' }}>
          {preview ? (
            <img src={preview} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-white flex flex-col items-center justify-center border-2 border-dashed border-green-300 rounded-2xl hover:bg-green-50 transition">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <FaCamera size={28} className="text-green-700" />
              </div>
              <p className="text-gray-700 font-semibold mb-1">Klik untuk upload foto</p>
              <p className="text-gray-400 text-sm">JPG, PNG • Maks 10MB</p>
            </div>
          )}
          {(scanning || predicting) && (
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center rounded-2xl">
              <div className="w-full absolute animate-scan">
                <div className="h-1 bg-green-400 shadow-lg shadow-green-400 mx-4 rounded-full"></div>
              </div>
              <div className="mt-24 text-center">
                <p className="text-white font-bold text-lg">{predicting ? 'Mendeteksi makanan...' : 'Menyimpan data...'}</p>
                <p className="text-green-300 text-sm mt-1">AI sedang bekerja</p>
              </div>
            </div>
          )}
        </div>

        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

        <div className="mt-4 bg-green-50 border border-green-200 rounded-xl px-5 py-3 max-w-md w-full">
          <p className="text-green-700 text-sm">💡 <span className="font-semibold">Tips:</span> Pastikan foto jajanan terlihat jelas agar AI bisa mendeteksi dengan akurat.</p>
        </div>

        {aiResult && !scanning && !predicting && (
          <button onClick={handleAnalyze} className="mt-6 bg-green-700 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-green-800 active:scale-95 transition shadow-lg flex items-center gap-3">
            <FaUpload size={18} /> Simpan & Lihat Hasil
          </button>
        )}

        {!image && !predicting && (
          <button onClick={() => fileInputRef.current.click()} className="mt-6 border-2 border-green-700 text-green-700 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-green-50 transition flex items-center gap-3">
            <FaCamera size={18} /> Buka Kamera / Galeri
          </button>
        )}
      </div>

      <style>{`
        @keyframes scan { 0% { top: 10%; } 50% { top: 85%; } 100% { top: 10%; } }
        .animate-scan { position: absolute; animation: scan 1.5s ease-in-out infinite; }
      `}</style>
    </div>
  )
}

export default ScanPage