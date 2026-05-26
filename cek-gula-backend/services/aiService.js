const analyzeGula = (kadarGula) => {
  if (kadarGula < 70)  return "Rendah";
  if (kadarGula > 140) return "Tinggi";
  return "Normal";
};

const getRekomendasi = (status, namaMakanan) => {
  const map = {
    Rendah: `${namaMakanan} memiliki kadar gula rendah, aman dikonsumsi sehari-hari.`,
    Normal: `${namaMakanan} memiliki kadar gula normal, konsumsi secukupnya.`,
    Tinggi: `${namaMakanan} memiliki kadar gula tinggi, batasi konsumsinya!`,
  };
  return map[status] || map["Normal"];
};

const estimateKadarGula = (gulaGram) => parseFloat((gulaGram * 10).toFixed(1));

module.exports = { analyzeGula, getRekomendasi, estimateKadarGula };