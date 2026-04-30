import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function ScanPage() {
  const navigate = useNavigate()
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleAnalyze = () => {
    // nanti disambungkan ke backend
    navigate('/result')
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-green-600 font-bold text-2xl">🍃 Cek-Gula</h1>
        <button
          onClick={() => navigate('/diary')}
          className="text-green-600 font-medium hover:underline">
          Food Diary
        </button>
      </nav>

      {/* Content */}
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Scan Jajanan</h2>
        <p className="text-gray-500 mb-8">Upload foto jajanan pasar untuk dianalisis</p>

        {/* Upload Box */}
        <div
          onClick={() => fileInputRef.current.click()}
          className="w-full max-w-md h-64 border-2 border-dashed border-green-400 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-white hover:bg-green-50 transition">
          {preview ? (
            <img src={preview} alt="preview" className="h-full w-full object-cover rounded-2xl" />
          ) : (
            <>
              <div className="text-5xl mb-3">📷</div>
              <p className="text-gray-400 text-sm">Klik untuk upload foto</p>
            </>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Analyze Button */}
        {image && (
          <button
            onClick={handleAnalyze}
            className="mt-6 bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 shadow-md">
            Analisis Sekarang
          </button>
        )}

        {!image && (
          <p className="mt-4 text-gray-400 text-sm">atau gunakan kamera perangkat kamu</p>
        )}
      </div>

    </div>
  )
}

export default ScanPage