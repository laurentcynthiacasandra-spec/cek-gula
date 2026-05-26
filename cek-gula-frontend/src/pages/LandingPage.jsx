import { useNavigate } from 'react-router-dom'
import heroImg from '../assets/hero.png'
import artikel1 from '../assets/artikel1.png'
import artikel2 from '../assets/artikel2.png'
import artikel3 from '../assets/artikel3.png'
import { FaRobot, FaChartLine, FaLeaf, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa'
import { FaMagnifyingGlassChart } from 'react-icons/fa6'
import { MdArrowForward } from 'react-icons/md'

function LandingPage() {
  const navigate = useNavigate()

  const scrollTo = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#f0f7f0] font-sans">

      {/* Navbar */}
      <nav className="bg-white px-10 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-green-700 text-white w-10 h-10 rounded-lg flex items-center justify-center text-xl">🍃</div>
          <span className="font-bold text-xl text-gray-800">Cek-Gula</span>
        </div>
        <div className="flex items-center gap-8">
          <span onClick={() => scrollTo('hero')} className="text-green-600 font-semibold cursor-pointer hover:text-green-800">Beranda</span>
          <span onClick={() => scrollTo('fitur')} className="text-gray-600 cursor-pointer hover:text-green-600">Fitur</span>
          <span onClick={() => scrollTo('tentang')} className="text-gray-600 cursor-pointer hover:text-green-600">Tentang</span>
          <span onClick={() => scrollTo('artikel')} className="text-gray-600 cursor-pointer hover:text-green-600">Artikel</span>
          <button
            onClick={() => navigate('/login')}
            className="bg-green-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition">
            Masuk
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div id="hero" className="flex items-center justify-between px-16 py-20 max-w-6xl mx-auto">
        <div className="flex-1 pr-8">
          <span className="bg-green-100 text-green-700 text-sm font-semibold px-4 py-1 rounded-full mb-6 inline-block">
            🌿 Powered by AI
          </span>
          <h1 className="text-5xl font-black text-gray-900 leading-tight mb-6">
            <span className="underline decoration-green-500">Cek Gula</span><br />
            <span className="underline decoration-green-500">Makananmu</span><br />
            <span className="underline decoration-green-500">Sekarang</span>
          </h1>
          <p className="text-gray-600 text-lg italic mb-8 leading-relaxed">
            Scan jajanan pasar Indonesia dan dapatkan<br />
            informasi kandungan gizi serta estimasi<br />
            beban glikemiknya secara instan.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/register')}
              className="bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-800 flex items-center gap-3 transition shadow-lg">
              Mulai Gratis <MdArrowForward size={22} />
            </button>
            <button
              onClick={() => scrollTo('fitur')}
              className="border-2 border-green-700 text-green-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-50 transition">
              Pelajari Fitur
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative">
            <div className="w-80 h-80 bg-green-200 rounded-full absolute top-4 left-4"></div>
            <img
              src={heroImg}
              alt="Hero"
              className="relative z-10 w-80 h-80 object-cover rounded-full shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-green-700 py-12 px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8 text-center text-white">
          <div>
            <p className="text-4xl font-black mb-2">50+</p>
            <p className="text-green-200 text-sm">Jenis Jajanan Pasar</p>
          </div>
          <div>
            <p className="text-4xl font-black mb-2">85%+</p>
            <p className="text-green-200 text-sm">Akurasi Deteksi AI</p>
          </div>
          <div>
            <p className="text-4xl font-black mb-2">100%</p>
            <p className="text-green-200 text-sm">Gratis Digunakan</p>
          </div>
        </div>
      </div>

      {/* Fitur Section */}
      <div id="fitur" className="py-20 px-16 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="bg-green-100 text-green-700 text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">Fitur Unggulan</span>
          <h2 className="text-4xl font-black text-gray-900 mb-4">Semua yang Kamu Butuhkan</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Teknologi AI canggih untuk membantu kamu hidup lebih sehat setiap hari</p>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <div className="bg-green-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <FaRobot size={28} className="text-green-700" />
            </div>
            <h3 className="font-bold text-gray-800 text-xl mb-3">AI Scan</h3>
            <p className="text-gray-500 leading-relaxed">Deteksi jajanan pasar secara otomatis hanya dengan foto menggunakan teknologi CNN terbaru</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <div className="bg-green-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <FaMagnifyingGlassChart size={28} className="text-green-700" />
            </div>
            <h3 className="font-bold text-gray-800 text-xl mb-3">Cek Gula & Gizi</h3>
            <p className="text-gray-500 leading-relaxed">Dapatkan informasi kalori, karbohidrat, gula, dan estimasi indeks glikemik secara lengkap</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <div className="bg-green-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <FaChartLine size={28} className="text-green-700" />
            </div>
            <h3 className="font-bold text-gray-800 text-xl mb-3">Tracking Harian</h3>
            <p className="text-gray-500 leading-relaxed">Pantau riwayat konsumsi harian dan jaga asupan gula tetap dalam batas sehat</p>
          </div>
        </div>
      </div>

      {/* Tentang Section */}
      <div id="tentang" className="bg-white py-20 px-16">
        <div className="max-w-6xl mx-auto flex items-center gap-16">
          <div className="flex-1">
            <div className="bg-green-50 rounded-3xl p-10 relative">
              <div className="bg-green-700 rounded-2xl p-8 text-white mb-6">
                <FaLeaf size={40} className="mb-4" />
                <h3 className="text-2xl font-black mb-2">Cek-Gula</h3>
                <p className="text-green-200 text-sm">Solusi Cerdas untuk Hidup Sehat</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <p className="text-green-700 font-black text-2xl">Indonesia</p>
                  <p className="text-gray-400 text-xs mt-1">Peringkat 5 Dunia Diabetes</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <p className="text-green-700 font-black text-2xl">AI</p>
                  <p className="text-gray-400 text-xs mt-1">Teknologi Terdepan</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <span className="bg-green-100 text-green-700 text-sm font-semibold px-4 py-1 rounded-full inline-block mb-6">Tentang Kami</span>
            <h2 className="text-4xl font-black text-gray-900 mb-6 leading-tight">
              Mengapa Cek-Gula <br />Hadir?
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Indonesia menempati peringkat ke-5 dunia dalam kasus diabetes. Salah satu pemicunya adalah konsumsi jajanan pasar yang tinggi gula tanpa informasi nutrisi yang jelas.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Cek-Gula hadir sebagai solusi berbasis AI untuk membantu masyarakat Indonesia membuat pilihan makanan yang lebih cerdas dan sehat setiap harinya.
            </p>
            <button
              onClick={() => navigate('/register')}
              className="bg-green-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-800 transition flex items-center gap-2">
              Coba Sekarang <MdArrowForward size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Artikel Section */}
      <div id="artikel" className="py-20 px-16 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="bg-green-100 text-green-700 text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">Artikel</span>
          <h2 className="text-4xl font-black text-gray-900 mb-4">Tips Hidup Sehat</h2>
          <p className="text-gray-500 text-lg">Informasi terpercaya seputar gizi dan kesehatan</p>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {[
            {
              img: artikel1,
              tag: 'Glikemik',
              title: 'Apa itu Indeks Glikemik?',
              desc: 'Pelajari bagaimana indeks glikemik mempengaruhi kadar gula darah dan energi harianmu.',
              date: '28 April 2026'
            },
            {
              img: artikel2,
              tag: 'Diabetes',
              title: 'Bahaya Sugar Crash di Tempat Kerja',
              desc: 'Sugar crash bisa menurunkan produktivitas secara drastis. Kenali gejalanya dan cara mencegahnya.',
              date: '25 April 2026'
            },
            {
              img: artikel3,
              tag: 'Nutrisi',
              title: 'Jajanan Pasar yang Aman untuk Diabetesi',
              desc: 'Tidak semua jajanan pasar berbahaya. Ini daftar jajanan yang relatif aman dikonsumsi.',
              date: '20 April 2026'
            }
          ].map((artikel, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">
              <div className="h-48 overflow-hidden">
                <img
                  src={artikel.img}
                  alt={artikel.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6">
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">{artikel.tag}</span>
                <h3 className="font-bold text-gray-800 text-lg mt-3 mb-2">{artikel.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{artikel.desc}</p>
                <p className="text-gray-400 text-xs">{artikel.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-700 py-20 px-16 text-center">
        <h2 className="text-4xl font-black text-white mb-4">Mulai Hidup Lebih Sehat Hari Ini</h2>
        <p className="text-green-200 text-lg mb-8">Bergabung dan mulai pantau asupan gulamu sekarang</p>
        <button
          onClick={() => navigate('/register')}
          className="bg-white text-green-700 px-10 py-4 rounded-xl text-lg font-bold hover:bg-green-50 transition shadow-lg">
          Daftar Gratis Sekarang
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-16">
        <div className="max-w-6xl mx-auto flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-700 text-white w-10 h-10 rounded-lg flex items-center justify-center text-xl">🍃</div>
              <span className="font-bold text-xl">Cek-Gula</span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Solusi cerdas berbasis AI untuk deteksi kandungan gizi jajanan pasar Indonesia
            </p>
            <div className="flex gap-4 mt-6">
              <FaInstagram size={20} className="text-gray-400 hover:text-white cursor-pointer transition" />
              <FaTwitter size={20} className="text-gray-400 hover:text-white cursor-pointer transition" />
              <FaGithub size={20} className="text-gray-400 hover:text-white cursor-pointer transition" />
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Navigasi</h4>
            <div className="flex flex-col gap-2 text-gray-400 text-sm">
              <span onClick={() => scrollTo('hero')} className="cursor-pointer hover:text-white transition">Beranda</span>
              <span onClick={() => scrollTo('fitur')} className="cursor-pointer hover:text-white transition">Fitur</span>
              <span onClick={() => scrollTo('tentang')} className="cursor-pointer hover:text-white transition">Tentang</span>
              <span onClick={() => scrollTo('artikel')} className="cursor-pointer hover:text-white transition">Artikel</span>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Akun</h4>
            <div className="flex flex-col gap-2 text-gray-400 text-sm">
              <span onClick={() => navigate('/login')} className="cursor-pointer hover:text-white transition">Masuk</span>
              <span onClick={() => navigate('/register')} className="cursor-pointer hover:text-white transition">Daftar</span>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          © 2026 Cek-Gula — Coding Camp powered by DBS Foundation
        </div>
      </footer>

    </div>
  )
}

export default LandingPage