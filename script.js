document.getElementById("searchForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const kodeAC = document.getElementById("kodeAC").value.trim();
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<p>Memuat data...</p>";

    try {
        // Ambil data dari Google Sheets (ganti URL dengan milik Anda)
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=json');
        const data = await response.json();

        // Ekstrak data dari Google Sheets
        const riwayatPerawatan = [];
        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            riwayatPerawatan.push({
                kodeAC: row[0],  // Sesuaikan indeks kolom
                tanggal: row[1],
                teknisi: row[2],
                jenis: row[3],
                keterangan: row[4]
            });
        }

        // Filter data berdasarkan Kode AC
        const filteredData = riwayatPerawatan.filter(item => item.kodeAC === kodeAC);

        if (filteredData.length > 0) {
            // Ambil 6 riwayat terakhir
            const lastSixEntries = filteredData.slice(-6);

            // Buat tabel
            let html = `
                <h2>Riwayat Perawatan untuk ${kodeAC}:</h2>
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

            html += `</tbody></table>`;
            resultDiv.innerHTML = html;
        } else {
            resultDiv.innerHTML = `<p>Tidak ditemukan riwayat untuk Kode AC: <strong>${kodeAC}</strong></p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p>Gagal memuat data. Error: ${error.message}</p>`;
    }
});