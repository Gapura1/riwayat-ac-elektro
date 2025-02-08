// Data riwayat perawatan dari file Excel (dikonversi ke JSON)
const riwayatPerawatan = [
    { kodeAC: "AJ.101_1", tanggal: "2024-12-01", teknisi: "Joko", jenis: "Cuci AC", keterangan: "Kondisi normal" },
    { kodeAC: "AJ.101_1", tanggal: "2024-12-02", teknisi: "Joko", jenis: "Cuci AC", keterangan: "Kondisi normal" },
    { kodeAC: "AJ.101_1", tanggal: "2024-12-03", teknisi: "Joko", jenis: "Cuci AC", keterangan: "Kondisi normal" },
    { kodeAC: "AJ.101_1", tanggal: "2024-12-04", teknisi: "Joko", jenis: "Cuci AC", keterangan: "Kondisi normal" },
    { kodeAC: "AJ.101_1", tanggal: "2024-12-05", teknisi: "Joko", jenis: "Cuci AC", keterangan: "Kondisi normal" },
    { kodeAC: "AJ.102_1", tanggal: "2024-12-06", teknisi: "Joko", jenis: "Cuci AC", keterangan: "Kondisi normal" },
    // Tambahkan data lainnya sesuai dengan file Excel
];

document.getElementById("searchForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const kodeAC = document.getElementById("kodeAC").value.trim();
    const resultDiv = document.getElementById("result");

    // Filter data berdasarkan Kode AC
    const filteredData = riwayatPerawatan.filter(item => item.kodeAC === kodeAC);

    if (filteredData.length > 0) {
        // Ambil 6 riwayat terakhir
        const lastSixEntries = filteredData.slice(-6);
        let html = "<h2>Riwayat Perawatan:</h2><ul>";
        lastSixEntries.forEach(entry => {
            html += `<li><strong>Tanggal:</strong> ${entry.tanggal}, <strong>Teknisi:</strong> ${entry.teknisi}, <strong>Jenis:</strong> ${entry.jenis}, <strong>Keterangan:</strong> ${entry.keterangan}</li>`;
        });
        html += "</ul>";
        resultDiv.innerHTML = html;
    } else {
        resultDiv.innerHTML = "<p>Tidak ditemukan riwayat perawatan untuk Kode AC tersebut.</p>";
    }
});