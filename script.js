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

        // Buat tabel
        let html = `
            <h2>Riwayat Perawatan:</h2>
            <table>
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Teknisi</th>
                        <th>Jenis Perawatan</th>
                        <th>Keterangan</th>
                    </tr>
                </thead>
                <tbody>
        `;

        lastSixEntries.forEach(entry => {
            html += `
                <tr>
                    <td>${entry.tanggal}</td>
                    <td>${entry.teknisi}</td>
                    <td>${entry.jenis}</td>
                    <td>${entry.keterangan}</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        resultDiv.innerHTML = html;
    } else {
        resultDiv.innerHTML = "<p>Tidak ditemukan riwayat perawatan untuk Kode AC tersebut.</p>";
    }
});